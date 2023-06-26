import {Dispatch} from 'redux';
import {
  SET_LANGUAGE,
  SET_ONBOARDING,
  GET_STATION_BY_LOCATION,
  SET_CURRENT_REGION,
  GET_STATION_SEARCH,
} from 'actions/types';
import {IResponse, LANGUAGE} from 'interface/ISettings';
import {Region} from 'react-native-maps';
import axiosInstance from 'helper/axiosInstance';

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

export const setCurrentRegion =
  (currentRegion: Region) => (dispatch: Dispatch) => {
    dispatch({
      type: SET_CURRENT_REGION,
      payload: currentRegion,
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

export const getStationSearch =
  (region: Region, searchTerm: string) => async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.get<IResponse>('station-search', {
        params: {...region, searchTerm},
      });
      dispatch({
        type: GET_STATION_SEARCH,
        payload: response.data.data,
      });

      return response.data.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
