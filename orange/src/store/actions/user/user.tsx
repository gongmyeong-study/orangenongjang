import axios from 'axios';
import { Dispatch } from 'redux';
import { userConstants } from '../actionTypes';


const loginSuccess = (user: any) => ({
  type: userConstants.LOGIN_SUCCESS,
  target: user,
});

const loginFailure = (error: any) => {
  let actionType = null;
  switch (error.response.status) {
    default:
      actionType = userConstants.LOGIN_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};

export const login = (
  username: string, password: string,
) => (dispatch: Dispatch) => axios.put('/api/v1/user/login/', { username, password })
  .then((res) => dispatch(loginSuccess(res.data)))
  .catch((err) => dispatch(loginFailure(err)));
