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
  const necessityplace = props.logs.necessity?.place_name;
  const createdAt = (new Date(props.logs.created_at)).toLocaleString();

  const activityCategory = () => {
    switch (props.logs.action) {
      case 'CREATE':
        return `${necessityplace}에 ${necessityname} 추가`;
      case 'UPDATE':
        return `${necessityplace}에서 ${necessityname} 정보 수정`;
      case 'DELETE':
        return `${necessityplace}에서 ${necessityname} 삭제`;
      case 'COUNT':
        return `${necessityplace}에서 ${necessityname}의 수량 변경`;
      default:
        return `${necessityplace}에서 ${necessityname} 정보 수정`;
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
              <Typography variant="h5" component="h1">
                {activityCategory()}
                {' '}
              </Typography>
              <Typography>
                by &nbsp;
                {username}
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
