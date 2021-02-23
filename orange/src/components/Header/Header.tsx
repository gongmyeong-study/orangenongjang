import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { userActions } from '../../store/actions';
import { userStatus } from '../../constants/constants';
import './Header.scss';
import { User } from '../../api';

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

interface NavMenu {
  name: string;
  linkTo: string;
  showingCondition: boolean;
  key: number;
}

class Header extends Component<Props, State> {
  readonly logoutKeyforList = 100;

  constructor(props: Props) {
    super(props);
    this.state = {
      isMenuModalOpen: false,
    };
  }

  componentDidMount() {
    this.props.onGetMe();
    this.listenRouteChange();
  }

  get isOnInfoPage() {
    return this.props.pathname === '/info';
  }

  get introOrMain() {
    return !this.isOnInfoPage ? '오렌지농장 소개' : '메인 페이지';
  }

  get isOnIntroPage() {
    return this.props.pathname === '/intro';
  }

  get isOnHousePage() {
    return this.props.pathname === '/house';
  }

  get introOrInfoLink() {
    return !this.isOnInfoPage ? '/info' : '/intro';
  }

  get isOnLogin() {
    return this.props.getMeStatus === userStatus.SUCCESS;
  }

  get isOnLoginAndNotOnIntroPage() {
    return !this.isOnIntroPage && this.isOnLogin;
  }

  get menuList(): NavMenu[] {
    return [
      {
        name: this.introOrMain,
        linkTo: this.introOrInfoLink,
        showingCondition: true,
        key: 1,
      },
      {
        name: '집 목록',
        linkTo: '/house',
        showingCondition: this.isOnLogin && !this.isOnInfoPage && !this.isOnHousePage,
        key: 2,
      },
    ];
  }

  get helloUser() {
    return (
      <>
        <strong>{this.props.me.username}</strong>
        님 안녕하세요!
      </>
    );
  }

  logout = async () => {
    try {
      await this.props.onLogout();

      if (this.props.logoutStatus === userStatus.SUCCESS) {
        this.props.history.push('/intro');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      window.location.reload();
    }
  };

  toggleMenuModal = () => {
    this.setState((prevState) => ({ isMenuModalOpen: !prevState.isMenuModalOpen }));
  };

  listenRouteChange = () => {
    this.props.history.listen(() => {
      this.setState({ isMenuModalOpen: false });
    });
  };

  render() {
    if (this.props.getMeStatus === userStatus.FAILURE && !this.isOnInfoPage && !this.isOnIntroPage) {
      this.props.history.push('/intro');
    }

    if (this.isOnLogin && this.isOnIntroPage) {
      this.props.history.push('/house');
    }

    return (
      <>
        <div className="header-wrapper">
          {this.isOnLoginAndNotOnIntroPage && (
            <p className="hello-user only-on-desktop">
              {this.helloUser}
            </p>
          )}
          <ul className="main-header only-on-desktop">
            {this.menuList.map((menu) => (
              menu.showingCondition && (
              <li key={menu.key} className="main-header-li">
                <Link to={menu.linkTo}>
                  {menu.name}
                </Link>
              </li>
              )
            ))}
            {this.isOnLoginAndNotOnIntroPage && (
              <li key={this.logoutKeyforList} className="main-header-li">
                <button type="button" onClick={this.logout}>
                  로그아웃
                </button>
              </li>
            )}
          </ul>
          {!this.isOnIntroPage && (
          <div className="logo-wrapper">
            <Link to="/intro">
              <img
                className="logo"
                src="https://orangenongjang-static.s3.ap-northeast-2.amazonaws.com/image/orangenongjang_logo_1.png"
                alt="orangenongjang_logo"
              />
            </Link>
          </div>
          )}

          <button className="navbar-burger only-on-mobile" type="button" onClick={this.toggleMenuModal}>
            <i className="fas fa-bars" />
          </button>
        </div>
        <Modal
          isOpen={this.state.isMenuModalOpen}
          className="modal only-on-mobile"
          onRequestClose={this.toggleMenuModal}
          overlayClassName="overlay"
          shouldFocusAfterRender={false}
        >
          <button className="close-button" type="button" onClick={this.toggleMenuModal}>
            <i className="fas fa-times" />
          </button>
          <ul className="menu-list">
            {this.menuList.map((menu) => (
              menu.showingCondition && (
                <li key={menu.key} className="main-header-li">
                  <Link to={menu.linkTo}>
                    {menu.name}
                  </Link>
                </li>
              )
            ))}
            {this.isOnLoginAndNotOnIntroPage && (
            <li key={this.logoutKeyforList} className="main-header-li">
              <button type="button" onClick={this.logout}>
                로그아웃
              </button>
            </li>
            )}
          </ul>
        </Modal>
      </>
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
