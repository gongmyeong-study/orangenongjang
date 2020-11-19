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
      alert('로그인에 실패하였습니다. \n이름과 비밀번호를 확인해 주세요!');
    }

    if (signupStatus === userStatus.SUCCESS) {
      window.location.reload();
    } if (signupStatus === userStatus.FAILURE) {
      alert('회원가입에 실패하였습니다.');
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
