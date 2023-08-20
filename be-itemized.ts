import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, CamelConfig, CanonicalConfig} from './types';
import {register} from 'be-hive/register.js';
import {JSONValue} from 'trans-render/lib/types';
import {RegExpOrRegExpExt} from 'be-enhanced/types';
import {arr, tryParse} from 'be-enhanced/cpu.js';

const cache = new Map<string, JSONValue>();
const cachedCanonicals: {[key: string]: CanonicalConfig} = {};

const reItemizeStatements: RegExpOrRegExpExt<PIS>[] = [
    {
        regExp: new RegExp(String.raw `(?<prop>[\w]+)(?<!\\)FromExpression(?<expr>.*)`),
        defaultVals:{

        }
    }
];


interface ItemizeStatement{
    prop: string,
    expr: string,
}

type PIS = Partial<ItemizeStatement>;

export class BeItemized extends BE<AP, Actions> implements Actions{
    static override get beConfig() {
        return {
            parse: true,
            primaryProp: 'camelConfig',
            cache,
            primaryPropReq: true,
            parseAndCamelize: true,
            camelizeOptions:{

            }
        } as BEConfig<CamelConfig>;
    }

    async camelToCanonical(self: this): ProPAP {
        const {camelConfig, enhancedElement, parsedFrom} = self;
        if(parsedFrom !== undefined) {
            const canonicalConfig = cachedCanonicals[parsedFrom];
            if(canonicalConfig !== undefined){
                return {
                    canonicalConfig
                };
            }

        }
        const camelConfigArr = arr(camelConfig);
        const {} = camelConfigArr;
        for(const cc of camelConfigArr){
            const {Itemize} = cc;
            if(Itemize === undefined) continue;
            for(const item of Itemize){
                const test = tryParse(item, reItemizeStatements) as ItemizeStatement;
                console.log({test});
                if(test === null) throw 'PE';//Parse Error
                const {prop, expr} = test;
                if(prop === undefined || expr === undefined) throw 'PE'; //Parse Error
                const closedBraceSplit = expr.split('}');
                const parsedStr: Array<string> = [];
                for(const cb of closedBraceSplit){
                    if(cb.indexOf('{') > -1){
                        const openBraceSplit = cb.split('{');
                        parsedStr.push(openBraceSplit[0]);
                        parsedStr.push(openBraceSplit[1]);
                    }else{
                        parsedStr.push(cb);
                    }
                }
                console.log({parsedStr});
            }
            
        }
        const canonicalConfig: CanonicalConfig = {

        };
        return {
            canonicalConfig
        };
    }

    async onCanonical(self: this): ProPAP {
        return {
            resolved: true
        };
    }
}

export interface BeItemized extends AllProps{}

const tagName = 'be-itemized';
const ifWantsToBe = 'be-itemized';
const upgrade = '*';

const xe = new XE<AP, Actions>({
    config: {
        tagName,
        isEnh: true,
        propDefaults: {
            ...propDefaults
        },
        propInfo:{
            ...propInfo
        },
        actions: {
            camelToCanonical: 'camelConfig',
            onCanonical: 'canonicalConfig'
        }
    },
    superclass: BeItemized
});

register(ifWantsToBe, upgrade, tagName);