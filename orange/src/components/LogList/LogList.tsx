import React from 'react';

import AutorenewIcon from '@material-ui/icons/Autorenew';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExposureRoundedIcon from '@material-ui/icons/ExposureRounded';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Paper from '@material-ui/core/Paper';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';

import { NecessityLog } from '../../api';
import './LogList.css';

interface Props {
  logs: NecessityLog;
}

function LogList(props: Props) {
  const { username } = props.logs.user;
  const necessityname = props.logs.necessity?.name;
  const createdAt = (new Date(props.logs.created_at)).toLocaleString();

  const activityCategory = () => {
    switch (props.logs.action) {
      case 'CREATE':
        return '이/가 생필품 목록에 추가되었습니다.';
      case 'UPDATE':
        return '이/가 수정되었습니다.';
      case 'DELETE':
        return '이/가 생필품 목록에서 삭제되었습니다.';
      case 'COUNT':
        return '의 수량이 변경되었습니다.';
      default:
        return '이/가 수정되었습니다.';
    }
  };

  const activityIcon = () => {
    // eslint-disable-next-line react/prop-types
    switch (props.logs.action) {
      case 'CREATE':
        return <ShoppingCartIcon />;
      case 'UPDATE':
        return <AutorenewIcon />;
      case 'DELETE':
        return <DeleteForeverIcon />;
      case 'COUNT':
        return <ExposureRoundedIcon />;
      default:
        return <AutorenewIcon />;
    }
  };

  return (
    <div className="logList">
      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography color="textSecondary">{createdAt}</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            {activityIcon()}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className="log-message">
              <Typography variant="h6" component="h1">
                <b>{necessityname}</b>
                {activityCategory()}
                {' '}
              </Typography>
              <Typography>
                (
                {username}
                )
              </Typography>
            </Paper>
            <Typography />
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

export default LogList;
