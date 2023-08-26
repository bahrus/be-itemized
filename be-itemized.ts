import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, CamelConfig, CanonicalConfig, StringOrProp, Items, Parts} from './types';
import {register} from 'be-hive/register.js';
import {JSONValue, Parts as PropInfoParts} from 'trans-render/lib/types';
import {RegExpOrRegExpExt} from 'be-enhanced/types';
import {arr, tryParse} from 'be-enhanced/cpu.js';
import {toParts, getPartVals, getParsedObject} from 'trans-render/lib/brace.js';

const cache = new Map<string, JSONValue>();
const cachedCanonicals: {[key: string]: CanonicalConfig} = {};

const prop = `(?<prop>[\w]+)`;

const reItemizeStatements: RegExpOrRegExpExt<PIS>[] = [
    {
        regExp: new RegExp(String.raw `${prop}(?<!\\)FromExpression(?<expr>.*)`),
        defaultVals:{}
    },
    {
        regExp: new RegExp(String.raw `${prop}(?<!\\)PropertyAs(?<expr>[\w]+)(?<!\\)Itemprop`),
        defaultVals:{}
    }
];


interface ItemizeStatement{
    prop: string,
    expr: string,
    itemprop: string,
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

    camelToCanonical(self: this): PAP {
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
        const items: Items = {};
        for(const cc of camelConfigArr){
            const {Itemize} = cc;
            if(Itemize === undefined) continue;
            for(const item of Itemize){
                const test = tryParse(item, reItemizeStatements) as ItemizeStatement;
                if(test === null) throw 'PE';//Parse Error
                const {prop, expr, itemprop} = test;
                if(prop === undefined || (expr === undefined && itemprop === undefined)) throw 'PE'; //Parse Error
                if(expr !== undefined){
                    items[prop] = toParts(expr) as Parts;
                }else{
                    items[prop] = itemprop;
                }
                
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

    onCanonical(self: this): PAP {
        const {canonicalConfig, enhancedElement} = self;
        const scope = enhancedElement.closest('[itemscope]');
        import('be-value-added/be-value-added.js');
        if(scope === null) throw 404;
        const {items} = canonicalConfig!;
        for(const key in items!){
            
            const partsOrItemprop = items[key];
            switch(typeof partsOrItemprop){
                case 'string':{
                    const itemprop = partsOrItemprop;
                }
                break;
                case 'object':{
                    const parts = partsOrItemprop;
                    const val = (<any>enhancedElement)[key] as string;
                    if(!val) continue;
                    const parsedObject = getParsedObject(val, parts as PropInfoParts);
                    for(const key in parsedObject){
                        let itempropEl = scope.querySelector(`[itemprop="${key}"]`);//TODO check in donut
                        if(itempropEl === null){
                            itempropEl = document.createElement('meta');
                            itempropEl.setAttribute('itemprop', key);
                            scope.appendChild(itempropEl);
                        }  
                        (<any>itempropEl).beEnhanced.by.beValueAdded.value = parsedObject[key];
                    }
                }
                break;  

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