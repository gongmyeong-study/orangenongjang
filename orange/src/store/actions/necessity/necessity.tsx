import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { necessityConstants } from '../actionTypes';
import { NecessityHouse, Necessity } from '../../../api';

// 생필품 호출 기능
const getSuccess = (necessityHouse: NecessityHouse) => ({
  type: necessityConstants.GET_SUCCESS,
  target: necessityHouse,
});

const getFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
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
const createSuccess = (necessityHouse: NecessityHouse) => ({
  type: necessityConstants.CREATE_SUCCESS,
  target: necessityHouse,
});

const createFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
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
const removeSuccess = (necessityHouse: Necessity) => {
  window.alert('삭제되었습니다!');
  return {
    type: necessityConstants.REMOVE_SUCCESS,
    target: necessityHouse,
  };
};

const removeFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
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
const countSuccess = (necessity: Necessity) => ({
  type: necessityConstants.COUNT_SUCCESS,
  target: necessity,
});

const countFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
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
const updateSuccess = (necessityHouse: Necessity) => ({
  type: necessityConstants.UPDATE_SUCCESS,
  target: necessityHouse,
});

const updateFailure = (error: AxiosError) => {
  let actionType = null;
  window.alert('수정 내역을 다시 확인해주세요.');
  switch (error.response?.status) {
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
  .then((createResponse: AxiosResponse<NecessityHouse>) => {
    dispatch(createSuccess(createResponse.data));
  })
  .catch((createError) => dispatch(createFailure(createError)));

export const removeNecessityHouse = (
  houseId: number, necessityId: number,
) => (dispatch: Dispatch) => axios.delete(`/api/v1/house/${houseId}/necessity/${necessityId}/`)
  .then((removeResponse: AxiosResponse<Necessity>) => {
    dispatch(removeSuccess(removeResponse.data));
  })
  .catch((removeError) => dispatch(removeFailure(removeError)));

export const getNecessityHouse = (houseId: number) => (dispatch: Dispatch) => axios.get(`/api/v1/house/${houseId}/necessity/`)
  .then((getResponse: AxiosResponse<NecessityHouse>) => {
    dispatch(getSuccess(getResponse.data));
  })
  .catch((getError) => dispatch(getFailure(getError)));

export const countNecessityHouse = (
  houseId: number, necessityId: number, count: number,
) => (dispatch: Dispatch) => axios.put(`/api/v1/house/${houseId}/necessity/${necessityId}/count/`, { count })
  .then((countResponse: AxiosResponse<Necessity>) => {
    dispatch(countSuccess(countResponse.data));
  })
  .catch((countError) => dispatch(countFailure(countError)));

export const updateNecessityHouse = (
  houseId: number, necessityId: number, description: string, price?: number,
) => (dispatch: Dispatch) => axios.put(`/api/v1/house/${houseId}/necessity/${necessityId}/`, { description, price })
  .then((updateResponse: AxiosResponse<Necessity>) => {
    dispatch(updateSuccess(updateResponse.data));
  })
  .catch((updateError) => dispatch(updateFailure(updateError)));
