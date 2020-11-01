import { necessityConstants } from '../../actions/actionTypes';
import { necessityStatus } from '../../../constants/constants';
import { Necessity } from '../../../api';

type Action = {
  type: string;
  target: Necessity;
};

const initialState = {
  createStatus: necessityStatus.NONE,
  getStatus: necessityStatus.NONE,
  removeStatus: necessityStatus.NONE,
  necessities: [],
};

function necessityreducer(state = initialState, action: Action) {
  const data = action.target;
  switch (action.type) {
    // 생필품 호출
    case necessityConstants.GET_SUCCESS:
      return {
        ...state,
        getStatus: necessityStatus.SUCCESS,
        necessities: data,
      };
    case necessityConstants.GET_FAILURE:
      return {
        ...state,
        getStatus: necessityStatus.FAILURE,
      };

    // 생필품 추가
    case necessityConstants.CREATE_SUCCESS:
      return {
        ...state,
        createStatus: necessityStatus.SUCCESS,
        necessities: data,
      };
    case necessityConstants.CREATE_FAILURE:
      return {
        ...state,
        createStatus: necessityStatus.FAILURE,
      };
    case necessityConstants.CREATE_FAILURE_NAME:
      return {
        ...state,
        createStatus: necessityStatus.FAILURE_NAME,
      };

    // 생필품 제거
    case necessityConstants.REMOVE_SUCCESS:
      return {
        ...state,
        removeStatus: necessityStatus.SUCCESS,
        necessities: data,
      };
    case necessityConstants.REMOVE_FAILURE:
      return {
        ...state,
        removeStatus: necessityStatus.FAILURE,
      };

      // 생필품 수량
    case necessityConstants.COUNT_SUCCESS:
      return {
        ...state,
        countStatus: necessityStatus.SUCCESS,
        necessities: data,
      };
    case necessityConstants.COUNT_FAILURE:
      return {
        ...state,
        countStatus: necessityStatus.FAILURE,
      };

    default:
      return { ...state };
  }
}

export default necessityreducer;
