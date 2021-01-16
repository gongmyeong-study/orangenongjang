import React, { useEffect, useState } from 'react';
import {
  useSelector,
} from 'react-redux';
import Modal from 'react-modal';

import { SignUpForm, SignInForm } from '../../components/index';
import { userStatus } from '../../constants/constants';
import { OrangeGlobalState } from '../../store/state';
import './IntroPage.scss';

function IntroPage() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const { loginStatus, signupStatus } = useSelector((state: OrangeGlobalState) => state.user);

  const toggleSignUpModal = () => {
    setIsSignUpModalOpen(!isSignUpModalOpen);
  };

  const toggleSignInModal = () => {
    setIsSignInModalOpen(!isSignInModalOpen);
  };

  const closeModal = () => {
    if (isSignInModalOpen) {
      toggleSignInModal();
    } else {
      toggleSignUpModal();
    }
  };

  useEffect(() => {
    if (loginStatus === userStatus.SUCCESS) {
      window.location.reload();
    } if (loginStatus === userStatus.FAILURE_INACTIVE) {
      alert('메일을 확인하여 회원 인증을 완료해주세요!');
      window.location.reload();
    } if (loginStatus === userStatus.FAILURE_INFO) {
      alert('잘못된 이름 또는 비밀번호입니다.');
      window.location.reload();
    } if (loginStatus === userStatus.FAILURE) {
      alert('잘못된 이름 또는 비밀번호입니다.');
      window.location.reload();
    }

    if (signupStatus === userStatus.SUCCESS) {
      alert('회원 인증 메일이 전송되었습니다!');
      window.location.reload();
    } if (signupStatus === userStatus.WAITING) {
      alert('이미 인증이 진행 중인 회원입니다.');
    } if (signupStatus === userStatus.FAILURE_AUTHENTICATION) {
      alert('회원 인증에 문제가 있습니다. 다시 시도해주세요.');
    } if (signupStatus === userStatus.FAILURE_EMAIL) {
      alert('이미 등록된 메일입니다.');
    } if (signupStatus === userStatus.FAILURE_USERNAME) {
      alert('이미 등록된 이름입니다.');
    } if (signupStatus === userStatus.FAILURE) {
      alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
    }
  }, [loginStatus, signupStatus]);

  return (
    <div className="intro-wrapper">
      <Modal
        isOpen={isSignUpModalOpen || isSignInModalOpen}
        onRequestClose={closeModal}
        className="sign-modal"
        overlayClassName="sign-modal-overlay"
      >
        {/*  eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="close-button" type="button" onClick={closeModal}><i className="fas fa-times fa-2x" /></button>
        {isSignUpModalOpen && <SignUpForm />}
        {isSignInModalOpen && <SignInForm />}
      </Modal>
      <div className="logo" />
      <div className="main">
        <p className="text">
          당신과 함께 사는,
          <br />
          편안하고 영감 가득한 공간
        </p>
        <h1 className="title">
          오렌지 농장
        </h1>
        <div className="buttons">
          <button type="button" onClick={toggleSignInModal}>
            로그인
          </button>
          <button type="button" onClick={toggleSignUpModal}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
