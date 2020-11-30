import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { houseConstants } from '../actionTypes';
import { House } from '../../../api';

// 멤버 초대
const inviteSuccess = (house: House) => ({
  type: houseConstants.INVITE_SUCCESS,
  target: house,
});

const inviteFailure = (error: AxiosError) => {
  let actionType = null;
  switch (error.response?.status) {
    case 403:
      actionType = houseConstants.INVITE_FAILURE_LEADER;
      break;
    case 404:
      actionType = houseConstants.INVITE_FAILURE_EMAIL;
      break;
    case 503:
      actionType = houseConstants.INVITE_FAILURE_AUTHENTICATION;
      break;
    default:
      actionType = houseConstants.INVITE_FAILURE;
      break;
  }
  return {
    type: actionType,
    target: error,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const inviteHouse = (
  houseId: number, email: string,
) => (dispatch: Dispatch) => axios.post(`/api/v1/house/${houseId}/invitation/`, { email })
  .then((inviteResponse: AxiosResponse<House>) => dispatch(inviteSuccess(inviteResponse.data)))
  .catch((inviteError) => dispatch(inviteFailure(inviteError)));
