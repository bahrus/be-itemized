import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';

export interface EndUserProps{
    model?: IObserve;
    modelVal?: {[key: string] : string}
}

export interface VirtualProps extends EndUserProps, MinimalProxy{
}



export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy,
}

export type PP = ProxyProps;

export interface Actions{
}