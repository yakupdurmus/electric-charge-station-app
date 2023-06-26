import {
  GET_STATION_BY_LOCATION,
  SETTINGS,
  SET_LANGUAGE,
  SET_ONBOARDING,
  USER,
} from 'actions/types';
import {CONFIG} from 'config';
import {IBase} from 'interface/IBase';
import {combineReducers} from 'redux';
const INITIAL_STATE: IBase = {
  user: {},
  settings: {},
  language: CONFIG.defaultLanguage,
  stationByLocation: [],
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
    default:
      return state;
  }
};

export default combineReducers({
  app: reduxReducer,
});
