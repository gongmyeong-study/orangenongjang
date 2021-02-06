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
  renamePlace,
  removePlace,
} from './necessity/necessity';

import {
  inviteHouse,
  leaveHouse,
  tossLeader,
  removeHouse,
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
  renamePlace,
  removePlace,
};

export const houseActions = {
  inviteHouse,
  leaveHouse,
  tossLeader,
  removeHouse,
};
