import {ISettings, IUser} from 'interface/ISettings';
import {IStation, LANGUAGE} from './ISettings';
import {Region} from 'react-native-maps';

export interface IRootState {
  app: IBase;
}

export interface IBase {
  user: IUser;
  settings: ISettings;
  language: LANGUAGE;
  onBoarding?: boolean;
  stationByLocation: IStation[];
  currentRegion: Region;
  currentLocation: Region;
}
