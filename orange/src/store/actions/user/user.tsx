import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { userConstants } from '../actionTypes';
import { User } from '../../../api';

const setUserStatusNullSuccess = () => {
  const actionType = userConstants.NULL;
  return {
    type: actionType,
  };
};
export const setUserStatusNull = (() => (dispatch: Dispatch) => dispatch(
  setUserStatusNullSuccess(),
));

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

const loginSuccess = (user: User) => {
  window.location.reload();
  return {
    type: userConstants.LOGIN_SUCCESS,
    target: user,
  };
};
const loginFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 401:
      actionType = userConstants.LOGIN_FAILURE_INACTIVE;
      alert('메일을 확인하여 회원 인증을 완료해주세요!');
      break;
    case 403:
      actionType = userConstants.LOGIN_FAILURE_INFO;
      alert('잘못된 이름 또는 비밀번호입니다.');
      break;
    default:
      actionType = userConstants.LOGIN_FAILURE;
      alert(`로그인에 실패했어요ㅠㅠ\n 에러 메시지 : ${error.response?.status}`);
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

const signupSuccess = (user: User) => {
  alert('회원 인증 메일이 전송되었습니다!');
  return {
    type: userConstants.SIGNUP_SUCCESS,
    target: user,
  };
};
const signupFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 400:
      actionType = userConstants.SIGNUP_FAILURE_USERNAME;
      alert('이미 등록된 이름입니다.');
      break;
    case 401:
      actionType = userConstants.SIGNUP_WAITING;
      alert('이미 인증이 진행 중인 회원입니다.');
      break;
    case 409:
      actionType = userConstants.SIGNUP_FAILURE_EMAIL;
      alert('이미 등록된 메일입니다.');
      break;
    case 503:
      actionType = userConstants.SIGNUP_FAILURE_AUTHENTICATION;
      alert('회원 인증에 문제가 있습니다. 다시 시도해주세요.');
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
