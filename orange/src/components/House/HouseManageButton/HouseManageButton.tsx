import React from 'react';
import { Button } from '@material-ui/core';
import { AiOutlineCrown } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { House, User } from '../../../api';
import { leaveHouse, tossLeader } from '../../../store/actions/house/house';

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

  const onLeaveHouse = (houseId: number) => { dispatch(leaveHouse(houseId)); };
  const onSubmitToLeave = () => onLeaveHouse(props.houseId);

  const onTossLeader = (
    houseId: number, userId: number,
  ) => { dispatch(tossLeader(houseId, userId)); };
  const onSubmitToToss = (
    data: LeaderTossFormData,
  ) => onTossLeader(props.houseId, data.userId);

  const formTitle = 'House 관리';
  const LeaderTossIcon = <i className="far fa-handshake fa-2x" />;
  const LeaveHouseIcon = <i className="fas fa-sign-out-alt fa-2x" />;

  return (
    <>
      <h2>{formTitle}</h2>
      {console.log(props.users)}
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
