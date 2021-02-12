import {
  getHouse,
  inviteHouse,
  leaveHouse,
  reintroduceHouse,
  removeHouse,
  renameHouse,
  tossLeader,
} from './house/house';

import {
  countNecessityPlace,
  createNecessityPlace,
  removePlace,
  removeNecessityPlace,
  renamePlace,
  updateNecessityPlace,
} from './necessity/necessity';

import {
  getMe,
  login,
  logout,
  signUp,
} from './user/user';

export const houseActions = {
  getHouse,
  inviteHouse,
  leaveHouse,
  reintroduceHouse,
  removeHouse,
  renameHouse,
  tossLeader,
};

export const necessityActions = {
  countNecessityPlace,
  createNecessityPlace,
  removePlace,
  removeNecessityPlace,
  renamePlace,
  updateNecessityPlace,
};

export const userActions = {
  getMe,
  login,
  logout,
  signUp,
};
