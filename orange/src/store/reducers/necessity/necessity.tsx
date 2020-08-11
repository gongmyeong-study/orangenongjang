import { necessityConstants } from '../../actions/actionTypes';
import { necessityStatus } from '../../../constants/constants';

type Action = {
  type: string;
  target: any;
};

const initialState = {
  createStatus: necessityStatus.NONE,
  necessities: [],
};

function necessityreducer(state = initialState, action: Action) {
  const data = action.target;
  switch (action.type) {
    // 생필품 호출
    case necessityConstants.GET_SUCCESS:
      return {
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
        createStatus: necessityStatus.SUCCESS,
        necessities: data,
      };
    case necessityConstants.CREATE_FAILURE:
      return {
        ...state,
        createStatus: necessityStatus.FAILURE,
      };

    // 생필품 제거
    case necessityConstants.REMOVE_SUCCESS:
      return {
        removeStatus: necessityStatus.SUCCESS,
        necessities: data,
      };
    case necessityConstants.REMOVE_FAILURE:
      return {
        removeStatus: necessityStatus.FAILURE,
      };

    default:
      return { ...state };
  }
}

export default necessityreducer;
