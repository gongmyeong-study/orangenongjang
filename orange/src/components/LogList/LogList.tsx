import React from 'react';

interface Props {
  logs: any;
}

function LogList(props: Props) {
  const { username } = props.logs.user;
  const necessityname = props.logs.necessity.name;
  const createdAt = (new Date(props.logs.created_at)).toLocaleString();

  const activityCategory = () => {
    switch (props.logs.activity_category) {
      case 'CREATE':
        return '를(을) 생필품 목록에 추가했습니다.';
      case 'UPDATE':
        return '를(을) 수정했습니다.';
      case 'DELETE':
        return '를(을) 생필품 목록에서 삭제했습니다.';
      default:
        return '를(을) 수정했습니다.';
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
