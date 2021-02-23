import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import Modal from 'react-modal';
import { userActions } from '../../store/actions';
import { userStatus } from '../../constants/constants';
import './Header.css';
import { User } from '../../api';

/* eslint-disable jsx-a11y/control-has-associated-label */

interface Props {
  history: History;
  pathname: string;
  loginStatus: string;
  logoutStatus: string;
  getMeStatus: string;
  me: User;
  onGetMe: () => any;
  onLogout: () => any;
}

interface State {
  isMenuModalOpen: boolean;
}

class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isMenuModalOpen: false,
    };
  }

  componentDidMount() {
    this.props.onGetMe();
  }

  render() {
    let whereToGo = '/';
    let whereToGoDisplay = '집 목록';
    let logoutButton = null;

    const isNotOnIntro = this.props.getMeStatus === userStatus.SUCCESS;

    const logout = () => {
      this.props.onLogout()
        .then(() => {
          if (this.props.logoutStatus === userStatus.SUCCESS) {
            this.props.history.push('/intro');
            window.location.reload();
          }
        });
    };

    const toggleMenuModal = () => {
      this.setState((prevState) => ({ isMenuModalOpen: !prevState.isMenuModalOpen }));
    };

    const goToMainPage = () => {
      this.props.history.push('/');
      toggleMenuModal();
    };

    const goToMainOrInfoPage = () => {
      this.props.history.push(whereToGo);
      toggleMenuModal();
    };

    // if not logged-in, userStatus would be FAILURE
    if (this.props.getMeStatus === userStatus.FAILURE) {
      if (this.props.pathname === '/info') {
        // anonymous user can access InfoPage
        whereToGo = '/intro';
        whereToGoDisplay = '로그인';
      } else {
        // force anonymous user to redirect to IntroPage
        this.props.history.push('/intro');
      }
    } else {
      // if logged-in, there should be logout button
      logoutButton = (
        <li className="main-header-li">
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
            로그아웃
          </button>
        </li>
      );
      if (this.props.pathname === '/intro') {
      // force logged-in user to redirect to MainPage
        this.props.history.push('/');
      } else if (this.props.pathname !== '/info') {
        whereToGo = '/info';
        whereToGoDisplay = '오렌지농장 소개';
      }
    }

    let helloUser = null;
    if (this.props.pathname !== '/intro' && this.props.pathname !== '/info') {
      helloUser = (
        <p className="hello-user only-on-desktop">
          <strong>{this.props.me.username}</strong>
          님 안녕하세요!&nbsp;&nbsp;
        </p>
      );
    }

    return (
      <div className="header-wrapper">
        <button className="logo-wrapper only-on-desktop" type="button" onClick={goToMainPage}>
          <img
            className="logo"
            src="https://orangenongjang-static.s3.ap-northeast-2.amazonaws.com/image/orangenongjang_logo_1.png"
            alt="orangenongjang_logo"
          />
        </button>
        {helloUser}
        <ul className="main-header only-on-desktop">
          <li className="main-header-li">
            <button
              type="button"
              onClick={goToMainOrInfoPage}
            >
              {whereToGoDisplay}
            </button>
          </li>
          <li className="main-header-li">
            <button
              type="button"
              onClick={goToMainPage}
            >
              집 목록
            </button>
          </li>
          {logoutButton}
        </ul>
        {isNotOnIntro && (
        <div className="main-header only-on-mobile">
          <button type="button" onClick={goToMainPage}>
            <img
              className="logo"
              src="https://orangenongjang-static.s3.ap-northeast-2.amazonaws.com/image/orangenongjang_logo_1.png"
              alt="orangenongjang_logo"
            />
          </button>
          <button className="navbar-burger" type="button" onClick={toggleMenuModal}><i className="fas fa-bars" /></button>
        </div>
        )}
        <Modal
          isOpen={this.state.isMenuModalOpen}
          className="modal only-on-mobile"
          onRequestClose={toggleMenuModal}
          overlayClassName="overlay"
          shouldFocusAfterRender={false}
        >
          <ul className="menu-list">
            <li>
              <button
                type="button"
                onClick={goToMainOrInfoPage}
              >
                {whereToGoDisplay}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={goToMainPage}
              >
                집 목록
              </button>
            </li>
            <li>
              <button type="button" onClick={logout}>
                로그아웃
              </button>
            </li>
          </ul>
        </Modal>
      </div>
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
