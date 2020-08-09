import { userConstants } from '../../actions/actionTypes';
import { userStatus } from '../../../constants/constants';

const initialState = {
  me: {},
  loginStatus: userStatus.NONE,
  signupStatus: userStatus.NONE,
};

const reducer = (state = initialState, action: any) => {
  const data = action.target;
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      // NOTE: just friendly logging - please remove below logging line later
      console.log(data);
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
    default:
      return { ...state };
  }
};

export default reducer;
