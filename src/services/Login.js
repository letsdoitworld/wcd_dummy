import _ from 'lodash';
import axios from 'axios';
import Api, { handleApiError } from './Api';

const fetchNetworkTokenAsync = async () => {
  let response;
  try {
    const accessToken = `${Api.accessToken}`;
    console.log(accessToken);
    response = await axios.post(`${Api.baseURL}/auth/external`, {
      source: 'facebook',
      token: accessToken
    });
  } catch (ex) {
    handleApiError(ex);
  }
  console.log(response);
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
