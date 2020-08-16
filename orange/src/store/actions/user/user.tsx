import axios from 'axios';
import { Dispatch } from 'redux';
import { userConstants } from '../actionTypes';

const signupSuccess = (user: any) => ({
  type: userConstants.SIGNUP_SUCCESS,
  target: user,
});

const signupFailure = (error: any) => {
  let actionType = null;
  switch (error.response.status) {
    case 409:
      actionType = userConstants.SIGNUP_FAILURE_USERNAME;
      break;
    default:
      actionType = userConstants.SIGNUP_FAILURE;
  }
  return {
    type: actionType,
    target: error,
  };
};

export const signUp = (
  email: string, username: string, password: string,
) => (dispatch: Dispatch) => axios.post('/api/v1/user/', { email, username, password })
  .then((res) => dispatch(signupSuccess(res.data)))
  .catch((err) => dispatch(signupFailure(err)));

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

const logoutSuccess = () => ({
  type: userConstants.LOGOUT_SUCCESS,
  target: null,
});

const logoutFailure = (error: any) => ({
  type: userConstants.LOGOUT_FAILURE,
  target: error,
});

export const logout = () => (dispatch: Dispatch) => axios.get('/api/v1/user/logout/')
  .then(() => dispatch(logoutSuccess()))
  .catch((err) => dispatch(logoutFailure(err)));

const getMeSuccess = (user: any) => ({
  type: userConstants.GET_ME_SUCCESS,
  target: user,
});

const getMeFailure = (error: any) => ({
  type: userConstants.GET_ME_FAILURE,
  target: error,
});

export const getMe = () => (dispatch: Dispatch) => axios.get('/api/v1/user/me/')
  .then((res) => dispatch(getMeSuccess(res.data)))
  .catch((err) => dispatch(getMeFailure(err)));
