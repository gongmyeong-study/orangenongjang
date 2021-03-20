import {
  getHouse,
  inviteHouse,
  leaveHouse,
  reintroduceHouse,
  removeHouse,
  renameHouse,
  setHouseStatusNull,
  tossLeader,
} from './house/house';

import {
  countNecessityPlace,
  createNecessityPlace,
  createPlace,
  removePlace,
  removeNecessityPlace,
  renamePlace,
  setNecessityStatusNull,
  updateNecessityPlace,
} from './necessity/necessity';

import {
  getMe,
  login,
  logout,
  signUp,
  setUserStatusNull,
} from './user/user';

export const houseActions = {
  getHouse,
  inviteHouse,
  leaveHouse,
  reintroduceHouse,
  removeHouse,
  renameHouse,
  setHouseStatusNull,
  tossLeader,
};

export const necessityActions = {
  countNecessityPlace,
  createNecessityPlace,
  createPlace,
  removePlace,
  removeNecessityPlace,
  renamePlace,
  setNecessityStatusNull,
  updateNecessityPlace,
};

export const userActions = {
  getMe,
  login,
  logout,
  signUp,
  setUserStatusNull,
};
