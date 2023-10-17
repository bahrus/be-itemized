import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig, EnhancementInfo} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA} from './types';
import {register} from 'be-hive/register.js';
import {lispToCamel} from 'trans-render/lib/lispToCamel.js';
import {ElTypes} from 'be-linked/types';

export class BeItemized extends BE<AP, Actions> implements Actions{
    async attach(enhancedElement: Element, enhancementInfo: EnhancementInfo) {
        super.attach(enhancedElement, enhancementInfo);
        const {attributes} = enhancedElement;
        for(const attrib of attributes){
            const {name, value} = attrib;
            if(name.startsWith('-') && value.length > 0){
                const localPropName = lispToCamel(name.substring(1));
                if(localPropName in enhancedElement){
                    const propVal = (<any>enhancedElement)[localPropName];
                    switch(typeof propVal){
                        case 'boolean':
                            this.#doBoolean(this, value, propVal);
                            break;
                    }
                    console.log({propVal, propName: localPropName});
                }
            }
        }
    }

    #scope: WeakRef<Element> | undefined;

    get scope(){
        if(this.#scope !== undefined){
            const sc = this.#scope.deref();
            if(sc !== undefined) return sc;
        }
        const sc =this.enhancedElement.closest('[itemscope]');
        if(sc === null) throw 404;
        this.#scope = new WeakRef(sc);
        return sc;
    }

    #doBoolean(self: this, propName: string, propVal: boolean){
        const {scope} = self;
        if(scope.querySelector(`[itemprop=${propName}]`) === null){ //TODO:  donut
            const itempropEl = document.createElement('link');
            itempropEl.setAttribute('itemprop', propName);
            itempropEl.href = 'https://schema.org/' + (propVal ? 'True' : 'False');
            scope.appendChild(itempropEl);
        }
    }
}

export interface BeItemized extends AllProps{}

const tagName = 'be-itemized';
const ifWantsToBe = 'itemized'
const upgrade = '*';

const xe = new XE<AP, Actions>({
    config:{
        tagName,
        isEnh: true,
        propDefaults:{
            ...propDefaults,
        },
        propInfo:{
            ...propInfo
        },
        actions:{

        }
    },
    superclass: BeItemized
});

register(ifWantsToBe, upgrade, tagName);