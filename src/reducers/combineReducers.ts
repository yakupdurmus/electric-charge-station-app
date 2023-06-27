import {
  GET_STATION_BY_LOCATION,
  SETTINGS,
  SET_LANGUAGE,
  SET_ONBOARDING,
  USER,
  SET_CURRENT_REGION,
  SET_CURRENT_LOCATION,
} from 'actions/types';
import {CONFIG} from 'config';
import {INIT_LOCATION} from 'constant/constants';
import {IBase} from 'interface/IBase';
import {combineReducers} from 'redux';
const INITIAL_STATE: IBase = {
  user: {},
  settings: {},
  language: CONFIG.defaultLanguage,
  stationByLocation: [],
  currentRegion: INIT_LOCATION,
  currentLocation: INIT_LOCATION,
};

const reduxReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case USER:
      return {...state, user: action.payload};
    case SETTINGS:
      return {...state, settings: action.payload};
    case SET_LANGUAGE:
      return {...state, language: action.payload};
    case SET_ONBOARDING:
      return {...state, onBoarding: action.payload};
    case GET_STATION_BY_LOCATION:
      return {...state, stationByLocation: action.payload};
    case SET_CURRENT_REGION:
      return {...state, currentRegion: action.payload};
    case SET_CURRENT_LOCATION:
      return {...state, currentLocation: action.payload};
    default:
      return state;
  }
};

export default combineReducers({
  app: reduxReducer,
});
