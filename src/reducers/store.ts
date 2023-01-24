import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from 'reducers/combineReducers';

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
