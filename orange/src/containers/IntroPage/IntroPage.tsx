import React, { useState } from 'react';
import Modal from 'react-modal';

import { SignUpForm, SignInForm } from '../../components/index';
import './IntroPage.scss';

function IntroPage() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

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
      <img
        className="logo"
        src="https://orangenongjang-static.s3.ap-northeast-2.amazonaws.com/image/orangenongjang_logo_1.png"
        alt="orangenongjang_logo"
      />
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
