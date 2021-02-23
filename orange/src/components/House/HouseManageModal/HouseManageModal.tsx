/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useState } from 'react';
import EdiText from 'react-editext';
import { AiOutlineCrown } from 'react-icons/ai';
import { Select } from 'react-functional-select';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

import { House, User } from '../../../api';
import { houseActions, userActions } from '../../../store/actions/index';
import { OrangeGlobalState } from '../../../store/state';

import './HouseManageModal.scss';

interface Props {
  house?: House;
  me?: User;
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

  const onLeaveHouse = (houseId: number) => { dispatch(houseActions.leaveHouse(houseId)); };
  const onSubmitToLeave = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    window.confirm(`[ ${props.house!.name} ]을/를 정말 탈퇴하시겠습니까?`)
    && onLeaveHouse(props.house!.id);
  };

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
  const onRenameHouse = (houseId: number, houseName: string) => {
    dispatch(houseActions.renameHouse(houseId, houseName));
  };
  const onReintroduceHouse = (houseId: number, houseIntroduction: string) => {
    dispatch(houseActions.reintroduceHouse(houseId, houseIntroduction));
  };

  useEffect(() => {
    userActions.getMe();
  }, [getMeStatus]);

  const TossLeaderIcon = <i className="far fa-handshake fa-2x" />;
  const LeaveHouseIcon = <i className="fas fa-sign-out-alt fa-2x" />;
  const RemoveHouseIcon = <i className="fas fa-trash-alt fa-2x" />;
  return (
    <>
      <div className="house-modal-name-intro">
        <h2 className="house-modal-name">
          {props.house!.users.map((user) => (
            user.username === me.username && user.is_leader)).includes(true)
            ? (
              <EdiText
                viewContainerClassName="house-modal-name-update-box"
                editButtonContent={<i className="fas fa-pencil-alt" />}
                saveButtonContent={<i className="fas fa-check" />}
                cancelButtonContent={<i className="fas fa-times" />}
                hideIcons
                type="text"
                showButtonsOnHover
                submitOnUnfocus
                submitOnEnter
                cancelOnEscape
                inputProps={{
                  className: 'house-modal-name-update-input',
                  placeholder: 'House 이름을 입력하세요.',
                  style: { fontSize: 19 },
                }}
                validationMessage="한 글자 이상, 열 글자 이하로 입력하세요."
                validation={(val) => (val.length > 0 && val.length <= 10)}
                value={props.house!.name}
                onSave={(houseName: string) => {
                  onRenameHouse(props.house!.id, houseName);
                }}
              />
            )
            : props.house!.name}
        </h2>
        <div className="house-modal-intro">
          {props.house!.users.map((user) => (
            user.username === me.username && user.is_leader)).includes(true)
            ? (
              <EdiText
                viewContainerClassName="house-modal-intro-update-box"
                editButtonContent={<i className="fas fa-pencil-alt" />}
                saveButtonContent={<i className="fas fa-check" />}
                cancelButtonContent={<i className="fas fa-times" />}
                hideIcons
                type="text"
                showButtonsOnHover
                submitOnUnfocus
                submitOnEnter
                cancelOnEscape
                inputProps={{
                  className: 'house-modal-intro-update-input',
                  placeholder: 'House 소개를 입력하세요.',
                  style: { fontSize: 15 },
                }}
                validationMessage="스무 글자 이하로 입력하세요."
                validation={(val) => val.length <= 20}
                value={props.house!.introduction}
                onSave={(houseIntroduction: string) => {
                  onReintroduceHouse(props.house!.id, houseIntroduction);
                }}
              />
            )
            : props.house!.introduction}
        </div>
      </div>
      <div className="members-box">
        <h4 className="members-box-title">
          집 멤버
        </h4>
        {props.house!.users?.map((user) => (
          <div
            key={user.id}
            className="member-box"
          >
            {(user.is_leader) ? (<AiOutlineCrown />) : (null)}
            &emsp;
            {user.username}
            &emsp;
            (
            {new Date(user.joined_at).toLocaleDateString()}
            {' '}
            ~ )
          </div>
        ))}
      </div>
      {props.house?.users.map(
        (user) => (user.username === me.username && user.is_leader),
      ).includes(true)
        ? (
          <>
            <form
              onSubmit={handleSubmit(onSubmitToToss)}
              className="house-toss-leader-form"
            >
              <h4 className="house-modal-text">
                Leader 넘기기&emsp;
              </h4>
              <div className="house-user-container">
                <Select
                  options={props.house.users}
                  placeholder="멤버 선택"
                  onOptionChange={onOptionChange}
                  getOptionValue={getOptionValue}
                  getOptionLabel={getOptionLabel}
                  menuItemSize={45}
                  menuMaxHeight={500}
                />
              </div>
              <Button
                type="submit"
                disabled={!selectedOption}
              >
                {TossLeaderIcon}
              </Button>
            </form>

            <form onSubmit={handleSubmit(onSubmitToRemove)}>
              <h4>
                House 삭제하기
                <Button type="submit">
                  {RemoveHouseIcon}
                </Button>
              </h4>
            </form>
          </>
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
