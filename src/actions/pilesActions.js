import {
  PILES_ADD_COUNTRIES,
  PILES_UPDATE_GEODATA,
  PILES_GEODATA_UPDATED
} from '../constants/constants';

export const addPiles = (countries) => ({
  type: PILES_ADD_COUNTRIES,
  payload: countries,
});

export const addGeodataToPile = (data) => ({
  type: PILES_UPDATE_GEODATA,
  payload: data,
});

export const geodataUpdated = () => ({
  type: PILES_GEODATA_UPDATED
});