import {
  getHouse,
  inviteSetStatusNull,
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
  createPlace,
  removePlace,
  removeNecessityPlace,
  renamePlace,
  setStatusNull,
  updateNecessityPlace,
} from './necessity/necessity';

import {
  getMe,
  login,
  logout,
  signUp,
  signUpSetStatusNull,
} from './user/user';

export const houseActions = {
  inviteSetStatusNull,
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
  createPlace,
  removePlace,
  removeNecessityPlace,
  renamePlace,
  setStatusNull,
  updateNecessityPlace,
};

export const userActions = {
  getMe,
  login,
  logout,
  signUp,
  signUpSetStatusNull,
};
