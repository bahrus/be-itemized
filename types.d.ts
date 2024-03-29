import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';
import {InterpolationRule} from 'be-joined/types';

export interface EndUserProps extends IBE{
    markers: Array<Attr>;
}

export interface AllProps extends EndUserProps{
    singlePropMarkers?: Array<Attr>,
    interpolationMarkers?: Array<Attr>;
    singlePropMarkersResolved?: boolean;
    interpolationMarkersResolved?: boolean;
}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];

export interface Actions{
    onMarkers(self: this): PAP;
    onSinglePropMarkers(self: this): ProPAP;
    onInterpolationMarkers(self: this): PAP;
    readyToResolve(self: this): PAP;
}