import {ISettings, IUser} from 'interface';
import {IStation, LANGUAGE} from './ISettings';

export interface IRootState {
  app: IBase;
}

export interface IBase {
  user: IUser;
  settings: ISettings;
  language: LANGUAGE;
  onBoarding?: boolean;
  stationByLocation: IStation[];
}
