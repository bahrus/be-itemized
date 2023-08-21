import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
import { arr, tryParse } from 'be-enhanced/cpu.js';
const cache = new Map();
const cachedCanonicals = {};
const reItemizeStatements = [
    {
        regExp: new RegExp(String.raw `(?<prop>[\w]+)(?<!\\)FromExpression(?<expr>.*)`),
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
        //const {} = camelConfigArr;
        const items = {};
        for (const cc of camelConfigArr) {
            const { Itemize } = cc;
            if (Itemize === undefined)
                continue;
            for (const item of Itemize) {
                const test = tryParse(item, reItemizeStatements);
                if (test === null)
                    throw 'PE'; //Parse Error
                const { prop, expr } = test;
                if (prop === undefined || expr === undefined)
                    throw 'PE'; //Parse Error
                const closedBraceSplit = expr.split('}');
                const parts = [];
                for (const cb of closedBraceSplit) {
                    if (cb.indexOf('{') > -1) {
                        const openBraceSplit = cb.split('{');
                        parts.push(openBraceSplit[0]);
                        const prop = {};
                        parts.push([openBraceSplit[1], prop]);
                    }
                    else {
                        parts.push(cb);
                    }
                }
                items[prop] = parts;
            }
        }
        const canonicalConfig = {
            items
        };
        if (parsedFrom !== undefined) {
            cachedCanonicals[parsedFrom] = canonicalConfig;
        }
        return {
            canonicalConfig
        };
    }
    async onCanonical(self) {
        const { canonicalConfig, enhancedElement } = self;
        const scope = enhancedElement.closest('[itemscope]');
        import('be-value-added/be-value-added.js');
        if (scope === null)
            throw 404;
        const { items } = canonicalConfig;
        for (const key in items) {
            const parts = items[key];
            const val = enhancedElement[key];
            if (!val)
                continue;
            let cursorPos = 0;
            const boundaries = [];
            for (const part of parts) {
                switch (typeof part) {
                    case 'string':
                        cursorPos = val.indexOf(part, cursorPos);
                        boundaries.push([cursorPos, cursorPos + part.length]);
                        cursorPos += part.length;
                }
            }
            const vals = [];
            for (let i = 0, ii = boundaries.length - 1; i < ii; i++) {
                const boundary = boundaries[i];
                const boundaryPlusOne = boundaries[i + 1];
                const start = boundary[1];
                const end = boundaryPlusOne[0];
                vals.push(val.substring(start, end));
            }
            let cnt = 0;
            const parsedObject = {};
            for (const part of parts) {
                switch (typeof part) {
                    case 'object':
                        parsedObject[part[0]] = vals[cnt];
                        cnt++;
                        break;
                }
            }
            for (const key in parsedObject) {
                if (scope.querySelector(`[itemprop="${key}"]`) !== null)
                    continue; //TODO check in donut
                const itemprop = document.createElement('meta');
                itemprop.setAttribute('itemprop', key);
                scope.appendChild(itemprop);
                itemprop.beEnhanced.by.beValueAdded.value = parsedObject[key];
            }
        }
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
