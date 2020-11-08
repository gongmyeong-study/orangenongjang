import { necessityConstants } from '../../actions/actionTypes';
import { necessityStatus } from '../../../constants/constants';
import { Necessity, NecessityHouse } from '../../../api';
import { NecessityState } from '../../state';

type Action = {
  type: string;
  target: NecessityHouse | Necessity;
};

const initialState: NecessityState = {
  createStatus: necessityStatus.NONE,
  getStatus: necessityStatus.NONE,
  removeStatus: necessityStatus.NONE,
  countStatus: necessityStatus.NONE,
  updateStatus: necessityStatus.NONE,
  necessityHouse: {} as NecessityHouse,
};

const nenene = [
  necessityConstants.COUNT_SUCCESS,
  necessityConstants.REMOVE_SUCCESS,
  necessityConstants.UPDATE_SUCCESS,
];

function necessityreducer(state = initialState, action: Action): NecessityState {
  let necessityHouse: NecessityHouse;
  if (nenene.includes(action.type)) {
    necessityHouse = { ...state.necessityHouse };
    const data = action.target as Necessity;
    const indexToBeUpdated = necessityHouse.necessities.findIndex(({ id }) => id === data.id);
    necessityHouse.necessities[indexToBeUpdated] = data;
  } else {
    necessityHouse = action.target as NecessityHouse;
  }

  switch (action.type) {
    // 생필품 호출
    case necessityConstants.GET_SUCCESS:
      return {
        ...state,
        getStatus: necessityStatus.SUCCESS,
        necessityHouse,
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
        necessityHouse,
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
        necessityHouse,
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
        necessityHouse,
      };
    case necessityConstants.COUNT_FAILURE:
      return {
        ...state,
        countStatus: necessityStatus.FAILURE,
      };

    // 생필품 수정
    case necessityConstants.UPDATE_SUCCESS:
      return {
        ...state,
        updateStatus: necessityStatus.SUCCESS,
        necessityHouse,
      };
    case necessityConstants.UPDATE_FAILURE:
      return {
        ...state,
        updateStatus: necessityStatus.FAILURE,
      };

    default:
      return { ...state };
  }
}

export default necessityreducer;
