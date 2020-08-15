import {
  login,
  signUp,
} from './user/user';

import {
  createNecessity,
  getNecessity,
} from './necessity/necessity';

export const userActions = {
  login,
  signUp,
};

export const necessityActions = {
  createNecessity,
  getNecessity,
};
