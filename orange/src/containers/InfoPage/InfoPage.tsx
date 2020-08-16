import React, { Component } from 'react';

import { StudyInfo } from '../../components';
import './InfoPage.css';

class InfoPage extends Component {
  render() {
    return (
      <div className="info-ui">
        <main>
          <StudyInfo />
        </main>
      </div>
    );
  }
}

export default InfoPage;
