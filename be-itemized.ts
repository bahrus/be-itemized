import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, CamelConfig, CanonicalConfig} from './types';
import {register} from 'be-hive/register.js';
import {JSONValue} from 'trans-render/lib/types';

const cache = new Map<string, JSONValue>();
const cachedCanonicals: {[key: string]: CanonicalConfig} = {};
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
        const {arr} = await import('be-enhanced/cpu.js');
        const camelConfigArr = arr(camelConfig);

        const canonicalConfig: CanonicalConfig = {

        };
        return {
            canonicalConfig
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