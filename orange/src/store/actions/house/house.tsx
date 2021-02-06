import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { houseConstants } from '../actionTypes';
import { House, User } from '../../../api';

const inviteHouseSuccess = () => ({
  type: houseConstants.INVITE_HOUSE_SUCCESS,
});
const inviteHouseFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 401:
      actionType = houseConstants.INVITE_HOUSE_FAILURE_INACTIVE_USER;
      break;
    case 403:
      actionType = houseConstants.INVITE_HOUSE_FAILURE_LEADER;
      break;
    case 404:
      actionType = houseConstants.INVITE_HOUSE_FAILURE_EMAIL;
      break;
    case 409:
      actionType = houseConstants.INVITE_HOUSE_FAILURE_USERNAME;
      break;
    case 503:
      actionType = houseConstants.INVITE_HOUSE_FAILURE_AUTHENTICATION;
      break;
    default:
      actionType = houseConstants.INVITE_HOUSE_FAILURE;
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
  .then(() => dispatch(inviteHouseSuccess()))
  .catch((inviteError) => dispatch(inviteHouseFailure(inviteError)));

const leaveHouseSuccess = () => ({
  type: houseConstants.LEAVE_HOUSE_SUCCESS,
});
const leaveHouseFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 403:
      actionType = houseConstants.LEAVE_HOUSE_FAILURE_LEADER;
      break;
    default:
      actionType = houseConstants.LEAVE_HOUSE_FAILURE;
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
  .then(() => dispatch(leaveHouseSuccess()))
  .catch((leaveError) => dispatch(leaveHouseFailure(leaveError)));

const tossLeaderSuccess = (users: Array<User>) => ({
  type: houseConstants.TOSS_LEADER_SUCCESS,
  target: users,
});
const tossLeaderFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 400:
      actionType = houseConstants.TOSS_LEADER_FAILURE_ME;
      break;
    case 403:
      actionType = houseConstants.TOSS_LEADER_FAILURE_LEADER;
      break;
    default:
      actionType = houseConstants.TOSS_LEADER_FAILURE;
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
  .then((tossResponse: AxiosResponse<[User]>) => dispatch(tossLeaderSuccess(tossResponse.data)))
  .catch((tossError) => dispatch(tossLeaderFailure(tossError)));

const removeHouseSuccess = (houses: Array<House>) => ({
  type: houseConstants.REMOVE_HOUSE_SUCCESS,
  target: houses,
});

const removeHouseFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 400:
      actionType = houseConstants.REMOVE_HOUSE_FAILURE_MEMBER;
      break;
    case 403:
      actionType = houseConstants.REMOVE_HOUSE_FAILURE_LEADER;
      break;
    default:
      actionType = houseConstants.REMOVE_HOUSE_FAILURE;
  }
  return {
    type: actionType,
    target: error,
  };
};

export const removeHouse = (houseId: number) => (dispatch: Dispatch) => axios.delete(`/api/v1/house/${houseId}/`)
  .then((removeHouseResponse: AxiosResponse<[House]>) => {
    dispatch(removeHouseSuccess(removeHouseResponse.data));
  })
  .catch((removeHouseError) => dispatch(removeHouseFailure(removeHouseError)));
