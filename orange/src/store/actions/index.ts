import {
  signUp,
  login,
  logout,
  getMe,
} from './user/user';

import {
  createNecessityPlace,
  getHouse,
  removeNecessityPlace,
  countNecessityPlace,
  updateNecessityPlace,
} from './necessity/necessity';

import {
  inviteHouse,
} from './house/house';

export const userActions = {
  signUp,
  login,
  logout,
  getMe,
};

export const necessityActions = {
  createNecessityPlace,
  getHouse,
  removeNecessityPlace,
  countNecessityPlace,
  updateNecessityPlace,
};

export const houseActions = {
  inviteHouse,
};
