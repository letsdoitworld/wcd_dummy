import {
  PILES_ADD_COUNTRIES
} from '../constants/constants';

export const addPiles = (countries) => ({
  type: PILES_ADD_COUNTRIES,
  payload: countries,
});