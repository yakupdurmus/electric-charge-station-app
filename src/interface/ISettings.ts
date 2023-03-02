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
  stationType: 'zes' | 'volturun' | 'sharz' | 'powersarj' | 'gcharge' | 'esarj';
}

export type MapType = 'appleMaps' | 'googleMaps' | 'yandexMaps';

export interface ICoordinate {
  latitude: number;
  longitude: number;
}
