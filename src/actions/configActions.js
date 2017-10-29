import {
  CONFIG_API_URL_SET,
  CONFIG_FACEBOOK_ID_SET,
  CONFIG_FACEBOOK_DATA_SET,
  CONFIG_API_TOKEN_SET,
  CONFIG_IS_SIGN_IN_SET,
  CONFIG_TRASHPOINT_UUID_SET,
  DATASETS_TYPES,
  CONFIG_IMPORT_FINISHED_SET
} from '../constants/constants';
import { fetchNetworkTokenAsync } from '../services/Login';
import { fetchDatasetsAsync } from '../services/Datasets';
import Api, { handleApiError } from '../services/Api';

export const setApiUrl = (url) => dispatch => {
  Api.setBaseURL(url);
  dispatch({
    type: CONFIG_API_URL_SET,
    payload: url
  });
};

export const setApiToken = token => ({
  type: CONFIG_API_TOKEN_SET,
  payload: token,
});

export const setTrashpointsDatasetUUID = trashpointsDatasetUUID => ({
  type: CONFIG_TRASHPOINT_UUID_SET,
  payload: trashpointsDatasetUUID,
});

export const setFacebookId = (facebookId) => ({
  type: CONFIG_FACEBOOK_ID_SET,
  payload: facebookId
});

export const setIsSignIn = () => ({
  type: CONFIG_IS_SIGN_IN_SET,
  payload: true
});

export const setImportFinished = () => ({
  type: CONFIG_IMPORT_FINISHED_SET,
  payload: true
});

export const setFacebookData = (facebookData) => dispatch => {
  if(facebookData.accessToken) {
    Api.setAccessToken(facebookData.accessToken);
  }
  dispatch({
    type: CONFIG_FACEBOOK_DATA_SET,
    payload: facebookData
  });
};

export const apiDatasets = () => async (dispatch) => {
  try {
    let data;
    try {
      data = await fetchDatasetsAsync();
    } catch (ex) {
      console.log(ex);
      return;
    }
    const tokenUUID = data.find(
      ({ type }) => type === DATASETS_TYPES.TRASHPOINTS,
    ).id;
    dispatch(setTrashpointsDatasetUUID(tokenUUID));
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

export const apiLogin = () => async (dispatch) => {
  try {
    let token;
    try {
      token = await fetchNetworkTokenAsync();
    } catch (ex) {
      console.log(ex);
      return;
    }
    dispatch(setApiToken(token));
    dispatch(setIsSignIn());
    return token;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

export const setInitialConfig = (url, facebookId) => dispatch => {
  dispatch(setApiUrl(url));
  dispatch(setFacebookId(facebookId));
};