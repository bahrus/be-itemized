import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
import { lispToCamel } from 'trans-render/lib/lispToCamel.js';
export class BeItemized extends BE {
    async attach(enhancedElement, enhancementInfo) {
        const { attributes } = enhancedElement;
        for (const attrib of attributes) {
            const { name, value } = attrib;
            if (name.startsWith('-') && value.length > 0) {
                const propName = lispToCamel(name.substring(1));
                if (propName in enhancedElement) {
                    const propVal = enhancedElement[propName];
                    switch (typeof propVal) {
                        case 'boolean':
                            this.#doBoolean(this, propName, propVal);
                            break;
                    }
                    console.log({ propVal, propName });
                }
            }
        }
    }
    #doBoolean(self, propName, propVal) {
    }
}
const tagName = 'be-itemized';
const ifWantsToBe = 'itemized';
const upgrade = '*';
const xe = new XE({
    config: {
        tagName,
        isEnh: true,
        propDefaults: {
            ...propDefaults,
        },
        propInfo: {
            ...propInfo
        },
        actions: {}
    },
    superclass: BeItemized
});
register(ifWantsToBe, upgrade, tagName);
