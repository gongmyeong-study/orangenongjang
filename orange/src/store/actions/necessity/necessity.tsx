import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { necessityConstants } from '../actionTypes';
import { House, Necessity, Place } from '../../../api';

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

const createNecessityPlaceSuccess = (place: Place) => ({
  type: necessityConstants.CREATE_NECESSITYPLACE_SUCCESS,
  target: place,
});

const createNecessityPlaceFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 409:
      actionType = necessityConstants.CREATE_NECESSITYPLACE_FAILURE_NAME;
      break;
    default:
      actionType = necessityConstants.CREATE_NECESSITYPLACE_FAILURE;
  }
  return {
    type: actionType,
    target: error,
  };
};

export const createNecessityPlace = (
  placeId: number, name: string, option: string, description: string, price: number, count: number,
) => (dispatch: Dispatch) => axios.post(`/api/v1/place/${placeId}/necessity/`, {
  placeId, name, option, description, price, count,
})
  .then((createResponse: AxiosResponse<Place>) => {
    dispatch(createNecessityPlaceSuccess(createResponse.data));
  })
  .catch((createError) => dispatch(createNecessityPlaceFailure(createError)));

const countNecessityPlaceSuccess = (necessity: Necessity) => ({
  type: necessityConstants.COUNT_NECESSITYPLACE_SUCCESS,
  target: necessity,
});

const countNecessityPlaceFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    default:
      actionType = necessityConstants.COUNT_NECESSITYPLACE_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};

export const countNecessityPlace = (
  placeId: number, necessityId: number, count: number,
) => (dispatch: Dispatch) => axios.put(`/api/v1/place/${placeId}/necessity/${necessityId}/count/`, { count })
  .then((countResponse: AxiosResponse<Necessity>) => {
    dispatch(countNecessityPlaceSuccess(countResponse.data));
  })
  .catch((countError) => dispatch(countNecessityPlaceFailure(countError)));

const updateNecessityPlaceSuccess = (necessity: Necessity) => ({
  type: necessityConstants.UPDATE_NECESSITYPLACE_SUCCESS,
  target: necessity,
});

const updateNecessityPlaceFailure = (error: AxiosError) => {
  let actionType = null;
  window.alert('수정 내역을 다시 확인해주세요.');
  switch (error.response?.status) {
    default:
      actionType = necessityConstants.UPDATE_NECESSITYPLACE_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};

export const updateNecessityPlace = (
  placeId: number, necessityId: number, description: string, price?: number,
) => (dispatch: Dispatch) => axios.put(`/api/v1/place/${placeId}/necessity/${necessityId}/`, { description, price })
  .then((updateResponse: AxiosResponse<Necessity>) => {
    dispatch(updateNecessityPlaceSuccess(updateResponse.data));
  })
  .catch((updateError) => dispatch(updateNecessityPlaceFailure(updateError)));

const removeNecessityPlaceSuccess = (place: Place) => {
  window.alert('삭제되었습니다!');
  return {
    type: necessityConstants.REMOVE_NECESSITYPLACE_SUCCESS,
    target: place,
  };
};

const removeNecessityPlaceFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    default:
      window.alert('실패!');
      actionType = necessityConstants.REMOVE_NECESSITYPLACE_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};

export const removeNecessityPlace = (
  placeId: number, necessityId: number,
) => (dispatch: Dispatch) => axios.delete(`/api/v1/place/${placeId}/necessity/${necessityId}/`)
  .then((removeResponse: AxiosResponse<Place>) => {
    dispatch(removeNecessityPlaceSuccess(removeResponse.data));
  })
  .catch((removeError) => dispatch(removeNecessityPlaceFailure(removeError)));
