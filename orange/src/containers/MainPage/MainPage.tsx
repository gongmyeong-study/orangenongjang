import React, { Component } from 'react';
import { History } from 'history';
import { match } from 'react-router-dom';

import NecessityPage from '../NecessityPage/NecessityPage';
import StatisticsPage from '../StatisticsPage/StatisticsPage';
import TimelinePage from '../TimelinePage/TimelinePage';
import WorkPage from '../WorkPage/WorkPage';
import './MainPage.css';

interface DetailParams {
  id: string;
}

interface Props {
  history: History;
  match: match<DetailParams>;
}

interface State {
  activeTab: number;
}

class MainPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  render() {
    const houseId = Number(this.props.match.params.id);

    let body = null;
    switch (this.state.activeTab) {
      case 1:
        body = <WorkPage />;
        break;
      case 2:
        body = <TimelinePage history={this.props.history} houseId={houseId} />;
        break;
      case 3:
        body = <StatisticsPage />;
        break;
      default:
        body = <NecessityPage history={this.props.history} houseId={houseId} />;
    }

    return (
      <div className="main-page">
        <div
          className="main-tabs"
        >
          <div
            className="main-tab"
            id="necessity-tab"
            onClick={() => this.setState({ activeTab: 0 })}
            style={this.state.activeTab === 0 ? { backgroundColor: 'orange' } : {}}
          >
            생필품
          </div>
          <div
            className="main-tab"
            id="work-tab"
            onClick={() => this.setState({ activeTab: 1 })}
            style={this.state.activeTab === 1 ? { backgroundColor: 'orange' } : {}}
          >
            가사노동
          </div>
          <div
            className="main-tab"
            id="timeline-tab"
            onClick={() => this.setState({ activeTab: 2 })}
            style={this.state.activeTab === 2 ? { backgroundColor: 'orange' } : {}}
          >
            타임라인
          </div>
          <div
            className="main-tab"
            id="statistics-tab"
            onClick={() => this.setState({ activeTab: 3 })}
            style={this.state.activeTab === 3 ? { backgroundColor: 'orange' } : {}}
          >
            통계
          </div>
        </div>
        {body}
      </div>
    );
  }
}

export default MainPage;
