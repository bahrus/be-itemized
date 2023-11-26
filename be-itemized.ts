import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig, EnhancementInfo} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA} from './types';
import {register} from 'be-hive/register.js';
import {camelToLisp} from 'trans-render/lib/camelToLisp.js';
import {getRemoteEl} from 'be-linked/getRemoteEl.js';
//import {getSignalVal} from 'be-linked/getSignalVal.js'

export class BeItemized extends BE<AP, Actions> implements Actions{
    override async attach(enhancedElement: Element, enhancementInfo: EnhancementInfo) {
        super.attach(enhancedElement, enhancementInfo);
        const {attributes} = enhancedElement;
        this.markers = Array.from(attributes).filter(
            x => x.value.length > 0 && (x.name.startsWith('-') || (x.name.startsWith(dataDerive) && x.name.endsWith(deriveFrom))) 
        );
    }

    onMarkers(self: this): PAP {
        const {markers} = self;
        const singlePropMarkers = markers.filter(x => !x.value.includes('{'));
        const interpolationMarkers = markers.filter(x => x.value.includes('{'));
        return {
            singlePropMarkers,
            interpolationMarkers
        };
    }

    async onSinglePropMarkers(self: this): ProPAP {
        const {singlePropMarkers, enhancedElement} = self;
        for(const singlePropMarker of singlePropMarkers!){
            let {value, name} = singlePropMarker;
            const prop = camelToLisp(name.substring(1)); //TODO:  data-
            const linksToHost = value.includes('/');
            if(linksToHost){
                value = value.replace('/', '');
                
            }
            if(linksToHost){
                const remoteEl = await getRemoteEl(enhancedElement, '/', prop);
                (<any>remoteEl)[value] = (<any>enhancedElement)[prop];
            }
            //getSignalVal(enhancedElement);
        }
        return {
            singlePropMarkersResolved: true
        }
    }

    onInterpolationMarkers(self: this): PAP {
        return {
            interpolationMarkersResolved: true
        }
    }

    readyToResolve(self: this): PAP {
        return {
            resolved: true,
        }
    }
}

const dataDerive = 'data-derive-';
const deriveFrom = '-from';

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