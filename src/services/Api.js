import axios from 'axios';
import { store } from '../store';
import { GENERIC_SERVER_ERROR, ERRORS } from '../constants/constants';

const createAxiosInstance = ({ authToken, baseURL }) => {
  const config = {};
  if (authToken) {
    config.headers = { Authorization: `Bearer ${authToken}` };
  }
  if (baseURL) {
    config.baseURL = baseURL;
  }
  return axios.create(config);
};

export const handleApiError = (error) => {
  console.log(error);
};

class ApiService {
  authToken = '';
  accessToken = '';
  baseURL = '';

  constructor() {
    this.createNetworkInstances();
  }

  setBaseURL(baseURL) {
    this.baseURL = baseURL;
    this.createNetworkInstances();
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
    this.createNetworkInstances();
  }

  setAuthToken(authToken) {
    this.authToken = authToken;
    this.createNetworkInstances();
  }

  createNetworkInstances() {
    this.axios = createAxiosInstance({
      baseURL: this.baseURL,
      authToken: this.authToken,
      accessToken: this.accessToken
    });
    this.publicAxios = createAxiosInstance({ baseURL: this.baseURL });
  }

  getApiInstance(withToken) {
    return withToken ? this.axios : this.publicAxios;
  }

  async get(url, options = { withToken: true }, axiosOptions) {
    try {
      return await this.getApiInstance(options.withToken).get(
        url,
        axiosOptions,
      );
    } catch (e) {
      handleApiError(e);
    }
  }

  async post(url, data, options = { withToken: true }, headers) {
    try {
      return await this.getApiInstance(options.withToken).post(
        url,
        data,
        headers,
      );
    } catch (e) {
      handleApiError(e);
    }
  }

  async put(url, data, options = { withToken: true }, headers) {
    try {
      return await this.getApiInstance(options.withToken).put(
        url,
        data,
        headers,
      );
    } catch (e) {
      handleApiError(e);
    }
  }

  async delete(url, { skipError = false } = {}) {
    try {
      return await this.getApiInstance(true).delete(url);
    } catch (e) {
      if (!skipError) {
        handleApiError(e);
      } else {
        throw e;
      }
    }
  }
}

export default new ApiService();
