export enum LANGUAGE {
  TR = 'tr',
  EN = 'en',
  AR = 'ar',
}

export interface ISettings {}
export interface IUser {}

export interface IStation {
  name: string;
  latitude: number;
  longitude: number;
  stationAddress: string;
  stationType: StationType;
  distance?: string;
}

export type MapType = 'appleMaps' | 'googleMaps' | 'yandexMaps';

export interface ICoordinate {
  latitude: number;
  longitude: number;
}

export type StationType =
  | 'zes'
  | 'voltrun'
  | 'sharz'
  | 'powersarj'
  | 'gcharge'
  | 'esarj';

export interface IResponse {
  success: boolean;
  data?: any;
  message?: {
    title?: string;
    message: string;
  };
}
