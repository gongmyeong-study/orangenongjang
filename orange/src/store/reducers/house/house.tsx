import { houseConstants } from '../../actions/actionTypes';
import { houseStatus } from '../../../constants/constants';
import { HouseState } from '../../state';
import { House, UserHouse } from '../../../api';

type Action = {
  type: string;
  target: House | House[] | UserHouse[];
};

const initialState: HouseState = {
  getHouseStatus: houseStatus.NONE,
  getUserHouseStatus: houseStatus.NONE,
  inviteHouseStatus: houseStatus.NONE,
  leaveHouseStatus: houseStatus.NONE,
  tossLeaderStatus: houseStatus.NONE,
  reintroduceHouseStatus: houseStatus.NONE,
  removeHouseStatus: houseStatus.NONE,
  renameHouseStatus: houseStatus.NONE,
};

const houseReducer = (state = initialState, action: Action): HouseState => {
  const house = action.target as House;
  const houses = action.target as House[];
  const userHouse = action.target as UserHouse[];

  if (action.type === houseConstants.GET_HOUSE_SUCCESS) {
    return {
      ...state,
      getHouseStatus: houseStatus.SUCCESS,
      house,
    };
  }
  if (action.type === houseConstants.INVITE_HOUSE_SUCCESS) {
    return {
      ...state,
      inviteHouseStatus: houseStatus.SUCCESS,
    };
  }
  if (action.type === houseConstants.NULL) {
    return {
      ...state,
      inviteHouseStatus: houseStatus.NONE,
    };
  }
  if (action.type === houseConstants.LEAVE_HOUSE_SUCCESS) {
    return {
      ...state,
      leaveHouseStatus: houseStatus.SUCCESS,
    };
  }
  if (action.type === houseConstants.TOSS_LEADER_SUCCESS) {
    return {
      ...state,
      tossLeaderStatus: houseStatus.SUCCESS,
      userHouse,
    };
  }
  if (action.type === houseConstants.REINTRODUCE_HOUSE_SUCCESS) {
    return {
      ...state,
      reintroduceHouseStatus: houseStatus.SUCCESS,
      house,
    };
  }
  if (action.type === houseConstants.REMOVE_HOUSE_SUCCESS) {
    return {
      ...state,
      removeHouseStatus: houseStatus.SUCCESS,
      houses,
    };
  }
  if (action.type === houseConstants.RENAME_HOUSE_SUCCESS) {
    return {
      ...state,
      renameHouseStatus: houseStatus.SUCCESS,
      house,
    };
  }

  switch (action.type) {
    case houseConstants.GET_HOUSE_FAILURE:
      return { ...state, getHouseStatus: houseStatus.FAILURE };

    case houseConstants.INVITE_HOUSE_FAILURE:
      return { ...state, inviteHouseStatus: houseStatus.FAILURE };
    case houseConstants.INVITE_HOUSE_FAILURE_AUTHENTICATION:
      return { ...state, inviteHouseStatus: houseStatus.FAILURE_AUTHENTICATION };
    case houseConstants.INVITE_HOUSE_FAILURE_EMAIL:
      return { ...state, inviteHouseStatus: houseStatus.FAILURE_EMAIL };
    case houseConstants.INVITE_HOUSE_FAILURE_LEADER:
      return { ...state, inviteHouseStatus: houseStatus.FAILURE_INVITE_LEADER };
    case houseConstants.INVITE_HOUSE_FAILURE_USERNAME:
      return { ...state, inviteHouseStatus: houseStatus.FAILURE_USERNAME };
    case houseConstants.INVITE_HOUSE_FAILURE_INACTIVE_USER:
      return { ...state, inviteHouseStatus: houseStatus.FAILURE_INACTIVE };

    case houseConstants.LEAVE_HOUSE_FAILURE:
      return { ...state, leaveHouseStatus: houseStatus.FAILURE };
    case houseConstants.LEAVE_HOUSE_FAILURE_LEADER:
      return { ...state, leaveHouseStatus: houseStatus.FAILURE_LEAVE_LEADER };

    case houseConstants.TOSS_LEADER_FAILURE:
      return { ...state, tossLeaderStatus: houseStatus.FAILURE };
    case houseConstants.TOSS_LEADER_FAILURE_ME:
      return { ...state, tossLeaderStatus: houseStatus.FAILURE_TOSS_ME };
    case houseConstants.TOSS_LEADER_FAILURE_LEADER:
      return { ...state, tossLeaderStatus: houseStatus.FAILURE_TOSS_LEADER };

    case houseConstants.REINTRODUCE_HOUSE_FAILURE:
      return { ...state, reintroduceHouseStatus: houseStatus.FAILURE };
    case houseConstants.REINTRODUCE_HOUSE_FAILURE_LEADER:
      return { ...state, reintroduceHouseStatus: houseStatus.FAILURE_REINTRODUCE_LEADER };

    case houseConstants.REMOVE_HOUSE_FAILURE:
      return { ...state, removeHouseStatus: houseStatus.FAILURE };
    case houseConstants.REMOVE_HOUSE_FAILURE_MEMBER:
      return { ...state, removeHouseStatus: houseStatus.FAILURE_REMOVE_MEMBER };
    case houseConstants.REMOVE_HOUSE_FAILURE_LEADER:
      return { ...state, removeHouseStatus: houseStatus.FAILURE_REMOVE_LEADER };

    case houseConstants.RENAME_HOUSE_FAILURE:
      return { ...state, renameHouseStatus: houseStatus.FAILURE };
    case houseConstants.RENAME_HOUSE_FAILURE_LEADER:
      return { ...state, renameHouseStatus: houseStatus.FAILURE_RENAME_LEADER };
    default:
      return { ...state };
  }
};

export default houseReducer;
