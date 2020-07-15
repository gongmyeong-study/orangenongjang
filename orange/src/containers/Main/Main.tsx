import React, { Component } from 'react';

import { Header, StudyInfo, Articles } from '../../components';
import './Main.css';

class Main extends Component {
  render() {
    return(
      <div className="main-ui">
        <Header className="main-header" title="오렌지 안녕"/>
        <main>
          <StudyInfo className="left-info" />
          <Articles className="right-articles" />  
        </main>
      </div>
    );
  }
}

export default Main;
