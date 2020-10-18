import {
  signUp,
  login,
  logout,
  getMe,
} from './user/user';

import {
  createHouseNecessity,
  getHouseNecessity,
  removeHouseNecessity,
  countHouseNecessity,
} from './necessity/necessity';

export const userActions = {
  signUp,
  login,
  logout,
  getMe,
};

export const necessityActions = {
  createHouseNecessity,
  getHouseNecessity,
  removeHouseNecessity,
  countHouseNecessity,
};
