import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
import { arr, tryParse } from 'be-enhanced/cpu.js';
const cache = new Map();
const cachedCanonicals = {};
const reItemizeStatements = [
    {
        regExp: new RegExp(String.raw `(?<expr>[\w\{\}]+)(?<!\\)As(?<prop>[\w]+)`),
        defaultVals: {}
    }
];
export class BeItemized extends BE {
    static get beConfig() {
        return {
            parse: true,
            primaryProp: 'camelConfig',
            cache,
            primaryPropReq: true,
            parseAndCamelize: true,
            camelizeOptions: {}
        };
    }
    async camelToCanonical(self) {
        const { camelConfig, enhancedElement, parsedFrom } = self;
        if (parsedFrom !== undefined) {
            const canonicalConfig = cachedCanonicals[parsedFrom];
            if (canonicalConfig !== undefined) {
                return {
                    canonicalConfig
                };
            }
        }
        const camelConfigArr = arr(camelConfig);
        const {} = camelConfigArr;
        for (const cc of camelConfigArr) {
            const { Itemize } = cc;
            if (Itemize === undefined)
                continue;
            for (const item of Itemize) {
                const test = tryParse(item, reItemizeStatements);
                console.log({ test });
            }
        }
        const canonicalConfig = {};
        return {
            canonicalConfig
        };
    }
    async onCanonical(self) {
        return {
            resolved: true
        };
    }
}
const tagName = 'be-itemized';
const ifWantsToBe = 'be-itemized';
const upgrade = '*';
const xe = new XE({
    config: {
        tagName,
        isEnh: true,
        propDefaults: {
            ...propDefaults
        },
        propInfo: {
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
