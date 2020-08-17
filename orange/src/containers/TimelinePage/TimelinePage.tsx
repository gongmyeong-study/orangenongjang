import React, { Component } from 'react';
import axios from 'axios';

import { LogList } from '../../components/index';

interface Props {
  history?: any;
}

interface State {
  logs: any[];
  getLogAPISuccess: boolean;
}

class TimelinePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      logs: [],
      getLogAPISuccess: false,
    };
  }

  componentDidMount() {
    axios.get('/api/v1/necessity/log/')
      .then((res) => {
        if (res.status === 200) {
          this.setState({ logs: res.data, getLogAPISuccess: true });
        }
      });
  }

  render() {
    const { logs, getLogAPISuccess } = this.state;
    const logList = logs.map((log) => <LogList key={log.id} logs={log} />);

    return (
      <div className="timeline-page">
        타임라인 페이지
        {getLogAPISuccess ? logList : null}
      </div>
    );
  }
}

export default TimelinePage;
