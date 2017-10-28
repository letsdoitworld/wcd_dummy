import {
  CONFIG_API_URL_SET,
  CONFIG_FACEBOOK_ID_SET,
  CONFIG_FACEBOOK_DATA_SET,
  CONFIG_API_TOKEN_SET,
  CONFIG_IS_SIGN_IN_SET
} from '../constants/constants';
import { Api } from '../services';
import { fetchNetworkTokenAsync } from '../services/Login';

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

export const setFacebookId = (facebookId) => ({
  type: CONFIG_FACEBOOK_ID_SET,
  payload: facebookId
});

export const setIsSignIn = () => ({
  type: CONFIG_IS_SIGN_IN_SET,
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