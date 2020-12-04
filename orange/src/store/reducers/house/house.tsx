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
  leaveStatus: houseStatus.NONE,
  tossStatus: houseStatus.NONE,
  getStatus: houseStatus.NONE,
  removeStatus: houseStatus.NONE,
  updateStatus: houseStatus.NONE,
  house: {} as House,
};

const houseReducer = (state = initialState, action: Action): HouseState => {
  const data = action.target;
  switch (action.type) {
    case houseConstants.INVITE_HOUSE_SUCCESS:
      return {
        ...state,
        inviteStatus: houseStatus.SUCCESS,
        house: data,
      };
    case houseConstants.INVITE_HOUSE_FAILURE:
      return { ...state, inviteStatus: houseStatus.FAILURE };
    case houseConstants.INVITE_HOUSE_FAILURE_AUTHENTICATION:
      return { ...state, inviteStatus: houseStatus.FAILURE_AUTHENTICATION };
    case houseConstants.INVITE_HOUSE_FAILURE_EMAIL:
      return { ...state, inviteStatus: houseStatus.FAILURE_EMAIL };
    case houseConstants.INVITE_HOUSE_FAILURE_LEADER:
      return { ...state, inviteStatus: houseStatus.FAILURE_INVITE_LEADER };
    case houseConstants.INVITE_HOUSE_FAILURE_ME:
      return { ...state, inviteStatus: houseStatus.FAILURE_INVITE_OR_TOSS_ME };
    case houseConstants.INVITE_HOUSE_FAILURE_USERNAME:
      return { ...state, inviteStatus: houseStatus.FAILURE_USERNAME };

    case houseConstants.LEAVE_HOUSE_SUCCESS:
      return {
        ...state,
        tossStatus: houseStatus.SUCCESS,
        house: data,
      };
    case houseConstants.LEAVE_HOUSE_FAILURE:
      return { ...state, leaveStatus: houseStatus.FAILURE };
    case houseConstants.LEAVE_HOUSE_FAILURE_LEADER:
      return { ...state, leaveStatus: houseStatus.FAILURE_LEAVE_LEADER };

    case houseConstants.TOSS_LEADER_SUCCESS:
      return {
        ...state,
        tossStatus: houseStatus.SUCCESS,
        house: data,
      };
    case houseConstants.TOSS_LEADER_FAILURE:
      return { ...state, tossStatus: houseStatus.FAILURE };
    case houseConstants.TOSS_LEADER_FAILURE_ME:
      return { ...state, tossStatus: houseStatus.FAILURE_INVITE_OR_TOSS_ME };
    case houseConstants.TOSS_LEADER_FAILURE_LEADER:
      return { ...state, tossStatus: houseStatus.FAILURE_TOSS_LEADER };
    default:
      return { ...state };
  }
};

export default houseReducer;
