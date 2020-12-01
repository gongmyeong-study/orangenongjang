import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { houseConstants } from '../actionTypes';
import { House } from '../../../api';

// 멤버 초대
const inviteSuccess = (house: House) => ({
  type: houseConstants.INVITE_SUCCESS,
  target: house,
});
const inviteFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 403:
      actionType = houseConstants.INVITE_FAILURE_LEADER;
      break;
    case 404:
      actionType = houseConstants.INVITE_FAILURE_EMAIL;
      break;
    case 503:
      actionType = houseConstants.INVITE_FAILURE_AUTHENTICATION;
      break;
    default:
      actionType = houseConstants.INVITE_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};
export const inviteHouse = (
  houseId: number, email: string,
) => (dispatch: Dispatch) => axios.post(`/api/v1/house/${houseId}/invitation/`, { email })
  .then((inviteResponse: AxiosResponse<House>) => dispatch(inviteSuccess(inviteResponse.data)))
  .catch((inviteError) => dispatch(inviteFailure(inviteError)));

// House 나가기
const leaveSuccess = (house: House) => ({
  type: houseConstants.LEAVE_SUCCESS,
  target: house,
});
const leaveFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 403:
      actionType = houseConstants.LEAVE_FAILURE_LEADER;
      break;
    default:
      actionType = houseConstants.LEAVE_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};
export const leaveHouse = (
  houseId: number,
) => (dispatch: Dispatch) => axios.delete(`/api/v1/house/${houseId}/user/`)
  .then((leaveResponse: AxiosResponse<House>) => dispatch(leaveSuccess(leaveResponse.data)))
  .catch((leaveError) => dispatch(leaveFailure(leaveError)));

// Leader 양도
const tossSuccess = (house: House) => ({
  type: houseConstants.LEAVE_SUCCESS,
  target: house,
});
const tossFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 400:
      actionType = houseConstants.TOSS_FAILURE_ME;
      break;
    case 403:
      actionType = houseConstants.TOSS_FAILURE_LEADER;
      break;
    default:
      actionType = houseConstants.TOSS_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};
export const tossLeader = (
  houseId: number, userId: number,
) => (dispatch: Dispatch) => axios.post(`/api/v1/house/${houseId}/user/${userId}/leader/`)
  .then((tossResponse: AxiosResponse<House>) => dispatch(tossSuccess(tossResponse.data)))
  .catch((tossError) => dispatch(tossFailure(tossError)));
