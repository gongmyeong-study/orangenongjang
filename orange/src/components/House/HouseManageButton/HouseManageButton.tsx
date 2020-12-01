import React, { useEffect } from 'react';
import { AiOutlineCrown } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import { House, User } from '../../../api';
import { houseStatus } from '../../../constants/constants';
import { leaveHouse, tossLeader } from '../../../store/actions/house/house';
import { OrangeGlobalState } from '../../../store/state';

interface Props {
  houseId: number;
  houseToLeave?: House;
  LeaderToToss?: House;
  users?: User[];
}

interface LeaderTossFormData {
  userId: number;
}

function HouseManageButton(props: Props) {
  const { handleSubmit } = useForm<LeaderTossFormData>();
  const dispatch = useDispatch();
  const { leaveStatus, tossStatus } = useSelector((state: OrangeGlobalState) => state.house);

  const onLeaveHouse = (houseId: number) => { dispatch(leaveHouse(houseId)); };
  const onSubmitToLeave = () => onLeaveHouse(props.houseId);

  const onTossLeader = (
    houseId: number, userId: number,
  ) => { dispatch(tossLeader(houseId, userId)); };
  const onSubmitToToss = (
    data: LeaderTossFormData,
  ) => onTossLeader(props.houseId, data.userId);

  useEffect(() => {
    if (leaveStatus === houseStatus.SUCCESS) {
      alert('Dobby is Free!');
      window.location.reload();
    } if (leaveStatus === houseStatus.FAILURE_LEAVE_LEADER) {
      alert('Leader는 House를 나갈 수 없습니다.');
      window.location.reload();
    } if (leaveStatus === houseStatus.FAILURE) {
      alert('잘못된 접근입니다.');
    }

    if (tossStatus === houseStatus.SUCCESS) {
      alert('Leader가 변경되었습니다.');
      window.location.reload();
    } if (tossStatus === houseStatus.FAILURE_ME) {
      alert('자기 자신에게는 Leader를 양도할 수 없습니다.');
    } if (tossStatus === houseStatus.FAILURE_TOSS_LEADER) {
      alert('Leader만 다른 사람에게 Leader를 양도할 수 있습니다.');
      window.location.reload();
    } if (tossStatus === houseStatus.FAILURE) {
      alert('실패!');
      window.location.reload();
    }
  }, [leaveStatus, tossStatus]);

  const formTitle = 'House 관리';
  const LeaderTossIcon = <i className="far fa-handshake fa-2x" />;
  const LeaveHouseIcon = <i className="fas fa-sign-out-alt fa-2x" />;

  return (
    <>
      <h2>{formTitle}</h2>
      {props.users?.map((user) => (
        <div key={user.id}>
          {(user.is_leader) ? (<AiOutlineCrown />) : (null)}
          &emsp;
          {user.username}
          &emsp;
          ( House 가입일 :
          &emsp;
          {new Date(user.joined_at).toLocaleDateString()}
          )
        </div>
      ))}
      <form onSubmit={handleSubmit(onSubmitToToss)}>
        <h4>
          Leader 넘기기
          <Button type="submit">
            {LeaderTossIcon}
          </Button>
        </h4>
      </form>
      <form onSubmit={handleSubmit(onSubmitToLeave)}>
        <h4>
          House 떠나기
          <Button type="submit">
            {LeaveHouseIcon}
          </Button>
        </h4>
      </form>
    </>
  );
}

export default HouseManageButton;
