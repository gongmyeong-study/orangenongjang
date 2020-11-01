import React, { Component } from 'react';
import axios from 'axios';

import { LogList } from '../../components';
import { necessityUserLogStatus } from '../../constants/constants';

interface Props {
  history: any;
  houseId: string;
}

interface State {
  logs: any[];
  getLogStatus: string;
}

class TimelinePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      logs: [],
      getLogStatus: necessityUserLogStatus.NONE,
    };
  }

  componentDidMount() {
    axios.get(`/api/v1/house/${this.props.houseId}/necessity_log/`)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ logs: res.data, getLogStatus: necessityUserLogStatus.SUCCESS });
        }
      });
  }

  render() {
    const { logs, getLogStatus } = this.state;
    const logList = logs.map((log) => <LogList key={log.id} logs={log} />);

    return (
      <div className="timeline-page">
        타임라인 페이지
        {getLogStatus === necessityUserLogStatus.SUCCESS ? logList : null}
      </div>
    );
  }
}

export default TimelinePage;
