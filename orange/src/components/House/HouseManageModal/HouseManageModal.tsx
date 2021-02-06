/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineCrown } from 'react-icons/ai';
import { Select } from 'react-functional-select';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

import { House, User } from '../../../api';
import { houseStatus } from '../../../constants/constants';
import { houseActions, userActions } from '../../../store/actions/index';
import { OrangeGlobalState } from '../../../store/state';

import './HouseManageModal.css';

interface Props {
  house?: House;
  me? : User;
}

interface UserToBeLeaderFormData {
  id: number;
  username: string;
}

function HouseManageModal(props: Props) {
  const [selectedOption, setSelectedOption] = useState<UserToBeLeaderFormData | null>(null);
  const { getMeStatus, me } = useSelector((state: OrangeGlobalState) => state.user);
  const getOptionValue = useCallback((option: UserToBeLeaderFormData): number => option.id, []);
  const onOptionChange = useCallback(
    (option: UserToBeLeaderFormData | null): void => setSelectedOption(option), [],
  );
  const getOptionLabel = useCallback((option: UserToBeLeaderFormData): string => `${option.username}`, []);

  const { handleSubmit } = useForm<UserToBeLeaderFormData>();
  const dispatch = useDispatch();
  const { leaveStatus, tossStatus, removeHouseStatus } = useSelector(
    (state: OrangeGlobalState) => state.house,
  );

  const onLeaveHouse = (houseId: number) => { dispatch(houseActions.leaveHouse(houseId)); };
  const onSubmitToLeave = () => onLeaveHouse(props.house!.id);

  const onRemoveHouse = (houseId: number) => { dispatch(houseActions.removeHouse(houseId)); };
  const onSubmitToRemove = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    window.confirm(`[ ${props.house!.name} ]을/를 정말 삭제하시겠습니까?`)
    && onRemoveHouse(props.house!.id);
  };

  const onTossLeader = (houseId: number, userId: number) => {
    dispatch(houseActions.tossLeader(houseId, userId));
  };
  const onSubmitToToss = () => {
    onTossLeader(props.house!.id, selectedOption!.id);
  };

  useEffect(() => {
    switch (leaveStatus) {
      case houseStatus.NONE:
        break;
      case houseStatus.SUCCESS:
        alert('Dobby is Free!');
        break;
      case houseStatus.FAILURE_LEAVE_LEADER:
        alert('Leader는 House를 나갈 수 없습니다.');
        break;
      default:
        alert('잘못된 접근입니다.');
    }
    switch (tossStatus) {
      case houseStatus.NONE:
        break;
      case houseStatus.SUCCESS:
        alert('Leader가 변경되었습니다.');
        break;
      case houseStatus.FAILURE_TOSS_ME:
        alert('자기 자신에게는 Leader를 양도할 수 없습니다.');
        break;
      case houseStatus.FAILURE_TOSS_LEADER:
        alert('Leader만 다른 사람에게 Leader를 양도할 수 있습니다.');
        break;
      default:
        alert('잘못된 접근입니다.');
    }
    switch (removeHouseStatus) {
      case houseStatus.NONE:
        break;
      case houseStatus.SUCCESS:
        alert('House가 삭제되었습니다.');
        break;
      case houseStatus.FAILURE_REMOVE_MEMBER:
        alert('House 멤버가 아닙니다.');
        break;
      case houseStatus.FAILURE_REMOVE_LEADER:
        alert('House Leader만 House를 삭제할 수 있습니다.');
        break;
      default:
        alert('잘못된 접근입니다.');
    }
  }, [leaveStatus, removeHouseStatus, tossStatus]);

  useEffect(() => {
    if (leaveStatus !== houseStatus.NONE || tossStatus !== houseStatus.NONE) {
      window.location.reload();
    }
  });

  useEffect(() => {
    userActions.getMe();
  }, [getMeStatus]);

  const formTitle = `${props.house?.name} 관리`;
  const TossLeaderIcon = <i className="far fa-handshake fa-2x" />;
  const LeaveHouseIcon = <i className="fas fa-sign-out-alt fa-2x" />;
  const RemoveHouseIcon = <i className="fas fa-trash-alt fa-2x" />;
  return (
    <>
      <h2>{formTitle}</h2>
      {props.house!.users?.map((user) => (
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
            options={props.house!.users}
            placeholder="멤버 선택"
            onOptionChange={onOptionChange}
            getOptionValue={getOptionValue}
            getOptionLabel={getOptionLabel}
          />
        </div>
        <Button
          type="submit"
          disabled={!selectedOption}
        >
          {TossLeaderIcon}
        </Button>
      </form>

      {props.house?.users.map(
          (user) => (user.username === me.username && user.is_leader)).includes(true)
        ? (
          <form onSubmit={handleSubmit(onSubmitToRemove)}>
            <h4>
              House 삭제하기
              <Button type="submit">
                {RemoveHouseIcon}
              </Button>
            </h4>
          </form>
        )
        : (
          <form onSubmit={handleSubmit(onSubmitToLeave)}>
            <h4>
              House 떠나기
              <Button type="submit">
                {LeaveHouseIcon}
              </Button>
            </h4>
          </form>
        )}
    </>
  );
}

export default HouseManageModal;
