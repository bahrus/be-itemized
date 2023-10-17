import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig, RegExpOrRegExpExt} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {
    Actions, AllProps, AP, PAP, ProPAP, POA, 
    CamelConfig, CanonicalConfig, Items, ItemProp,
    Partition
} from './types';
import {register} from 'be-hive/register.js';
import {JSONValue} from 'trans-render/lib/types';
import {arr, tryParse} from 'be-enhanced/cpu.js';

const cache = new Map<string, JSONValue>();
const cachedCanonicals: {[key: string]: CanonicalConfig} = {};

const prop = String.raw `(?<prop>[\w]+)`;

const reItemizeStatements: RegExpOrRegExpExt<PIS>[] = [
    {
        regExp: new RegExp(String.raw `^${prop}(?<!\\)Via(?<expr>.*)`),
        defaultVals:{}
    },
    {
        regExp: new RegExp(String.raw `^${prop}(?<!\\)As(?<itemprop>[\w]+)`),
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

            },
            defaultBucket: 'Itemize'
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
                    items[prop] = JSON.parse(`[${expr}]`) as Partition[] //expr;
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

    #addMicrodataElement(self: this, scope: Element, itemprop: ItemProp, itemVal: any){
        let itempropEls = Array.from( scope.querySelectorAll(`[itemprop="${itemprop}"]`));//TODO check in donut
        if(itempropEls.length === 0){
            let elName = 'meta'
            switch(typeof itemVal){
                case 'boolean':
                    elName = 'link';
                    break;
            }
            const itempropEl = document.createElement(elName);
            itempropEl.setAttribute('itemprop', itemprop);
            //itempropEl.setAttribute('be-ignored', '');
            scope.appendChild(itempropEl);
            itempropEls.push(itempropEl);
        }
        for(const itempropEl of itempropEls){
            (<any>itempropEl).beEnhanced.by.beValueAdded.value = itemVal;
        }  
        
    }

    #addFieldElement(self: this, scope: Element, itemprop: ItemProp, itemVal: any){
        let formEl = scope.querySelector(`[name="${itemprop}"]`) as HTMLInputElement;
        if(formEl === null){
            formEl = document.createElement('input') as HTMLInputElement;
            formEl.name = itemprop;
            scope.appendChild(formEl);
        }
        formEl.value = itemVal;

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
                    const itemVal = (<any>enhancedElement)[key];
                    self.#addMicrodataElement(self, scope, itemprop, itemVal);
                }
                break;
                case 'object':{
                    const val = (<any>enhancedElement)[key] as string;
                    if(!val) continue;
                    const partitions = partsOrItemprop;
                    for(const partition of partitions){
                        let [start, end, itemprop] = partition;
                        const itemVal = val.substring(start, end);
                        console.log({itemprop, itemVal});
                        if(itemprop.includes('&')){
                            itemprop = itemprop.replace('&', '');
                            this.#addFieldElement(self, scope, itemprop, itemVal);
                        }
                        self.#addMicrodataElement(self, scope, itemprop, itemVal);
                    }
                }
                break;  
            }
        }
        return {
            resolved: true
        };
    }

    onResolved(self: this): void {
        const {enhancedElement} = self;
        (<any>enhancedElement).beEnhanced.whenDetached('be-itemized');
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
            onCanonical: 'canonicalConfig',
            onResolved: 'resolved'
        }
    },
    superclass: BeItemized
});

register(ifWantsToBe, upgrade, tagName);