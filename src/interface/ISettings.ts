export enum LANGUAGE {
  TR = 'tr',
  EN = 'en',
  AR = 'ar',
}

export interface IStation {
  name: string;
  latitude: number;
  longitude: number;
  stationAddress: string;
  stationType: StationType;
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
