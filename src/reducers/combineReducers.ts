import {SETTINGS, SET_LANGUAGE, USER} from 'actions/types';
import {CONFIG} from 'config';
import {combineReducers} from 'redux';
const INITIAL_STATE = {
  user: {},
  settings: {},
  language: CONFIG.defaultLanguage,
};

const reduxReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case USER:
      return {...state, user: action.payload};
    case SETTINGS:
      return {...state, settings: action.payload};
    case SET_LANGUAGE:
      return {...state, language: action.payload};
    default:
      return state;
  }
};

export default combineReducers({
  collection: reduxReducer,
});
