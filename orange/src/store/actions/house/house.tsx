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
      alert('House 정보를 불러올 수 없습니다. 다시 시도해주세요.');
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

const inviteHouseSuccess = () => {
  alert('초대되었습니다!');
  return {
    type: houseConstants.INVITE_HOUSE_SUCCESS,
  };
};
const inviteHouseFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 401:
      actionType = houseConstants.INVITE_HOUSE_FAILURE_INACTIVE_USER;
      alert('초대장을 받을 유저가 우선 회원 인증을 완료해야 합니다.');
      break;
    case 403:
      actionType = houseConstants.INVITE_HOUSE_FAILURE_LEADER;
      alert('Leader만 멤버를 초대할 수 있습니다.');
      break;
    case 404:
      actionType = houseConstants.INVITE_HOUSE_FAILURE_EMAIL;
      alert('오렌지농장에 등록되지 않은 회원입니다.');
      break;
    case 409:
      actionType = houseConstants.INVITE_HOUSE_FAILURE_USERNAME;
      alert('이미 초대된 멤버입니다.');
      break;
    case 503:
      actionType = houseConstants.INVITE_HOUSE_FAILURE_AUTHENTICATION;
      alert('메일주소 또는 인터넷 연결상태를 확인하고 다시 시도해주세요.');
      break;
    default:
      actionType = houseConstants.INVITE_HOUSE_FAILURE;
      alert(`House 초대에 실패했어요ㅠㅠ\n 에러 메시지 : ${error.response?.status}`);
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

const inviteStatusNull = () => {
  const actionType = houseConstants.NULL;
  return {
    type: actionType,
  };
};
export const inviteSetStateNull = (() => (dispatch: Dispatch) => dispatch(
  inviteStatusNull(),
));

const leaveHouseSuccess = () => {
  alert('Dobby is Free!');
  window.location.reload();
  return {
    type: houseConstants.LEAVE_HOUSE_SUCCESS,
  };
};
const leaveHouseFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 403:
      actionType = houseConstants.LEAVE_HOUSE_FAILURE_LEADER;
      alert('Leader는 House를 나갈 수 없습니다.');
      break;
    default:
      actionType = houseConstants.LEAVE_HOUSE_FAILURE;
      alert(`House 탈퇴에 실패했어요ㅠㅠ\n 에러 메시지 : ${error.response?.status}`);
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

const reintroduceHouseSuccess = (house: House) => ({
  type: houseConstants.REINTRODUCE_HOUSE_SUCCESS,
  target: house,
});
const reintroduceHouseFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 403:
      actionType = houseConstants.REINTRODUCE_HOUSE_FAILURE_LEADER;
      alert('House Leader만 House 소개를 변경할 수 있습니다.');
      break;
    default:
      actionType = houseConstants.REINTRODUCE_HOUSE_FAILURE;
      alert(`House 소개 변경에 실패했어요ㅠㅠ\n 에러 메시지 : ${error.response?.status}`);
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

const removeHouseSuccess = (houses: Array<House>) => {
  alert('House가 삭제되었습니다.');
  window.location.reload();
  return {
    type: houseConstants.TOSS_LEADER_SUCCESS,
    target: houses,
  };
};
const removeHouseFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 400:
      actionType = houseConstants.REMOVE_HOUSE_FAILURE_MEMBER;
      alert('House 멤버가 아닙니다.');
      break;
    case 403:
      actionType = houseConstants.REMOVE_HOUSE_FAILURE_LEADER;
      alert('House Leader만 House를 삭제할 수 있습니다.');
      break;
    default:
      actionType = houseConstants.REMOVE_HOUSE_FAILURE;
      alert(`House 삭제에 실패했어요ㅠㅠ\n 에러 메시지 : ${error.response?.status}`);
  }
  return {
    type: actionType,
    target: error,
  };
};
export const removeHouse = (houseId: number) => (dispatch: Dispatch) => axios.delete(`/api/v1/house/${houseId}/`)
  .then((removeHouseResponse: AxiosResponse<[House]>) => dispatch(
    removeHouseSuccess(removeHouseResponse.data),
  ))
  .catch((removeHouseError) => dispatch(removeHouseFailure(removeHouseError)));

const renameHouseSuccess = (house: House) => ({
  type: houseConstants.RENAME_HOUSE_SUCCESS,
  target: house,
});
const renameHouseFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 403:
      actionType = houseConstants.RENAME_HOUSE_FAILURE_LEADER;
      alert('House Leader만 House 이름을 변경할 수 있습니다.');
      break;
    default:
      actionType = houseConstants.RENAME_HOUSE_FAILURE;
      alert(`House 이름 변경에 실패했어요ㅠㅠ\n 에러 메시지 : ${error.response?.status}`);
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

const tossLeaderSuccess = (userHouse: Array<UserHouse>) => {
  alert('Leader가 변경되었습니다.');
  window.location.reload();
  return {
    type: houseConstants.TOSS_LEADER_SUCCESS,
    target: userHouse,
  };
};
const tossLeaderFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 400:
      actionType = houseConstants.TOSS_LEADER_FAILURE_ME;
      alert('자기 자신에게는 Leader를 양도할 수 없습니다.');
      break;
    case 403:
      actionType = houseConstants.TOSS_LEADER_FAILURE_LEADER;
      alert('Leader만 다른 사람에게 Leader를 양도할 수 있습니다.');
      break;
    default:
      actionType = houseConstants.TOSS_LEADER_FAILURE;
      alert(`Leader 양도에 실패했어요ㅠㅠ\n 에러 메시지 : ${error.response?.status}`);
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
