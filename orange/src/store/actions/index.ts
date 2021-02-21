import {
  getHouse,
  inviteSetStateNull,
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
  updateNecessityPlace,
} from './necessity/necessity';

import {
  getMe,
  login,
  logout,
  signUp,
  signUpSetStateNull,
} from './user/user';

export const houseActions = {
  inviteSetStateNull,
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
  updateNecessityPlace,
};

export const userActions = {
  getMe,
  login,
  logout,
  signUp,
  signUpSetStateNull,
};
