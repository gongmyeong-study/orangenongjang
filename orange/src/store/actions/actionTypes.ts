export const userConstants = {
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS', // 회원 인증 메일이 전송되었습니다.
  SIGNUP_WAITING: 'SIGNUP_WAITING', // 이메일 인증을 완료해주세요.
  SIGNUP_FAILURE: 'SIGNUP_FAILURE', // 회원가입을 실패했습니다. 다시 시도해주세요.
  SIGNUP_FAILURE_EMAIL: 'SIGNUP_FAILURE_EMAIL', // 이미 등록된 이메일입니다.
  SIGNUP_FAILURE_USERNAME: 'SIGNUP_FAILURE_USERNAME', // 이미 등록된 이름입니다.
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_FAILURE_INACTIVE: 'LOGIN_FAILURE_INACTIVE', // 이메일 인증을 완료해주세요.
  LOGIN_FAILURE_INFO: 'LOGIN_FAILURE_INFO', // 잘못된 아이디 또는 비밀번호입니다.
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',
  GET_ME_SUCCESS: 'GET_ME_SUCCESS',
  GET_ME_FAILURE: 'GET_ME_FAILURE',
};

export const necessityConstants = {
  CREATE_NECESSITYPLACE_SUCCESS: 'CREATE_NECESSITYPLACE_SUCCESS',
  CREATE_NECESSITYPLACE_FAILURE: 'CREATE_NECESSITYPLACE_FAILURE',
  CREATE_NECESSITYPLACE_FAILURE_NAME: 'CREATE_NECESSITYPLACE_FAILURE_NAME',
  REMOVE_NECESSITYPLACE_SUCCESS: 'REMOVE_NECESSITYPLACE_SUCCESS',
  REMOVE_NECESSITYPLACE_FAILURE: 'REMOVE_NECESSITYPLACE_FAILURE',
  GET_HOUSE_SUCCESS: 'GET_HOUSE_SUCCESS',
  GET_HOUSE_FAILURE: 'GET_HOUSE_FAILURE',
  COUNT_NECESSITYPLACE_SUCCESS: 'COUNT_NECESSITYPLACE_SUCCESS',
  COUNT_NECESSITYPLACE_FAILURE: 'COUNT_NECESSITYPLACE_FAILURE',
  UPDATE_NECESSITYPLACE_SUCCESS: 'UPDATE_NECESSITYPLACE_SUCCESS',
  UPDATE_NECESSITYPLACE_FAILURE: 'UPDATE_NECESSITYPLACE_FAILURE',
};
