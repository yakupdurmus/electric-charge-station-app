import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from 'reducers/combineReducers';

const middlewares = [ReduxThunk];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const store = createStore(reducers, {}, applyMiddleware(...middlewares));
