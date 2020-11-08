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
};

const userReducer = (state = initialState, action: Action): UserState => {
  const data = action.target;
  switch (action.type) {
    case userConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        signupStatus: userStatus.SUCCESS,
        me: data,
      };
    case userConstants.SIGNUP_FAILURE_USERNAME:
      return { ...state, signupStatus: userStatus.FAILURE_USERNAME };
    case userConstants.SIGNUP_FAILURE:
      return { ...state, signupStatus: userStatus.FAILURE };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loginStatus: userStatus.SUCCESS,
        me: data,
      };
    case userConstants.LOGIN_FAILURE:
      return { ...state, loginStatus: userStatus.FAILURE };
    case userConstants.LOGOUT_SUCCESS:
      return { ...state, logoutStatus: userStatus.SUCCESS };
    case userConstants.LOGOUT_FAILURE:
      return { ...state, logoutStatus: userStatus.FAILURE };
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
