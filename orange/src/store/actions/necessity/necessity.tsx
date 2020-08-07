import axios from 'axios';
import { Dispatch } from 'redux';
import { necessityConstants } from '../actionTypes';


// 생필품 구매목록 추가 기능

const createSuccess = (necessities: any) => ({
  type: necessityConstants.CREATE_SUCCESS,
  target: necessities,
});

const createFailure = (error: any) => {
  let actionType = null;
  switch (error.response.status) {
    default:
      actionType = necessityConstants.CREATE_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};

export const createNecessity = (
  name: string, option: string, description: string, price: string
) => (dispatch: Dispatch) => axios.post('/api/v1/necessity/', { name, option, description, price })
  .then((createResponse) => dispatch(createSuccess(createResponse.data)))
  .catch((createError) => dispatch(createFailure(createError)));


// 생필품 구매여부 체크 기능

const toggleSuccess = (necessities: any) => ({
  type: necessityConstants.TOGGLE_SUCCESS,
  target: necessities,
});

const toggleFailure = (error: any) => {
  let actionType = null;
  switch (error.response.status) {
    default:
      actionType = necessityConstants.TOGGLE_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };  
};

export const toggleNecessity = (
  name: string,
) => (dispatch: Dispatch) => axios.post('api/v1/necessity/', { name })
  .then((toggleResponse) => dispatch(toggleSuccess(toggleResponse.data)))
  .catch((toggleError) => dispatch(toggleFailure(toggleError)));
