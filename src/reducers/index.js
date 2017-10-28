import { combineReducers } from "redux";
import configReducer from './config';
import pilesReducer from './piles';

export const reducers = combineReducers({
  config: configReducer,
  piles: pilesReducer
});
