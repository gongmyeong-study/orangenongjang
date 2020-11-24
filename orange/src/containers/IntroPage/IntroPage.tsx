import React, { useEffect, useState } from 'react';
import {
  useSelector, useDispatch,
} from 'react-redux';

import { Login, SignUpModal } from '../../components/index';
import { OrangeGlobalState } from '../../store/state';
import { userStatus } from '../../constants/constants';
import { login, signUp } from '../../store/actions/user/user';

function IntroPage() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const showModal = () => setShowSignUpModal(true);

  const dispatch = useDispatch();
  const { loginStatus, signupStatus } = useSelector((state: OrangeGlobalState) => state.user);

  const onLogin = (username: string, password: string) => {
    dispatch(login(username, password));
  };

  const onSignUp = (email: string, username: string, password: string) => {
    dispatch(signUp(email, username, password));
  };

  useEffect(() => {
    if (loginStatus === userStatus.SUCCESS) {
      window.location.reload();
    } if (loginStatus === userStatus.FAILURE) {
      alert('가입 시 등록한 이메일로 발송된 인증메일을 확인해주세요!');
      window.location.reload();
    } if (loginStatus === userStatus.FAILURE_INACTIVE) {
      alert('회원 인증을 완료해주세요!');
      window.location.reload();
    } if (loginStatus === userStatus.FAILURE_INFO) {
      alert('잘못된 이름 또는 비밀번호입니다.');
      window.location.reload();
    }

    if (signupStatus === userStatus.SUCCESS) {
      alert('회원 인증 메일이 전송되었습니다!');
      window.location.reload();
    } if (signupStatus === userStatus.WAITING) {
      alert('이미 인증이 진행 중인 회원입니다.');
    } if (signupStatus === userStatus.FAILURE_USERNAME) {
      alert('이미 등록된 이름입니다.');
    } if (signupStatus === userStatus.FAILURE_EMAIL) {
      alert('이미 등록된 이메일입니다.');
    } if (signupStatus === userStatus.FAILURE) {
      alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
    }
  }, [loginStatus, signupStatus]);

  return (
    <div>
      <Login onLogin={onLogin} />
      <button
        onClick={showModal}
        type="button"
      >
        회원가입
        {' '}
      </button>
      {showSignUpModal && <SignUpModal onSignUp={onSignUp} /> }
    </div>
  );
}

export default IntroPage;
