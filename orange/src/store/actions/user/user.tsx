import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { userConstants } from '../actionTypes';
import { User } from '../../../api';

// 회원가입
const signupSuccess = (user: User) => ({
  type: userConstants.SIGNUP_SUCCESS,
  target: user,
});

const signupFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 400:
      actionType = userConstants.SIGNUP_FAILURE_USERNAME;
      break;
    case 401:
      actionType = userConstants.SIGNUP_WAITING;
      break;
    case 409:
      actionType = userConstants.SIGNUP_FAILURE_EMAIL;
      break;
    case 503:
      actionType = userConstants.SIGNUP_FAILURE_AUTHENTICATION;
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
  .then((res: AxiosResponse<User>) => dispatch(signupSuccess(res.data)))
  .catch((err) => dispatch(signupFailure(err)));

// 로그인
const loginSuccess = (user: User) => ({
  type: userConstants.LOGIN_SUCCESS,
  target: user,
});

const loginFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 401:
      actionType = userConstants.LOGIN_FAILURE_INACTIVE;
      break;
    case 403:
      actionType = userConstants.LOGIN_FAILURE_INFO;
      break;
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
  .then((res: AxiosResponse<User>) => dispatch(loginSuccess(res.data)))
  .catch((err) => dispatch(loginFailure(err)));

// 로그아웃
const logoutSuccess = () => ({
  type: userConstants.LOGOUT_SUCCESS,
  target: null,
});

const logoutFailure = (error: AxiosError) => ({
  type: userConstants.LOGOUT_FAILURE,
  target: error,
});

export const logout = () => (dispatch: Dispatch) => axios.get('/api/v1/user/logout/')
  .then(() => dispatch(logoutSuccess()))
  .catch((err) => dispatch(logoutFailure(err)));

// 회원정보
const getMeSuccess = (user: User) => ({
  type: userConstants.GET_ME_SUCCESS,
  target: user,
});

const getMeFailure = (error: AxiosError) => ({
  type: userConstants.GET_ME_FAILURE,
  target: error,
});

export const getMe = () => (dispatch: Dispatch) => axios.get('/api/v1/user/me/')
  .then((res: AxiosResponse<User>) => dispatch(getMeSuccess(res.data)))
  .catch((err) => dispatch(getMeFailure(err)));
