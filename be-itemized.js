import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
import { arr, tryParse } from 'be-enhanced/cpu.js';
import { toParts, getParsedObject } from 'trans-render/lib/brace.js';
const cache = new Map();
const cachedCanonicals = {};
const prop = `(?<prop>[\w]+)`;
const reItemizeStatements = [
    {
        regExp: new RegExp(String.raw `${prop}(?<!\\)FromExpression(?<expr>.*)`),
        defaultVals: {}
    },
    {
        regExp: new RegExp(String.raw `${prop}(?<!\\)PropertyAs(?<expr>[\w]+)(?<!\\)Itemprop`),
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
    camelToCanonical(self) {
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
        const items = {};
        for (const cc of camelConfigArr) {
            const { Itemize } = cc;
            if (Itemize === undefined)
                continue;
            for (const item of Itemize) {
                const test = tryParse(item, reItemizeStatements);
                if (test === null)
                    throw 'PE'; //Parse Error
                const { prop, expr, itemprop } = test;
                if (prop === undefined || (expr === undefined && itemprop === undefined))
                    throw 'PE'; //Parse Error
                if (expr !== undefined) {
                    items[prop] = toParts(expr);
                }
                else {
                    items[prop] = itemprop;
                }
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
    setKey(self, scope, itemprop, itemVal) {
        let itempropEls = Array.from(scope.querySelectorAll(`[itemprop="${itemprop}"]`)); //TODO check in donut
        if (itempropEls.length === 0) {
            let elName = 'meta';
            switch (typeof itemVal) {
                case 'boolean':
                    elName = 'link';
                    break;
            }
            const itempropEl = document.createElement(elName);
            itempropEl.setAttribute('itemprop', itemprop);
            itempropEl.setAttribute('be-ignored', '');
            scope.appendChild(itempropEl);
            itempropEls.push(itempropEl);
        }
        for (const itempropEl of itempropEls) {
            itempropEl.beEnhanced.by.beValueAdded.value = itemVal;
        }
    }
    onCanonical(self) {
        const { canonicalConfig, enhancedElement } = self;
        const scope = enhancedElement.closest('[itemscope]');
        import('be-value-added/be-value-added.js');
        if (scope === null)
            throw 404;
        const { items } = canonicalConfig;
        for (const key in items) {
            const partsOrItemprop = items[key];
            switch (typeof partsOrItemprop) {
                case 'string':
                    {
                        const itemprop = partsOrItemprop;
                        const itemVal = enhancedElement[key];
                        self.setKey(self, scope, itemprop, itemVal);
                    }
                    break;
                case 'object':
                    {
                        const parts = partsOrItemprop;
                        const val = enhancedElement[key];
                        if (!val)
                            continue;
                        const parsedObject = getParsedObject(val, parts);
                        for (const itemprop in parsedObject) {
                            const itemVal = parsedObject[itemprop];
                            self.setKey(self, scope, itemprop, itemVal);
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
