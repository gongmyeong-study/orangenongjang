import {
  signUp,
  login,
  logout,
  getMe,
} from './user/user';

import {
  createNecessityHouse,
  getNecessityHouse,
  removeNecessityHouse,
  countNecessityHouse,
  updateNecessityHouse,
} from './necessity/necessity';

export const userActions = {
  signUp,
  login,
  logout,
  getMe,
};

export const necessityActions = {
  createNecessityHouse,
  getNecessityHouse,
  removeNecessityHouse,
  countNecessityHouse,
  updateNecessityHouse,
};
