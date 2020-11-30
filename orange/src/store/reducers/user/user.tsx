import { userConstants } from '../../actions/actionTypes';
import { userStatus } from '../../../constants/constants';
import { User } from '../../../api';
import { UserState } from '../../state';

type Action = {
  type: string;
  target: User;
};

const initialState: UserState = {
  me: {} as User,
  signupStatus: userStatus.NONE,
  loginStatus: userStatus.NONE,
  logoutStatus: userStatus.NONE,
  getMeStatus: userStatus.NONE,
  inviteStatus: userStatus.NONE,
};

const userReducer = (state = initialState, action: Action): UserState => {
  const data = action.target;
  switch (action.type) {
    // SIGNUP
    case userConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        signupStatus: userStatus.SUCCESS,
      };
    case userConstants.SIGNUP_WAITING:
      return { ...state, signupStatus: userStatus.WAITING };
    case userConstants.SIGNUP_FAILURE_AUTHENTICATION:
      return { ...state, signupStatus: userStatus.FAILURE_AUTHENTICATION };
    case userConstants.SIGNUP_FAILURE_EMAIL:
      return { ...state, signupStatus: userStatus.FAILURE_EMAIL };
    case userConstants.SIGNUP_FAILURE_USERNAME:
      return { ...state, signupStatus: userStatus.FAILURE_USERNAME };
    case userConstants.SIGNUP_FAILURE:
      return { ...state, signupStatus: userStatus.FAILURE };

    // LOGIN
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loginStatus: userStatus.SUCCESS,
        me: data,
      };
    case userConstants.LOGIN_FAILURE:
      return { ...state, loginStatus: userStatus.FAILURE };
    case userConstants.LOGIN_FAILURE_INACTIVE:
      return { ...state, loginStatus: userStatus.FAILURE_INACTIVE };
    case userConstants.LOGIN_FAILURE_INFO:
      return { ...state, loginStatus: userStatus.FAILURE_INFO };

    // LOGOUT
    case userConstants.LOGOUT_SUCCESS:
      return { ...state, logoutStatus: userStatus.SUCCESS };
    case userConstants.LOGOUT_FAILURE:
      return { ...state, logoutStatus: userStatus.FAILURE };

    // GET_ME
    case userConstants.GET_ME_SUCCESS:
      return {
        ...state,
        me: data,
        getMeStatus: userStatus.SUCCESS,
      };
    case userConstants.GET_ME_FAILURE:
      return { ...state, getMeStatus: userStatus.FAILURE };
    default:
      return { ...state };
  }
};

export default userReducer;
