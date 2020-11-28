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
    } if (loginStatus === userStatus.FAILURE_INACTIVE) {
      alert('회원 인증을 완료해주세요!');
      window.location.reload();
    } if (loginStatus === userStatus.FAILURE_INFO) {
      alert('잘못된 이름 또는 비밀번호입니다.');
      window.location.reload();
    } if (loginStatus === userStatus.FAILURE) {
      alert('잘못된 이름 또는 비밀번호입니다.');
      window.location.reload();
    }
    // '존재하지 않는 유저' 로직도 염두에 둘 것. (현재는 백엔드 로직에 없음)

    if (signupStatus === userStatus.SUCCESS) {
      alert('회원 인증 메일이 전송되었습니다!');
      window.location.reload();
    } if (signupStatus === userStatus.WAITING) {
      alert('이미 인증이 진행 중인 회원입니다.');
    // 현재 백엔드 로직으로는 동일한 username, email로 가입 시 이미 인증이 진행중인지 알려주지 않기에
    // 추후에 WAITING status를 추가하면 좋겠습니다.
    } if (signupStatus === userStatus.FAILURE_INFO) {
      alert('이미 등록된 이름 또는 메일입니다.');
    // 추후 Email과 Username이 중복되는지 각각에 대해 알려줄 예정.
    } if (signupStatus === userStatus.FAILURE_EMAIL) {
      alert('Email 발송에 문제가 있습니다. 다시 시도해주세요.');
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
