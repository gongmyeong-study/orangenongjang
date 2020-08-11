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
    default:
      actionType = necessityConstants.CREATE_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};

// 생필품 삭제 기능
const removeSuccess = (necessities: []) => ({
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

export const removeNecessity = () => (dispatch: Dispatch) => axios.delete('/api/v1/necessity/{necessity_id}/')
  .then((removeResponse) => dispatch(removeSuccess(removeResponse.data)))
  .catch((removeError) => dispatch(removeFailure(removeError)));

export const getNecessity = () => (dispatch: Dispatch) => axios.get('/api/v1/necessity/')
  .then((getResponse) => dispatch(getSuccess(getResponse.data)))
  .catch((getError) => dispatch(getFailure(getError)));

// export const GET_NECESSITY = 'GET_NECESSITY';

// export function getNecessity() {
//   const request = axios.get('/api/v1/necessity/');
//   return {
//     type: GET_NECESSITY,
//     payload: request,
//   };
// }
