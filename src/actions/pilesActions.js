import _ from 'lodash';
import {
  PILES_ADD_COUNTRIES,
  PILES_UPDATE_GEODATA,
  PILES_GEODATA_UPDATED,
  PILES_REMOVE_PILE
} from '../constants/constants';
import { createNewTrashpointsAsync, agreeToTerms } from '../services/Trashpoint';
import { setImportFinished } from './configActions';

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

export const removePile = (country, index) => ({
  type: PILES_REMOVE_PILE,
  payload: {
    country: country,
    index: index
  }
});

export const exportPiles = () => async (dispatch, getState) => {
  const state = getState();
  const piles = _.pickBy(state.piles, function(value, key) {
    return Array.isArray(value);
  });
  const trashpointsDatasetUUID = state.config.trashpointsDatasetUUID;
  let agree;
  try {
    agree = await agreeToTerms();
    if(!agree) {
      console.log('Problems with agree terms and conditions for this user');
    }
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
  try {
    for (const country in piles) {
      console.log('start import for: ', country);
      let clength = piles[country].length - 1;
      for (;;) {
        if (clength < 0) {
          break;
        }
        let result;
        try {
          console.log('Import: ', piles[country][clength]);
          result = await createNewTrashpointsAsync(piles[country][clength], trashpointsDatasetUUID);
          console.log(result);
          if(result === true) {
            dispatch(removePile(country, clength));
          }
        } catch (ex) {
          console.log(ex);
        }
        clength--;
      }
    }
    dispatch(setImportFinished());
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};