import { combineReducers } from 'redux';
import appReducer from './Containers/App/reducer';
import { StoreStateI as appStoreStateI } from './Containers/App/types';

export interface GlobalStateI {
  appReducer: appStoreStateI;
}

const rootReducer = combineReducers({
  appReducer,
});

export default rootReducer;
