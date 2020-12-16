import { houseConstants } from '../../actions/actionTypes';
import { houseStatus } from '../../../constants/constants';
import { HouseState } from '../../state';

type Action = {
  type: string;
};

const initialState: HouseState = {
  inviteStatus: houseStatus.NONE,
  leaveStatus: houseStatus.NONE,
  tossStatus: houseStatus.NONE,
};

const houseReducer = (state = initialState, action: Action): HouseState => {
  switch (action.type) {
    case houseConstants.INVITE_HOUSE_SUCCESS:
      return { inviteStatus: houseStatus.SUCCESS };
    case houseConstants.INVITE_HOUSE_FAILURE:
      return { inviteStatus: houseStatus.FAILURE };
    case houseConstants.INVITE_HOUSE_FAILURE_AUTHENTICATION:
      return { inviteStatus: houseStatus.FAILURE_AUTHENTICATION };
    case houseConstants.INVITE_HOUSE_FAILURE_EMAIL:
      return { inviteStatus: houseStatus.FAILURE_EMAIL };
    case houseConstants.INVITE_HOUSE_FAILURE_LEADER:
      return { inviteStatus: houseStatus.FAILURE_INVITE_LEADER };
    case houseConstants.INVITE_HOUSE_FAILURE_ME:
      return { inviteStatus: houseStatus.FAILURE_INVITE_OR_TOSS_ME };
    case houseConstants.INVITE_HOUSE_FAILURE_USERNAME:
      return { inviteStatus: houseStatus.FAILURE_USERNAME };

    case houseConstants.LEAVE_HOUSE_SUCCESS:
      return { leaveStatus: houseStatus.SUCCESS };
    case houseConstants.LEAVE_HOUSE_FAILURE:
      return { leaveStatus: houseStatus.FAILURE };
    case houseConstants.LEAVE_HOUSE_FAILURE_LEADER:
      return { leaveStatus: houseStatus.FAILURE_LEAVE_LEADER };

    case houseConstants.TOSS_LEADER_SUCCESS:
      return { tossStatus: houseStatus.SUCCESS };
    case houseConstants.TOSS_LEADER_FAILURE:
      return { tossStatus: houseStatus.FAILURE };
    case houseConstants.TOSS_LEADER_FAILURE_ME:
      return { tossStatus: houseStatus.FAILURE_INVITE_OR_TOSS_ME };
    case houseConstants.TOSS_LEADER_FAILURE_LEADER:
      return { tossStatus: houseStatus.FAILURE_TOSS_LEADER };
    default:
      return { ...state };
  }
};

export default houseReducer;
