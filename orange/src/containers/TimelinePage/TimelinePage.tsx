import React, { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import { History } from 'history';

import { LogList } from '../../components';
import { necessityUserLogStatus } from '../../constants/constants';
import { NecessityHouseLog } from '../../api';

interface Props {
  history: History;
  houseId: number;
}

interface State {
  logs: Array<NecessityHouseLog>;
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
      .then((res: AxiosResponse<[NecessityHouseLog]>) => {
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
