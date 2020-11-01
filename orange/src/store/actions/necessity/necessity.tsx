import axios from 'axios';
import { Dispatch } from 'redux';
import { necessityConstants } from '../actionTypes';

// 생필품 호출 기능
const getSuccess = (data: any) => ({
  type: necessityConstants.GET_SUCCESS,
  target: data.necessities,
});

const getFailure = (error: any) => {
  let actionType = null;
  switch (error.response.status) {
    default:
      actionType = necessityConstants.GET_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};

// 생필품 추가 기능
const createSuccess = (necessities: any) => ({
  type: necessityConstants.CREATE_SUCCESS,
  target: necessities,
});

const createFailure = (error: any) => {
  let actionType = null;
  switch (error.response.status) {
    case 409:
      actionType = necessityConstants.CREATE_FAILURE_NAME;
      break;
    default:
      actionType = necessityConstants.CREATE_FAILURE;
  }
  return {
    type: actionType,
    target: error,
  };
};

// 생필품 삭제 기능
const removeSuccess = (necessities: any) => {
  window.alert('삭제되었습니다!');
  return {
    type: necessityConstants.REMOVE_SUCCESS,
    target: necessities,
  };
};

const removeFailure = (error: any) => {
  let actionType = null;
  switch (error.response.status) {
    default:
      window.alert('실패!');
      actionType = necessityConstants.REMOVE_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};

// 생필품 수량 기능
const countSuccess = (necessities: any) => ({
  type: necessityConstants.COUNT_SUCCESS,
  target: necessities,
});

const countFailure = (error: any) => {
  let actionType = null;
  switch (error.response.status) {
    default:
      actionType = necessityConstants.COUNT_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};

// 생필품 수정 기능
const updateSuccess = (necessities: any) => ({
  type: necessityConstants.UPDATE_SUCCESS,
  target: necessities,
});

const updateFailure = (error: any) => {
  let actionType = null;
  switch (error.response.status) {
    default:
      actionType = necessityConstants.UPDATE_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};

export const createNecessityHouse = (
  houseId: number, name: string, option: string, description: string, price: number, count: number,
) => (dispatch: Dispatch) => axios.post(`/api/v1/house/${houseId}/necessity/`, {
  houseId, name, option, description, price, count,
})
  .then((createResponse) => dispatch(createSuccess(createResponse.data)))
  .catch((createError) => dispatch(createFailure(createError)));

export const removeNecessityHouse = (
  houseId: number, necessityId: number,
) => (dispatch: Dispatch) => axios.delete(`/api/v1/house/${houseId}/necessity/${necessityId}/`)
  .then((removeResponse) => dispatch(removeSuccess(removeResponse.data)))
  .catch((removeError) => dispatch(removeFailure(removeError)));

export const getNecessityHouse = (houseId: number) => (dispatch: Dispatch) => axios.get(`/api/v1/house/${houseId}/necessity/`)
  .then((getResponse) => dispatch(getSuccess(getResponse.data)))
  .catch((getError) => dispatch(getFailure(getError)));

export const countNecessityHouse = (
  houseId: number, necessityId: number, count: number,
) => (dispatch: Dispatch) => axios.put(`/api/v1/house/${houseId}/necessity/${necessityId}/count/`, { count })
  .then((countResponse) => dispatch(countSuccess(countResponse.data)))
  .catch((countError) => dispatch(countFailure(countError)));

export const updateNecessityHouse = (
  houseId: number, necessityId: number, description: string, price: number,
) => (dispatch: Dispatch) => axios.put(`/api/v1/house/${houseId}/necessity/${necessityId}/`, { description, price })
  .then((updateResponse) => dispatch(updateSuccess(updateResponse.data)))
  .catch((updateError) => dispatch(updateFailure(updateError)));
