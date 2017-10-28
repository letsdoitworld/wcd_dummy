export const CONFIG_API_URL_SET = 'CONFIG_API_URL_SET';
export const CONFIG_FACEBOOK_ID_SET = 'CONFIG_FACEBOOK_ID_SET';
export const CONFIG_FACEBOOK_DATA_SET = 'CONFIG_FACEBOOK_DATA_SET';
export const CONFIG_API_TOKEN_SET = 'CONFIG_API_TOKEN_SET';
export const CONFIG_IS_SIGN_IN_SET = 'CONFIG_IS_SIGN_IN_SET';
export const PILES_ADD_COUNTRIES = 'PILES_ADD_COUNTRIES';
export const PILES_UPDATE_GEODATA = 'PILES_UPDATE_GEODATA';
export const PILES_GEODATA_UPDATED = 'PILES_GEODATA_UPDATED';

export const API_ENDPOINTS = {
  FETCH_DATASETS: '/datasets',
  USER_ME: '/me',
  USER_TEAM: '/me/team',
  USER_AUTH: '/auth/external',
  FETCH_OVERVIEW_CLUSTERS: '/overview/clusters',
  FETCH_OVERVIEW_TRASHPOINTS: '/overview/trashpoints',
  CREATE_TRASHPOINT: '/trashpoints',
  UPDATE_TRASHPOINT: trashpointId => `/trashpoints/${trashpointId}`,
  FETCH_USERS_TRASHPOINTS: `/trashpoints/user`,
  FETCH_TRASHPOINT_DETAILS: trashpointId => `/trashpoints/${trashpointId}`,
  FETCH_TRASHPOINT_IMAGES: trashpointId =>
    `/trashpoints/${trashpointId}/images`,
  DELETE_IMAGE: (trashpointId, imageId) =>
    `/trashpoints/${trashpointId}/images/${imageId}`,
  FETCH_CLUSTER_TRASHPOINTS: '/overview/trashpoints/grid',
  FETCH_TEAMS: '/teams',
  FETCH_TEAM: teamId =>
    `/teams/${teamId}`,
};

export const ERRORS = {
  404: 'There was an error on the server.',
};

export const GENERIC_SERVER_ERROR = 'There was an error on the server';

export const TRASH_COMPOSITION_TYPE_LIST = [
  'plastic',
  'metal',
  'glass',
  'electronics',
  'paper',
  'tyres',
  'domestic waste',
  'furniture',
  'organic waste',
];