import {Dispatch} from 'redux';
import {
  SET_LANGUAGE,
  SET_ONBOARDING,
  GET_STATION_BY_LOCATION,
  SET_CURRENT_REGION,
  GET_STATION_SEARCH,
  SET_CURRENT_LOCATION,
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
  (region: Region, location: Region) => async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.post<IResponse>('station', {
        region,
        location,
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
  (location: Region, searchTerm: string) => async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.post<IResponse>('station-search', {
        location,
        searchTerm,
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

export const setCurrentLocation =
  (currentLocation: Region) => (dispatch: Dispatch) => {
    dispatch({
      type: SET_CURRENT_LOCATION,
      payload: currentLocation,
    });
  };
