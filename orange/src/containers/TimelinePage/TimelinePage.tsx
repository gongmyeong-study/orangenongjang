import React, { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import { History } from 'history';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import { NecessityLog } from '../../api';
import { necessityUserLogStatus } from '../../constants/constants';
import { LogList } from '../../components';

interface Props {
  history: History;
  houseId: number;
  log: NecessityLog;
}

interface State {
  logs: Array<NecessityLog>;
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
      .then((res: AxiosResponse<[NecessityLog]>) => {
        if (res.status === 200) {
          this.setState({ logs: res.data, getLogStatus: necessityUserLogStatus.SUCCESS });
        }
      });
  }

  render() {
    const { logs, getLogStatus } = this.state;
    const activityCategory = () => {
      switch (this.props.log.action) {
        case 'CREATE':
          return '을(를) 생필품 목록에 추가했습니다.';
        case 'UPDATE':
          return '을(를) 수정했습니다.';
        case 'DELETE':
          return '을(를) 생필품 목록에서 삭제했습니다.';
        case 'COUNT':
          return '의 수량을 변경했습니다.';
        default:
          return '을(를) 수정했습니다.';
      }
    };

    const logList = logs.map((log) => (
      <div
        key={log.id}
      >
        <Timeline>
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography color="textSecondary">{log.created_at}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography>
                {/* {log.user} */}
                이/가
                {' '}
                {log.necessity?.name}

                {}

              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
      // <LogList key={log.id} logs={log} />
    ));
    return (
      <>
        <div className="timeline-page">
          {getLogStatus === necessityUserLogStatus.SUCCESS ? logList : null}
        </div>
      </>
    );
  }
}

export default TimelinePage;
