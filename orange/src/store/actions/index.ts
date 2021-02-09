import {
  signUp,
  login,
  logout,
  getMe,
} from './user/user';

import {
  createNecessityPlace,
  removeNecessityPlace,
  countNecessityPlace,
  updateNecessityPlace,
  renamePlace,
  removePlace,
} from './necessity/necessity';

import {
  getHouse,
  inviteHouse,
  leaveHouse,
  tossLeader,
  renameHouse,
  reintroduceHouse,
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
  getHouse,
  inviteHouse,
  leaveHouse,
  tossLeader,
  renameHouse,
  reintroduceHouse,
  removeHouse,
};
