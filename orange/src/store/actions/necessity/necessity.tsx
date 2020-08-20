import axios from 'axios';
import { Dispatch } from 'redux';
import { necessityConstants } from '../actionTypes';

// 생필품 호출 기능
const getSuccess = (necessities: any) => ({
  type: necessityConstants.GET_SUCCESS,
  target: necessities,
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
const removeSuccess = (necessities: any) => ({
  type: necessityConstants.REMOVE_SUCCESS,
  target: necessities,
});

const removeFailure = (error: any) => {
  let actionType = null;
  switch (error.response.status) {
    default:
      actionType = necessityConstants.REMOVE_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};

export const createNecessity = (
  name: string, option: string, description: string, price: number,
) => (dispatch: Dispatch) => axios.post('/api/v1/necessity/', {
  name, option, description, price,
})
  .then((createResponse) => dispatch(createSuccess(createResponse.data)))
  .catch((createError) => dispatch(createFailure(createError)));

export const removeNecessity = (necessityId: number) => (dispatch: Dispatch) => axios.delete(`/api/v1/necessity/${necessityId}/`)
  .then((removeResponse) => dispatch(removeSuccess(removeResponse.data)))
  .catch((removeError) => dispatch(removeFailure(removeError)));

export const getNecessity = () => (dispatch: Dispatch) => axios.get('/api/v1/necessity/')
  .then((getResponse) => dispatch(getSuccess(getResponse.data)))
  .catch((getError) => dispatch(getFailure(getError)));
