import { userConstants } from '../../actions/actionTypes';
import { userStatus } from '../../../constants/constants';

const initialState = {
  me: {},
  signupStatus: userStatus.NONE,
  loginStatus: userStatus.NONE,
  logoutStatus: userStatus.NONE,
  getMeStatus: userStatus.NONE,
};

const reducer = (state = initialState, action: any) => {
  const data = action.target;
  switch (action.type) {
    case userConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        signupStatus: userStatus.SUCCESS,
        me: {
          id: data.id,
          username: data.username,
          email: data.email,
          lastLogin: data.last_login,
          dateJoined: data.date_joined,
        },
      };
    case userConstants.SIGNUP_FAILURE_USERNAME:
      return { ...state, signupStatus: userStatus.FAILURE_USERNAME };
    case userConstants.SIGNUP_FAILURE:
      return { ...state, signupStatus: userStatus.FAILURE };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loginStatus: userStatus.SUCCESS,
        me: {
          id: data.id,
          username: data.username,
          email: data.email,
          lastLogin: data.last_login,
          dateJoined: data.date_joined,
        },
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
        me: {
          id: data.id,
          username: data.username,
          email: data.email,
          lastLogin: data.last_login,
          dateJoined: data.date_joined,
        },
        getMeStatus: userStatus.SUCCESS,
      };
    case userConstants.GET_ME_FAILURE:
      return { ...state, getMeStatus: userStatus.FAILURE };
    default:
      return { ...state };
  }
};

export default reducer;
