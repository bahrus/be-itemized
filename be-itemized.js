import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeItemized extends BE {
    async attach(enhancedElement, enhancementInfo) {
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
