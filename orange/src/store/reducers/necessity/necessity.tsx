import { necessityConstants } from '../../actions/actionTypes';
import { necessityStatus } from '../../../constants/constants';

type Action = {
  actiontype: string;
  actiontarget: any;
};

const initialState = {
  createStatus: necessityStatus.NONE,
  necessities: [],
};

function necessityreducer(state = initialState, action: Action) {
  const data = action.actiontarget;
  switch (action.actiontype) {
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
        ...state,
        removeStatus: necessityStatus.FAILURE,
      };

      // case 'REMOVE':
      //     return state.filter(Necessity => Necessity.id !== action.id);

    default:
      return { ...state };
  }
}

export default necessityreducer;
