import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA} from './types';
import {register} from 'be-hive/register.js';
import {JSONValue} from 'trans-render/lib/types';

const cache = new Map<string, JSONValue>();
export class BeItemized extends BE<AP, Actions> implements Actions{
    static override get beConfig() {
        return {
            parse: true,
            primaryProp: 'camelConfig',
            cache,
        } as BEConfig;
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

        }
    },
    superclass: BeItemized
});

register(ifWantsToBe, upgrade, tagName);