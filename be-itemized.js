import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeItemized extends BE {
    async attach(enhancedElement, enhancementInfo) {
        super.attach(enhancedElement, enhancementInfo);
        const { attributes } = enhancedElement;
        this.markers = Array.from(attributes).filter(x => x.value.length > 0 && (x.name.startsWith('-') || (x.name.startsWith(dataDerive) && x.name.endsWith(deriveFrom))));
    }
    onMarkers(self) {
        const { markers } = self;
        const singlePropMarkers = markers.filter(x => !x.value.includes('{'));
        const interpolationMarkers = markers.filter(x => x.value.includes('{'));
        return {
            singlePropMarkers,
            interpolationMarkers
        };
    }
    onSinglePropMarkers(self) {
        const { singlePropMarkers } = self;
        for (const singlePropMarker of singlePropMarkers) {
            let { value } = singlePropMarker;
            const linksToHost = value.includes('/');
            if (linksToHost) {
                value = value.replace('/', '');
            }
        }
        return {
            singlePropMarkersResolved: true
        };
    }
    onInterpolationMarkers(self) {
        return {
            interpolationMarkersResolved: true
        };
    }
    readyToResolve(self) {
        return {
            resolved: true,
        };
    }
}
const dataDerive = 'data-derive-';
const deriveFrom = '-from';
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
        actions: {
            onMarkers: 'markers',
            onInterpolationMarkers: 'interpolationMarkers',
            onSinglePropMarkers: 'singlePropMarkers',
            readyToResolve: {
                ifAllOf: ['interpolationMarkersResolved', 'singlePropMarkersResolved']
            }
        }
    },
    superclass: BeItemized
});
register(ifWantsToBe, upgrade, tagName);
