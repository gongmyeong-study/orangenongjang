import axios from 'axios';
import { Dispatch } from 'redux';
import { necessityConstants } from '../actionTypes';


const addNecessitySuccess = (necessities: any) => ({
  type: necessityConstants.CREATE_SUCCESS,
  target: necessities,
});

const addNecessityFailure = (error: any) => {
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

export const addNecessity = (
  name: string,
) => (dispatch: Dispatch) => axios.post('/api/v1/necessity/', { name })
  .then((res) => dispatch(addNecessitySuccess(res.data)))
  .catch((err) => dispatch(addNecessityFailure(err)));
