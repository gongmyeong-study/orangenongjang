import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import "./SignUpModal.css";

interface Props {
  appearing: Boolean;
}

function SignUpModal(props: Props = { appearing: false }) {
  const [email, setEmail] = useState("")
  const [passward, setPassward] = useState("")

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangePassward = (e: any) => {
    setPassward(e.target.value);
  };
  // setAppearing(props.appearing);
  return (
    <div
      className="modal"
      style={props.appearing ? { display: "block" } : { display: "none" }}
    >
      <form>
      <button
        type="submit"
        className="close"
        title="Close Modal"
        style={{background: "none", border: "none"}}
      >
        &times;
      </button>
      </form>
      <form className="modal-content">
        <div className="container">
          <p>오렌지 농장을 이용하기 전에 회원가입을 해주세요 🤗</p>
          <hr />
          <label htmlFor="email">
            <b>이메일 (Email)</b>
          </label>
          <input
            type="text"
            placeholder="haksaeng@snu.ac.kr"
            name="email"
            required
            onChange={onChangeEmail}
          />

          <label htmlFor="psw">
            <b>비밀번호 (Password)</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
            onChange={onChangePassward}
          />

          {/* <label htmlFor="psw-repeat">
            <b>비밀번호 확인 (Repeat Password)</b>
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="psw-repeat"
            required
          /> */}

          <div className="clearfix">
            {/* <button type="button" onClick={() => setAppearing(false)} className="cancelbtn">Cancel</button> */}
            <button type="submit" className="signupbtn">
              회원가입 😎
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpModal;
