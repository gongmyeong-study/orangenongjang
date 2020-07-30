import {
    login,
} from './user/user';

import {
    createNecessity,
    toggleNecessity
} from './necessity/necessity';

export const userActions = {
    login,
};

export const necessityActions = {
    createNecessity,
    toggleNecessity,
}
