import {
  signUp,
  login,
  logout,
  getMe,
} from './user/user';

import {
  createNecessity,
  getNecessity,
  removeNecessity,
} from './necessity/necessity';

export const userActions = {
  signUp,
  login,
  logout,
  getMe,
};

export const necessityActions = {
  createNecessity,
  getNecessity,
  removeNecessity,
};
