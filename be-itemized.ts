import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig, EnhancementInfo} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA} from './types';
import {register} from 'be-hive/register.js';
import {lispToCamel} from 'trans-render/lib/lispToCamel.js';

export class BeItemized extends BE<AP, Actions> implements Actions{
    async attach(enhancedElement: Element, enhancementInfo: EnhancementInfo) {
        const {attributes} = enhancedElement;
        for(const attrib of attributes){
            const {name, value} = attrib;
            if(name.startsWith('-') && value.length > 0){
                const propName = lispToCamel(name.substring(1));
                if(propName in enhancedElement){
                    const propVal = (<any>enhancedElement)[propName];
                    switch(typeof propVal){
                        
                    }
                    console.log({propVal, propName});
                }
            }
        }
    }

    doBinary(){

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