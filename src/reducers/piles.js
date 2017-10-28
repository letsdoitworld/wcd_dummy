import {
  PILES_ADD_COUNTRIES
} from '../constants/constants';

const initialState = {
  AF: [],
  AR: [],
  BD: [],
  BJ: [],
  EE: [],
  GH: [],
  HT: [],
  IN: [],
  KE: [],
  NP: [],
  NG: [],
  PH: [],
  US: [],
  TZ: [],
  ZW: []
};

export default function pilesReducer(state = initialState, action) {
  switch (action.type) {
    case PILES_ADD_COUNTRIES:
      return action.payload;
    default:
      return state;
  }
}