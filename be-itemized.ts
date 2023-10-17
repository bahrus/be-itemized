import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig, EnhancementInfo} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA} from './types';
import {register} from 'be-hive/register.js';

export class BeItemized extends BE<AP, Actions> implements Actions{
    async attach(enhancedElement: Element, enhancementInfo: EnhancementInfo) {
        
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