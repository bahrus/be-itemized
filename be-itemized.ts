import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, CamelConfig, CanonicalConfig, StringOrProp, Items, Parts} from './types';
import {register} from 'be-hive/register.js';
import {JSONValue} from 'trans-render/lib/types';
import {RegExpOrRegExpExt} from 'be-enhanced/types';
import {arr, tryParse} from 'be-enhanced/cpu.js';
import { PropInfoExt } from '../xtal-element/types';

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
        //const {} = camelConfigArr;
        const items: Items = {};
        for(const cc of camelConfigArr){
            const {Itemize} = cc;
            if(Itemize === undefined) continue;
            for(const item of Itemize){
                const test = tryParse(item, reItemizeStatements) as ItemizeStatement;
                if(test === null) throw 'PE';//Parse Error
                const {prop, expr} = test;
                if(prop === undefined || expr === undefined) throw 'PE'; //Parse Error
                const closedBraceSplit = expr.split('}');
                const parts: Parts = [];
                for(const cb of closedBraceSplit){
                    if(cb.indexOf('{') > -1){
                        const openBraceSplit = cb.split('{');
                        parts.push(openBraceSplit[0]);
                        const prop: PropInfoExt = {   }
                        parts.push([openBraceSplit[1], prop]);
                    }else{
                        parts.push(cb);
                    }
                }
                items[prop] = parts;
            }
            
        }
        const canonicalConfig: CanonicalConfig = {
            items
        };
        if(parsedFrom !== undefined){
            cachedCanonicals[parsedFrom] = canonicalConfig;
        }
        return {
            canonicalConfig
        };
    }

    async onCanonical(self: this): ProPAP {
        const {canonicalConfig, enhancedElement} = self;
        const scope = enhancedElement.closest('[itemscope]');
        import('be-value-added/be-value-added.js');
        if(scope === null) throw 404;
        const {items} = canonicalConfig!;
        for(const key in items!){
            
            const parts = items[key];
            const val = (<any>enhancedElement)[key] as string;
            if(!val) continue;
            let cursorPos = 0;
            const boundaries = []
            for(const part of parts){
                switch(typeof part){
                    case 'string':
                        cursorPos = val.indexOf(part, cursorPos);
                        boundaries.push([cursorPos, cursorPos + part.length]);
                        cursorPos += part.length;
                }
            }
            const vals = [];
            for(let i = 0, ii = boundaries.length - 1; i< ii;  i++){
                const boundary = boundaries[i];
                const boundaryPlusOne = boundaries[i + 1];
                const start = boundary[1];
                const end = boundaryPlusOne[0];
                vals.push(val.substring(start, end));
            }
            let cnt = 0;
            const parsedObject: any = {};
            for(const part of parts){
                switch(typeof part){
                    case 'object':
                        parsedObject[part[0]] = vals[cnt];
                        cnt++;
                        break;

                }
            }
            
            for(const key in parsedObject){
                if(scope.querySelector(`[itemprop="${key}"]`) !== null) continue; //TODO check in donut
                const itemprop = document.createElement('meta');
                itemprop.setAttribute('itemprop', key);
                scope.appendChild(itemprop);
                (<any>itemprop).beEnhanced.by.beValueAdded.value = parsedObject[key];
            }

        }
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