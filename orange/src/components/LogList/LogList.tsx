import React from 'react';
import { NecessityLog } from '../../api';

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

  return (
    <div className="logList">
      <p>
        {username}
        {' '}
        이(가)
        {' '}
        &apos;
        {necessityname}
        &apos;
        {activityCategory()}
        {' '}
        (
        {createdAt}
        )
      </p>
    </div>
  );
}

export default LogList;
