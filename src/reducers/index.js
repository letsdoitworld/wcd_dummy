import { combineReducers } from "redux";
import configReducer from './config';

export const reducers = combineReducers({
  config: configReducer
});
