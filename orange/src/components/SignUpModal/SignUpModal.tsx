import React, { useState, Dispatch } from "react";
import { connect } from "react-redux";

import { userActions } from "../../store/actions";
import { userStatus } from "../../constants/constants";
import "./SignUpModal.css";

interface Props {
  appearing: Boolean; // for modal appearing
  signUp: (email: string, username: string, password: string) => any; // for redux dispatch
  me: any;
  signupStatus: string;
}

function SignUpModal(props: Props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [passward, setPassward] = useState("");

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangeUserName = (e: any) => {
    setUsername(e.target.value);
  };

  const onChangePassward = (e: any) => {
    setPassward(e.target.value);
  };

  const signUp = () => {
    props.signUp(email, username, passward)
    .then(() => {
      console.log(props.signupStatus);
      console.log(userStatus.SUCCESS);
      if (props.signupStatus === userStatus.SUCCESS) {
        window.alert("성공!");
      }
      else {
        window.alert("실패!");
      }
    });
  };
  
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
          style={{ background: "none", border: "none" }}
        >
          &times;
        </button>
      </form>
      <form className="modal-content">
        <div className="container">
          <p>오렌지 농장을 이용하기 전에 회원가입을 해주세요</p>
          <hr />
          <label htmlFor="email">
            <b>이메일 (Email)</b>
          </label>
          <input
            type="text"
            placeholder="haksaeng@snu.ac.kr"
            required
            onChange={onChangeEmail}
          />

          <label htmlFor="email">
            <b>이름 (Name)</b>
          </label>
          <input
            type="text"
            placeholder="Jinsup"
            required
            onChange={onChangeUserName}
          />

          <label htmlFor="psw">
            <b>비밀번호 (Password)</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
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
            <button
              // type="submit"
              type="button"
              className="signupbtn"
              onClick={signUp}
            >
              회원가입
              {props.signupStatus}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  signUp: (email: string, username: string, password: string) =>
    dispatch(userActions.signUp(email, username, password)),
});

const mapStateToProps = (state: any) => ({
  signupStatus: state.user.signupStatus,
  me: state.user.me,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal);
