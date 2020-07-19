import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';

import { userStatus } from '../../constants/constants';
import { userActions } from '../../store/actions';
import './Login.css';

interface Props {
  loginStatus: string;
  onLogin: (username: string, password: string) => any;
}

interface State {
  username: string;
  password: string;
}

class Login extends Component<Props, State> {
  // NOTE: this Login Component is just for example about api call. it can be changed completely differently.
  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  clickLoginHandler() {
    this.props.onLogin(this.state.username, this.state.password)
      .then(() => {
        if (this.props.loginStatus === userStatus.SUCCESS) {
          // NOTE: just friendly logging - please remove below logging line later
          console.log("SUCCESSFULLY LOGGED IN!")
        }
      });
  }

  render() {
    return (
      <>
      <h1>Login</h1>
        <div className="LoginField">
          <input
            id="username"
            type="text"
            placeholder="username"
            onChange={(e) => this.setState({ username: e.target.value })}
          />
          <input
            id="password"
            type="password"
            placeholder="password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        <button
          className="LoginButton"
          disabled={!this.state.username || !this.state.password}
          onClick={() => this.clickLoginHandler()}
        >
          go
        </button>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginStatus: state.user.loginStatus,
  user: state.user.login,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onLogin: (username: string, password: string) => dispatch(userActions.login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
