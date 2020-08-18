import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../store/actions';
import { userStatus } from '../../constants/constants';
import './Header.css';

interface Props {
  history: any;
  pathname: string;
  loginStatus: string;
  logoutStatus: string;
  getMeStatus: string;
  me: any;
  onGetMe: () => any;
  onLogout: () => any;
}

class Header extends Component<Props> {
  componentDidMount() {
    this.props.onGetMe();
  }

  render() {
    let whereToGo = '/info';
    let whereToGoDisplay = 'info';
    let logoutButton = null;

    // if not logged-in, userStatus would be FAILURE
    if (this.props.getMeStatus === userStatus.FAILURE) {
      if (this.props.pathname === '/info') {
        // anonymous user can access InfoPage
        whereToGo = '/intro';
        whereToGoDisplay = 'intro';
      } else {
        // force anonymous user to redirect to IntroPage
        this.props.history.push('/intro');
      }
    } else {
      // if logged-in, there should be logout button
      logoutButton = (
        <li>
          {this.props.me.username}
          님 안녕하세요!&nbsp;&nbsp;
          <button
            className="logout-button"
            type="button"
            onClick={() => this.props.onLogout()
              .then(() => {
                if (this.props.logoutStatus === userStatus.SUCCESS) {
                  this.props.history.push('/intro');
                  window.location.reload();
                }
              })}
          >
            logout
          </button>
        </li>
      );
      if (this.props.pathname === '/intro') {
      // force logged-in user to redirect to MainPage
        this.props.history.push('/');
      } else if (this.props.pathname !== '/') {
        whereToGo = '/';
        whereToGoDisplay = 'main';
      }
    }

    return (
      <ul className="main-header">
        <li>오렌지농장</li>
        <li>Since. 2020.04.12.</li>
        <li>
          <button
            className="header-page-button"
            type="button"
            onClick={() => this.props.history.push(whereToGo)}
          >
            {whereToGoDisplay}
          </button>
        </li>
        {logoutButton}
      </ul>
    );
  }
}

const mapStateToProps = (state: any) => ({
  pathname: state.router.location.pathname,
  getMeStatus: state.user.getMeStatus,
  loginStatus: state.user.loginStatus,
  logoutStatus: state.user.logoutStatus,
  me: state.user.me,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onGetMe: () => dispatch(userActions.getMe()),
  onLogout: () => dispatch(userActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
