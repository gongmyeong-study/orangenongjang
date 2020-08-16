import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../store/actions';
import { userStatus } from '../../constants/constants';
import './SignUpModal.css';

interface Props {
  history?: any;
  signUp: (email: string, username: string, password: string) => any; // for redux dispatch
  me: any;
  signupStatus: string;
}

interface State {
  appearing: boolean; // for modal appearing
  email: string;
  username: string;
  password: string;
}

class SignUpModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      appearing: true,
      email: '',
      username: '',
      password: '',
    };
  }

  signUp = () => {
    this.props.signUp(this.state.email, this.state.username, this.state.password)
      .then(() => {
        if (this.props.signupStatus === userStatus.SUCCESS) {
          window.alert('성공!');
          this.setState({ appearing: false });
          this.props.history.push('/');
        } else if (this.props.signupStatus === userStatus.FAILURE_USERNAME) {
          window.alert('중복된 사용자 이름!');
        } else {
          window.alert('실패!');
        }
      });
  };

  render() {
    return (
      <div
        className="modal"
        style={this.state.appearing ? { display: 'block' } : { display: 'none' }}
      >
        <form>
          <button
            type="submit"
            className="close"
            title="Close Modal"
            style={{ background: 'none', border: 'none' }}
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
              onChange={(e) => this.setState({ email: e.target.value })}
            />

            <label htmlFor="email">
              <b>이름 (Name)</b>
            </label>
            <input
              type="text"
              placeholder="Jinsup"
              required
              onChange={(e) => this.setState({ username: e.target.value })}
            />

            <label htmlFor="psw">
              <b>비밀번호 (Password)</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              required
              onChange={(e) => this.setState({ password: e.target.value })}
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
              <button
                type="button"
                className="signupbtn"
                disabled={this.state.email === '' || this.state.password === '' || this.state.username === ''}
                onClick={this.signUp}
              >
                회원가입
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  signUp: (email: string, username: string, password: string) => dispatch(
    userActions.signUp(email, username, password),
  ),
});

const mapStateToProps = (state: any) => ({
  signupStatus: state.user.signupStatus,
  me: state.user.me,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal);
