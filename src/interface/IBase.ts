import {ISettings, IUser} from 'interface';
import {LANGUAGE} from './ISettings';

export interface IRootState {
  collection: {
    user: IUser;
    settings: ISettings;
    language: LANGUAGE;
  };
}
