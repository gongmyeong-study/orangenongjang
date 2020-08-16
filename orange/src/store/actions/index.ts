import {
  signUp,
  login,
  logout,
  getMe,
} from './user/user';

import {
  createNecessity,
  getNecessity,
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
};
