import _ from 'lodash';
import axios from 'axios';
import Api, { handleApiError } from './Api';
import { API_ENDPOINTS } from '../constants/constants';

const agreeToTerms = async () => {
  const response = await Api.put(
    '/me/accept-terms',
    {},
    { withToken: true },
    {
      'Content-Type': 'application/json',
    },
  );
  return true;
};

const createNewTrashpointsAsync = async (trashpoint, trashpointsDatasetUUID) => {
  let response;
  try {
    const newMarker = {
      datasetId: trashpointsDatasetUUID,
      hashtags: trashpoint.hashtags,
      composition: trashpoint.composition,
      location: trashpoint.location,
      status: trashpoint.status,
      name: trashpoint.name,
      address: trashpoint.address,
      amount: trashpoint.amount
    };
    response = await Api.put(API_ENDPOINTS.CREATE_TRASHPOINT, newMarker);
    console.log(response);
    if (!response) {
      console.log('Marker not exported: ', newMarker);
      return false;
    }
    return true;
  } catch (ex) {
    handleApiError(ex);
    return false;
  }
};

export {
  agreeToTerms,
  createNewTrashpointsAsync,
};