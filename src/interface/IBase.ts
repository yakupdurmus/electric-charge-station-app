import {ISettings, IUser} from 'interface';
import {LANGUAGE} from './ISettings';

export interface IRootState {
  app: {
    user: IUser;
    settings: ISettings;
    language: LANGUAGE;
    onBoarding?: boolean;
  };
}
