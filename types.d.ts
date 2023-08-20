import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';
import {PropInfoExt} from 'xtal-element/types';

export interface EndUserProps extends IBE{
    camelConfig?: CamelConfig,
}

export type ItemizeStatement = string;

export interface CamelConfig{
    Itemize?: Array<ItemizeStatement>
}

export interface AllProps extends EndUserProps{
    canonicalConfig?: CanonicalConfig,
}

export interface CanonicalConfig{
    parts?: Array<StringOrProp>;
}

export type ConstString = String;

export type StringOrProp = ConstString | PropInfoExt;


export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>]

export interface Actions{
    camelToCanonical(self: this): ProPAP;
    onCanonical(self: this): ProPAP;
}