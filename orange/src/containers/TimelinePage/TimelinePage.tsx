import React, { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import { History } from 'history';

import { LogList } from '../../components';
import { necessityUserLogStatus } from '../../constants/constants';
import { NecessityLog, PaginatedNecessityLog } from '../../api';

import './TimelinePage.css';

interface Props {
  history: History;
  houseId: number;
}

interface State {
  logs: Array<NecessityLog>;
  getLogStatus: string;
  pageNum: number;
  loading: boolean;
  finished: boolean;
}

class TimelinePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      logs: [],
      getLogStatus: necessityUserLogStatus.NONE,
      pageNum: 1,
      loading: true,
      finished: true,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/v1/house/${this.props.houseId}/necessity_log/`)
      .then((res: AxiosResponse<PaginatedNecessityLog>) => {
        if (res.status === 200) {
          this.setState({
            logs: res.data.results,
            getLogStatus: necessityUserLogStatus.SUCCESS,
            finished: !res.data.next,
          });
        }
      });
    this.setState({ loading: false });
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  viewMore = () => {
    axios
      .get(`/api/v1/house/${this.props.houseId}/necessity_log/`, {
        params: { page: this.state.pageNum + 1 },
      })
      .then((res: AxiosResponse<PaginatedNecessityLog>) => {
        if (res.status === 200) {
          this.setState((prevState) => ({
            logs: prevState.logs.concat(res.data.results),
            getLogStatus: necessityUserLogStatus.SUCCESS,
            pageNum: prevState.pageNum + 1,
            loading: false,
            finished: !res.data.next,
          }));
        }
      });
  };

  handleScroll = () => {
    const { scrollHeight } = document.documentElement;
    const { scrollTop } = document.documentElement;
    const { clientHeight } = document.documentElement;

    if (
      !this.state.loading
      && !this.state.finished
      && scrollTop + clientHeight + 2000 > scrollHeight
    ) {
      this.setState({ loading: true });
      this.viewMore();
    }
  };

  render() {
    const { logs, getLogStatus } = this.state;
    const logList = logs.map((log) => (
      <div className="log-list">
        <LogList key={log.id} logs={log} />
      </div>
    ));
    const logMessage = <h2>여기에 생필품 관련 기록이 쌓여요.</h2>;

    return (
      <div className="timeline-page">
        {getLogStatus === necessityUserLogStatus.SUCCESS && logList.length
          ? logList
          : logMessage}
      </div>
    );
  }
}

export default TimelinePage;
