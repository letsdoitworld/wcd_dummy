import {
  CONFIG_API_URL_SET,
  CONFIG_FACEBOOK_ID_SET,
  CONFIG_FACEBOOK_DATA_SET,
  CONFIG_API_TOKEN_SET,
  CONFIG_IS_SIGN_IN_SET,
  CONFIG_TRASHPOINT_UUID_SET,
  CONFIG_IMPORT_FINISHED_SET
} from '../constants/constants';

const initialState = {
  apiUrl: null,
  apiToken: null,
  facebookAppId: null,
  facebookData: null,
  isSignIn: false,
  trashpointsDatasetUUID: null,
  importFinished: false
};

export default function configReducer(state = initialState, action) {
  switch (action.type) {
    case CONFIG_API_URL_SET:
      return { ...state, apiUrl: action.payload }
    case CONFIG_API_TOKEN_SET:
      return { ...state, apiToken: action.payload }
    case CONFIG_FACEBOOK_ID_SET:
      return { ...state, facebookAppId: action.payload }
    case CONFIG_FACEBOOK_DATA_SET:
      return { ...state, facebookData: action.payload }
    case CONFIG_IS_SIGN_IN_SET:
      return { ...state, isSignIn: action.payload }
    case CONFIG_TRASHPOINT_UUID_SET:
      return { ...state, trashpointsDatasetUUID: action.payload }
    case CONFIG_IMPORT_FINISHED_SET:
      return { ...state, importFinished: action.payload }
    default:
      return state;
  }
}