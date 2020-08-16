import React, { Component } from 'react';

import NecessityPage from '../NecessityPage/NecessityPage';
import StatisticsPage from '../StatisticsPage/StatisticsPage';
import TimelinePage from '../TimelinePage/TimelinePage';
import WorkPage from '../WorkPage/WorkPage';
import './MainPage.css';

interface Props {
  history: any;
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
    let body = null;
    switch (this.state.activeTab) {
      case 1:
        body = <WorkPage />;
        break;
      case 2:
        body = <TimelinePage />;
        break;
      case 3:
        body = <StatisticsPage />;
        break;
      default:
        body = <NecessityPage history={this.props.history} />;
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
          >
            생필품 관리
          </div>
          <div
            className="main-tab"
            id="work-tab"
            onClick={() => this.setState({ activeTab: 1 })}
          >
            가사노동 관리
          </div>
          <div
            className="main-tab"
            id="timeline-tab"
            onClick={() => this.setState({ activeTab: 2 })}
          >
            타임라인
          </div>
          <div
            className="main-tab"
            id="statistics-tab"
            onClick={() => this.setState({ activeTab: 3 })}
          >
            통계
          </div>
        </div>
        {body}
      </div>
    );
  }
}

// const mapStateToProps = (state: any) => ({

// });

// const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
//     onSearchPaper: (searchWord) => dispatch(paperActions.searchPaper(searchWord)),
//     onSearchCollection: (searchWord, pageNum) => dispatch(
//         collectionActions.searchCollection(searchWord, pageNum),
//     ),
//     onSearchUser: (searchWord, pageNum) => dispatch(userActions.searchUser(searchWord, pageNum)),
// });

export default MainPage;
