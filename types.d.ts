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

export interface CanonicalConfig {
    items?: Items,
}

export type Partition = [start: number, end: number, `${TagsAttrs}${NameOfProp}${Types}`];

export type TagsAttrs = '|&' | '&' | '&#' | '';

export type Types = ' as number' | ' as boolean' | ' as date' | ' as string' | '';

export type Items = {[key: NameOfProp]: Partition[] | ItemProp};

export type ConstString = String;

export type NameOfProp = string;

export type StringOrProp = ConstString | Partition[];

export type ItemProp = string;

export type Parts = Array<StringOrProp>;

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>]

export interface Actions{
    camelToCanonical(self: this): PAP;
    onCanonical(self: this): PAP;
    onResolved(self: this): void;
}