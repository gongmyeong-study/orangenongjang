import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { houseConstants, necessityConstants } from '../actionTypes';
import { House, UserHouse } from '../../../api';

const getHouseSuccess = (house: House) => ({
  type: necessityConstants.GET_HOUSE_SUCCESS,
  target: house,
});
const getHouseFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    default:
      actionType = necessityConstants.GET_HOUSE_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};
export const getHouse = (houseId: number) => (dispatch: Dispatch) => axios.get(`/api/v1/house/${houseId}/`)
  .then((getResponse: AxiosResponse<House>) => {
    dispatch(getHouseSuccess(getResponse.data));
  })
  .catch((getError) => dispatch(getHouseFailure(getError)));

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

const tossLeaderSuccess = (userHouse: Array<UserHouse>) => ({
  type: houseConstants.TOSS_LEADER_SUCCESS,
  target: userHouse,
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
  .then((tossResponse: AxiosResponse<[UserHouse]>) => dispatch(
    tossLeaderSuccess(tossResponse.data),
  ))
  .catch((tossError) => dispatch(tossLeaderFailure(tossError)));

const renameHouseSuccess = (house: House) => ({
  type: houseConstants.RENAME_HOUSE_SUCCESS,
  target: house,
});
const renameHouseFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 403:
      actionType = houseConstants.RENAME_HOUSE_FAILURE_LEADER;
      break;
    default:
      actionType = houseConstants.RENAME_HOUSE_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};

export const renameHouse = (
  houseId: number, name: string,
) => (dispatch: Dispatch) => axios.put(
  `/api/v1/house/${houseId}/`, { houseId, name },
)
  .then((renameHouseResponse: AxiosResponse<House>) => dispatch(
    renameHouseSuccess(renameHouseResponse.data),
  ))
  .catch((renameHouseError) => dispatch(renameHouseFailure(renameHouseError)));

const reintroduceHouseSuccess = (house: House) => ({
  type: houseConstants.REINTRODUCE_HOUSE_SUCCESS,
  target: house,
});
const reintroduceHouseFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 403:
      actionType = houseConstants.REINTRODUCE_HOUSE_FAILURE_LEADER;
      break;
    default:
      actionType = houseConstants.REINTRODUCE_HOUSE_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};
export const reintroduceHouse = (
  houseId: number, introduction: string,
) => (dispatch: Dispatch) => axios.put(
  `/api/v1/house/${houseId}/`, { houseId, introduction },
)
  .then((reintroduceHouseResponse: AxiosResponse<House>) => dispatch(
    reintroduceHouseSuccess(reintroduceHouseResponse.data),
  ))
  .catch((reintroduceHouseError) => dispatch(reintroduceHouseFailure(reintroduceHouseError)));

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
