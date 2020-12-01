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
    // 멤버 초대
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
      return { ...state, inviteStatus: houseStatus.FAILURE_INVITE_LEADER };

    // House 탈퇴
    case houseConstants.LEAVE_SUCCESS:
      return {
        ...state,
        tossStatus: houseStatus.SUCCESS,
        house: data,
      };
    case houseConstants.LEAVE_FAILURE:
      return { ...state, leaveStatus: houseStatus.FAILURE };
    case houseConstants.LEAVE_FAILURE_LEADER:
      return { ...state, leaveStatus: houseStatus.FAILURE_LEAVE_LEADER };

    // Leader 양도
    case houseConstants.TOSS_SUCCESS:
      return {
        ...state,
        tossStatus: houseStatus.SUCCESS,
        house: data,
      };
    case houseConstants.TOSS_FAILURE:
      return { ...state, tossStatus: houseStatus.FAILURE };
    case houseConstants.TOSS_FAILURE_ME:
      return { ...state, tossStatus: houseStatus.FAILURE_ME };
    case houseConstants.TOSS_FAILURE_LEADER:
      return { ...state, tossStatus: houseStatus.FAILURE_TOSS_LEADER };
    default:
      return { ...state };
  }
};

export default houseReducer;
