import { houseConstants } from '../../actions/actionTypes';
import { houseStatus } from '../../../constants/constants';
import { HouseState } from '../../state';
import { House } from '../../../api';

type Action = {
  type: string;
  target: House;
};

const initialState: HouseState = {
  getHouseStatus: houseStatus.NONE,
  inviteStatus: houseStatus.NONE,
  leaveStatus: houseStatus.NONE,
  tossStatus: houseStatus.NONE,
};

const houseReducer = (state = initialState, action: Action): HouseState => {
  const house = action.target;
  switch (action.type) {
    case houseConstants.GET_HOUSE_SUCCESS:
      return { ...state, getHouseStatus: houseStatus.SUCCESS, house };
    case houseConstants.GET_HOUSE_FAILURE:
      return { ...state, inviteStatus: houseStatus.FAILURE };
    case houseConstants.INVITE_HOUSE_SUCCESS:
      return { ...state, inviteStatus: houseStatus.SUCCESS };
    case houseConstants.INVITE_HOUSE_FAILURE:
      return { ...state, inviteStatus: houseStatus.FAILURE };
    case houseConstants.INVITE_HOUSE_FAILURE_AUTHENTICATION:
      return { ...state, inviteStatus: houseStatus.FAILURE_AUTHENTICATION };
    case houseConstants.INVITE_HOUSE_FAILURE_EMAIL:
      return { ...state, inviteStatus: houseStatus.FAILURE_EMAIL };
    case houseConstants.INVITE_HOUSE_FAILURE_LEADER:
      return { ...state, inviteStatus: houseStatus.FAILURE_INVITE_LEADER };
    case houseConstants.INVITE_HOUSE_FAILURE_USERNAME:
      return { ...state, inviteStatus: houseStatus.FAILURE_USERNAME };
    case houseConstants.INVITE_HOUSE_FAILURE_INACTIVE_USER:
      return { ...state, inviteStatus: houseStatus.FAILURE_INACTIVE };

    case houseConstants.LEAVE_HOUSE_SUCCESS:
      return { ...state, leaveStatus: houseStatus.SUCCESS };
    case houseConstants.LEAVE_HOUSE_FAILURE:
      return { ...state, leaveStatus: houseStatus.FAILURE };
    case houseConstants.LEAVE_HOUSE_FAILURE_LEADER:
      return { ...state, leaveStatus: houseStatus.FAILURE_LEAVE_LEADER };

    case houseConstants.TOSS_LEADER_SUCCESS:
      return { ...state, tossStatus: houseStatus.SUCCESS };
    case houseConstants.TOSS_LEADER_FAILURE:
      return { ...state, tossStatus: houseStatus.FAILURE };
    case houseConstants.TOSS_LEADER_FAILURE_ME:
      return { ...state, tossStatus: houseStatus.FAILURE_TOSS_ME };
    case houseConstants.TOSS_LEADER_FAILURE_LEADER:
      return { ...state, tossStatus: houseStatus.FAILURE_TOSS_LEADER };
    default:
      return { ...state };
  }
};

export default houseReducer;
