import _ from 'lodash';
import {
  PILES_ADD_COUNTRIES,
  PILES_UPDATE_GEODATA,
  PILES_GEODATA_UPDATED,
  PILES_REMOVE_PILE
} from '../constants/constants';

const initialState = {
  loaded: false,
  geoLoaded: false,
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

const removeCounter = (list, index) => {
  return list
};

export default function pilesReducer(state = initialState, action) {
  switch (action.type) {
    case PILES_ADD_COUNTRIES:
      return action.payload;
    case PILES_GEODATA_UPDATED:
      return { ...state, geoLoaded: true };
    case PILES_UPDATE_GEODATA:
      if(
        state[action.payload.country] &&
        state[action.payload.country][action.payload.index]
      ) {
        state[action.payload.country][action.payload.index].name = action.payload.name;
        state[action.payload.country][action.payload.index].address = action.payload.address;
      }
      return state;
    case PILES_REMOVE_PILE:
      if(
        state[action.payload.country] &&
        state[action.payload.country][action.payload.index]
      ) {
        state[action.payload.country] = state[action.payload.country].filter((item, i) => {
          return i !== action.payload.index;
        });
      }
      return state;
    default:
      return state;
  }
}