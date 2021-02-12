import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { necessityConstants } from '../actionTypes';
import { Necessity, Place } from '../../../api';

const countNecessityPlaceSuccess = (necessity: Necessity) => ({
  type: necessityConstants.COUNT_NECESSITYPLACE_SUCCESS,
  target: necessity,
});
const countNecessityPlaceFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    default:
      actionType = necessityConstants.COUNT_NECESSITYPLACE_FAILURE;
      alert(`Necessity 수량 변경에 실패했어요ㅠㅠ\n 에러 메시지 : ${error.response?.status}`);
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
  .then((countNecessityPlaceResponse: AxiosResponse<Necessity>) => {
    dispatch(countNecessityPlaceSuccess(countNecessityPlaceResponse.data));
  })
  .catch((countNecessityPlaceError) => dispatch(
    countNecessityPlaceFailure(countNecessityPlaceError),
  ));

const createPlaceSuccess = (place: Place) => ({
  type: necessityConstants.CREATE_PLACE_SUCCESS,
  target: place,
});
const createPlaceFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 409:
      actionType = necessityConstants.CREATE_PLACE_FAILURE_NAME;
      alert('같은 이름의 Place가 존재합니다.');
      break;
    default:
      actionType = necessityConstants.CREATE_PLACE_FAILURE;
      alert(`Place 생성에 실패했어요ㅠㅠ\n 에러 메시지 : ${error.response?.status}`);
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};
export const createPlace = (
  houseId: number, name: string,
) => (dispatch: Dispatch) => axios.post(`/api/v1/house/${houseId}/place/`, { name })
  .then((createPlaceResponse: AxiosResponse<Place>) => {
    dispatch(createPlaceSuccess(createPlaceResponse.data));
  })
  .catch((createPlaceError) => dispatch(createPlaceFailure(createPlaceError)));

const createNecessityPlaceSuccess = (place: Place) => ({
  type: necessityConstants.CREATE_NECESSITYPLACE_SUCCESS,
  target: place,
});
const createNecessityPlaceFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 409:
      actionType = necessityConstants.CREATE_NECESSITYPLACE_FAILURE_NAME;
      alert('같은 이름의 Necessity가 존재합니다.');
      break;
    default:
      actionType = necessityConstants.CREATE_NECESSITYPLACE_FAILURE;
      alert(`Necessity 생성에 실패했어요ㅠㅠ\n 에러 메시지 : ${error.response?.status}`);
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
  .then((createNecessityPlaceResponse: AxiosResponse<Place>) => {
    dispatch(createNecessityPlaceSuccess(createNecessityPlaceResponse.data));
  })
  .catch((createNecessityPlaceError) => dispatch(
    createNecessityPlaceFailure(createNecessityPlaceError),
  ));

const removePlaceSuccess = (places: Array<Place>) => ({
  type: necessityConstants.REMOVE_PLACE_SUCCESS,
  target: places,
});
const removePlaceFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 400:
      actionType = necessityConstants.REMOVE_PLACE_FAILURE_MEMBER;
      alert('House 멤버만 Place를 삭제할 수 있습니다.');
      break;
    case 403:
      actionType = necessityConstants.REMOVE_PLACE_FAILURE_LEADER;
      alert('Leader만 Place를 삭제할 수 있습니다.');
      break;
    case 404:
      actionType = necessityConstants.REMOVE_PLACE_FAILURE_NOT_FOUND;
      alert('존재하지 않는 Place입니다.');
      break;
    default:
      actionType = necessityConstants.REMOVE_PLACE_FAILURE;
      alert(`Place 삭제에 실패했어요ㅠㅠ\n 에러 메시지 : ${error.response?.status}`);
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};
export const removePlace = (
  houseId: number, placeId: number,
) => (dispatch: Dispatch) => axios.delete(
  `/api/v1/house/${houseId}/place/${placeId}/`,
)
  .then((removePlaceResponse: AxiosResponse<[Place]>) => dispatch(
    removePlaceSuccess(removePlaceResponse.data),
  ))
  .catch((removePlaceError) => dispatch(removePlaceFailure(removePlaceError)));

const removeNecessityPlaceSuccess = (place: Place) => {
  alert('삭제되었습니다!');
  return {
    type: necessityConstants.REMOVE_NECESSITYPLACE_SUCCESS,
    target: place,
  };
};
const removeNecessityPlaceFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    default:
      actionType = necessityConstants.REMOVE_NECESSITYPLACE_FAILURE;
      alert(`Necessity 삭제에 실패했어요ㅠㅠ\n 에러 메시지 : ${error.response?.status}`);
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
  .then((removeNecessityPlaceResponse: AxiosResponse<Place>) => {
    dispatch(removeNecessityPlaceSuccess(removeNecessityPlaceResponse.data));
  })
  .catch((removeNecessityPlaceError) => {
    dispatch(
      removeNecessityPlaceFailure(removeNecessityPlaceError),
    );
  });

const renamePlaceSuccess = (place: Place) => ({
  type: necessityConstants.RENAME_PLACE_SUCCESS,
  target: place,
});
const renamePlaceFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 404:
      actionType = necessityConstants.RENAME_PLACE_FAILURE_NOT_FOUND;
      alert('존재하지 않는 Place입니다.');
      break;
    case 403:
      actionType = necessityConstants.RENAME_PLACE_FAILURE_MEMBER;
      alert('House 멤버만 Place 이름을 수정할 수 있습니다.');
      break;
    default:
      actionType = necessityConstants.RENAME_PLACE_FAILURE;
      alert(`Place 이름 수정에 실패했어요ㅠㅠ\n 에러 메시지 : ${error.response?.status}`);
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};
export const renamePlace = (
  houseId: number, placeId: number, name: string,
) => (dispatch: Dispatch) => axios.put(
  `/api/v1/house/${houseId}/place/${placeId}/`, { houseId, placeId, name },
)
  .then((renamePlaceResponse: AxiosResponse<Place>) => dispatch(
    renamePlaceSuccess(renamePlaceResponse.data),
  ))
  .catch((renamePlaceError) => dispatch(renamePlaceFailure(renamePlaceError)));

const updateNecessityPlaceSuccess = (necessity: Necessity) => ({
  type: necessityConstants.UPDATE_NECESSITYPLACE_SUCCESS,
  target: necessity,
});
const updateNecessityPlaceFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 400:
      alert('올바른 수량/가격을 입력하세요.');
      break;
    default:
      actionType = necessityConstants.UPDATE_NECESSITYPLACE_FAILURE;
      alert(`Necessity 수정에 실패했어요ㅠㅠ\n 에러 메시지 : ${error.response?.status}`);
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};
export const updateNecessityPlace = (
  placeId: number, necessityId: number, description: string, price?: number, count?: number,
) => (dispatch: Dispatch) => axios.put(`/api/v1/place/${placeId}/necessity/${necessityId}/`, { description, price, count })
  .then((updateNecessityPlaceResponse: AxiosResponse<Necessity>) => {
    dispatch(updateNecessityPlaceSuccess(updateNecessityPlaceResponse.data));
  })
  .catch((updateNecessityPlaceError) => dispatch(
    updateNecessityPlaceFailure(updateNecessityPlaceError),
  ));
