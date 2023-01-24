import {ISettings, IUser} from 'interface';
import {Dispatch} from 'redux';
import {SETTINGS, USER, SET_LANGUAGE} from 'actions/types';
import {LANGUAGE} from 'interface/ISettings';

export const setSettings = (type: ISettings) => (dispatch: Dispatch) => {
  dispatch({
    type: SETTINGS,
    payload: type,
  });
};

export const setLanguage = (type: LANGUAGE) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_LANGUAGE,
    payload: type,
  });
};

export const setUser = (type: IUser) => (dispatch: Dispatch) => {
  dispatch({
    type: USER,
    payload: type,
  });
};
