import React, { useState } from 'react';
import { History } from 'history';

import { Login, SignUpModal } from '../../components/index';

interface Props {
  history: History;
}

function IntroPage(props: Props) {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const showModal = () => setShowSignUpModal(true);
  return (
    <div>
      <Login history={props.history} />
      <button
        onClick={showModal}
        type="button"
      >
        회원가입
        {' '}
      </button>
      {showSignUpModal ? <SignUpModal history={props.history} /> : null}
    </div>
  );
}

export default IntroPage;
