import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineCrown } from 'react-icons/ai';
import { Select } from 'react-functional-select';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

import { User } from '../../../api';
import { houseStatus } from '../../../constants/constants';
import { houseActions } from '../../../store/actions/index';
import { OrangeGlobalState } from '../../../store/state';

import './HouseManageModal.css';

interface Props {
  houseId: number;
  users?: User[];
}

interface UserToBeLeaderFormData {
  id: number;
  username: string;
}

function HouseManageModal(props: Props) {
  const [selectedOption, setSelectedOption] = useState<UserToBeLeaderFormData | null>(null);
  const getOptionValue = useCallback((option: UserToBeLeaderFormData): number => option.id, []);
  const onOptionChange = useCallback(
    (option: UserToBeLeaderFormData | null): void => setSelectedOption(option), [],
  );
  const getOptionLabel = useCallback((option: UserToBeLeaderFormData): string => `${option.username}`, []);

  const { handleSubmit } = useForm<UserToBeLeaderFormData>();
  const dispatch = useDispatch();
  const { leaveStatus, tossStatus } = useSelector((state: OrangeGlobalState) => state.house);

  const onLeaveHouse = (houseId: number) => { dispatch(houseActions.leaveHouse(houseId)); };
  const onSubmitToLeave = () => onLeaveHouse(props.houseId);

  const onTossLeader = (houseId: number, userId: number) => {
    dispatch(houseActions.tossLeader(houseId, userId));
  };
  const onSubmitToToss = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    onTossLeader(props.houseId, selectedOption!.id);
  };

  useEffect(() => {
    if (leaveStatus === houseStatus.SUCCESS) {
      alert('Dobby is Free!');
      window.location.reload();
    } if (leaveStatus === houseStatus.FAILURE_LEAVE_LEADER) {
      alert('Leader는 House를 나갈 수 없습니다.');
    } if (leaveStatus === houseStatus.FAILURE) {
      alert('잘못된 접근입니다.');
    }

    if (tossStatus === houseStatus.SUCCESS) {
      alert('Leader가 변경되었습니다.');
      window.location.reload();
    } if (tossStatus === houseStatus.FAILURE_INVITE_OR_TOSS_ME) {
      alert('자기 자신에게는 Leader를 양도할 수 없습니다.');
    } if (tossStatus === houseStatus.FAILURE_TOSS_LEADER) {
      alert('Leader만 다른 사람에게 Leader를 양도할 수 있습니다.');
    } if (tossStatus === houseStatus.FAILURE) {
      alert('실패!');
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
          Leader 넘기기&emsp;
        </h4>
        <div className="container">
          <Select
            options={props.users}
            placeholder="멤버 선택"
            onOptionChange={onOptionChange}
            getOptionValue={getOptionValue}
            getOptionLabel={getOptionLabel}
          />
        </div>
        <Button type="submit">
          {LeaderTossIcon}
        </Button>

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

export default HouseManageModal;
