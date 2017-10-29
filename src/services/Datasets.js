import _ from 'lodash';
import axios from 'axios';
import Api, { handleApiError } from './Api';
import { API_ENDPOINTS } from '../constants/constants';

const fetchDatasetsAsync = async (dispatch) => {
  let response;
  try {
    response = await Api.get(API_ENDPOINTS.FETCH_DATASETS);
  } catch (ex) {
    handleApiError(ex);
  }
  if (!response) {
    throw { error: 'Could not read datasets response data' };
  }

  const { data } = response;
  return data;
};

export {
  fetchDatasetsAsync,
};
