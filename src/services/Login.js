import _ from 'lodash';
import axios from 'axios';
import Api, { handleApiError } from './Api';
import { API_ENDPOINTS } from '../constants/constants';

const fetchNetworkTokenAsync = async () => {
  let response;
  try {
    const accessToken = `${Api.accessToken}`;
    response = await axios.post(`${Api.baseURL}${API_ENDPOINTS.USER_AUTH}`, {
      source: 'facebook',
      token: accessToken
    });
  } catch (ex) {
    handleApiError(ex);
  }
  if (!_.has(response, 'data.token')) {
    throw { error: 'Could not read authentification response data' };
  }
  const networkToken = response.data.token;
  Api.setAuthToken(networkToken);
  return networkToken;
};

export {
  fetchNetworkTokenAsync,
};
