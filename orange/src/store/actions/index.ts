import {
  signUp,
  login,
  logout,
  getMe,
} from './user/user';

import {
  createHouseNecessity,
  getNecessity,
  removeHouseNecessity,
  countNecessity,
} from './necessity/necessity';

export const userActions = {
  signUp,
  login,
  logout,
  getMe,
};

export const necessityActions = {
  createHouseNecessity,
  getNecessity,
  removeHouseNecessity,
  countNecessity,
};
