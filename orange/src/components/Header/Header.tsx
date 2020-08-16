import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Header.css';

interface Props {
  history: any;
  pathname: string;
}

class Header extends Component<Props> {
  render() {
    let whereToGo = '/info';
    let whereToGoDisplay = 'info';

    if (this.props.pathname === '/info') {
      whereToGo = '/';
      whereToGoDisplay = 'main';
    }

    return (
      <ul className="main-header">
        <li>오렌지농장</li>
        <li>Since. 2020.04.12.</li>
        <li><button className="header-page-button" type="button" onClick={() => this.props.history.push(whereToGo)}>{whereToGoDisplay}</button></li>
      </ul>
    );
  }
}

const mapStateToProps = (state: any) => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(Header);
