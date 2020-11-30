import { houseConstants } from '../../actions/actionTypes';
import { houseStatus } from '../../../constants/constants';
import { House } from '../../../api';
import { HouseState } from '../../state';

type Action = {
  type: string;
  target: House;
};

const initialState: HouseState = {
  inviteStatus: houseStatus.NONE,
  getStatus: houseStatus.NONE,
  removeStatus: houseStatus.NONE,
  updateStatus: houseStatus.NONE,
  house: {} as House,
};

const houseReducer = (state = initialState, action: Action): HouseState => {
  const data = action.target;
  switch (action.type) {
    // INVITE
    case houseConstants.INVITE_SUCCESS:
      return {
        ...state,
        inviteStatus: houseStatus.SUCCESS,
        house: data,
      };
    case houseConstants.INVITE_FAILURE:
      return { ...state, inviteStatus: houseStatus.FAILURE };
    case houseConstants.INVITE_FAILURE_AUTHENTICATION:
      return { ...state, inviteStatus: houseStatus.FAILURE_AUTHENTICATION };
    case houseConstants.INVITE_FAILURE_EMAIL:
      return { ...state, inviteStatus: houseStatus.FAILURE_EMAIL };
    case houseConstants.INVITE_FAILURE_USERNAME:
      return { ...state, inviteStatus: houseStatus.FAILURE_USERNAME };
    case houseConstants.INVITE_FAILURE_LEADER:
      return { ...state, inviteStatus: houseStatus.FAILURE_LEADER };
    default:
      return { ...state };
  }
};

export default houseReducer;
