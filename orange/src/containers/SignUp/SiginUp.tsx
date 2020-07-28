import React, { useState } from "react";

import { Login, SignUpModal } from "../../components/index";

function SignUp() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const showModal = () => setShowSignUpModal(true);

  return (
    <div>
      <Login />
      <button onClick={showModal}>회원가입 </button>
      {showSignUpModal ? <SignUpModal appearing={true} /> : null}
    </div>
  );
}

export default SignUp;
