import {ISettings, IUser} from 'interface';
import {Dispatch} from 'redux';
import {
  SETTINGS,
  USER,
  SET_LANGUAGE,
  SET_ONBOARDING,
  GET_STATION_BY_LOCATION,
} from 'actions/types';
import {IResponse, LANGUAGE} from 'interface/ISettings';
import {Region} from 'react-native-maps';
import axiosInstance from 'helper/axiosInstance';

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

export const setOnBoarding = (type: boolean) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_ONBOARDING,
    payload: type,
  });
};

export const setUser = (type: IUser) => (dispatch: Dispatch) => {
  dispatch({
    type: USER,
    payload: type,
  });
};

export const getStationsByLocation =
  (region: Region) => async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.get<IResponse>('station', {
        params: region,
      });
      dispatch({
        type: GET_STATION_BY_LOCATION,
        payload: response.data.data,
      });

      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
