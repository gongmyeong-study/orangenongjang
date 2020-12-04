import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { houseConstants } from '../actionTypes';
import { House } from '../../../api';

const inviteHouseSuccess = (house: House) => ({
  type: houseConstants.INVITE_HOUSE_SUCCESS,
  target: house,
});
const inviteHouseFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 400:
      actionType = houseConstants.INVITE_HOUSE_FAILURE_ME;
      break;
    case 403:
      actionType = houseConstants.INVITE_HOUSE_FAILURE_LEADER;
      break;
    case 404:
      actionType = houseConstants.INVITE_HOUSE_FAILURE_EMAIL;
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
  .then((inviteResponse: AxiosResponse<House>) => {
    dispatch(inviteHouseSuccess(inviteResponse.data));
  })
  .catch((inviteError) => dispatch(inviteHouseFailure(inviteError)));

const leaveHouseSuccess = (house: House) => ({
  type: houseConstants.LEAVE_HOUSE_SUCCESS,
  target: house,
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
  .then((leaveResponse: AxiosResponse<House>) => dispatch(leaveHouseSuccess(leaveResponse.data)))
  .catch((leaveError) => dispatch(leaveHouseFailure(leaveError)));

const tossLeaderSuccess = (house: House) => ({
  type: houseConstants.TOSS_LEADER_SUCCESS,
  target: house,
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
  .then((tossResponse: AxiosResponse<House>) => dispatch(tossLeaderSuccess(tossResponse.data)))
  .catch((tossError) => dispatch(tossLeaderFailure(tossError)));
