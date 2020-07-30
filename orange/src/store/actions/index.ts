import {
    login,
    signUp
} from './user/user';

import {
    createNecessity,
    toggleNecessity
} from './necessity/necessity';

export const userActions = {
    login,
    signUp,
};

export const necessityActions = {
    createNecessity,
    toggleNecessity,
}
