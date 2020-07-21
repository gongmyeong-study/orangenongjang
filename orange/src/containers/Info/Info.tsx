import React, { Component } from 'react';

import { Header, StudyInfo, Articles } from '../../components';
import './Info.css';

class Info extends Component {
  render() {
    return(
      <div className="info-ui">
        <Header className="main-header" title="오렌지 농장"/>
        <main>
          <StudyInfo className="left-info" />
          <Articles className="right-articles" />  
        </main>
      </div>
    );
  }
}

export default Info;
