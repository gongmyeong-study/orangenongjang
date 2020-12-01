import React, { useEffect } from 'react';
import {
  TextField, Button, InputAdornment,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { House, User } from '../../../api';
import { houseStatus } from '../../../constants/constants';
import { inviteHouse } from '../../../store/actions/house/house';
import { OrangeGlobalState } from '../../../store/state';

interface Props {
  houseId: number;
  userToBeInvited?: House;
  users?: User[];
}

interface HouseInviteFormData {
  email: string;
}

function HouseInviteButton(props: Props) {
  const { userToBeInvited } = props;
  const {
    register, handleSubmit, errors,
  } = useForm<HouseInviteFormData>();

  const dispatch = useDispatch();
  const { inviteStatus } = useSelector((state: OrangeGlobalState) => state.house);

  const onInviteHouse = (
    houseId: number,
    email: string,
  ) => {
    dispatch(inviteHouse(houseId, email));
  };

  useEffect(() => {
    if (inviteStatus === houseStatus.SUCCESS) {
      alert('입력한 이메일로 초대장을 전송했습니다.');
      window.location.reload();
    } if (inviteStatus === houseStatus.FAILURE_AUTHENTICATION) {
      alert('메일주소 또는 인터넷 연결상태를 확인하고 다시 시도해주세요.');
      window.location.reload();
    } if (inviteStatus === houseStatus.FAILURE_INVITE_LEADER) {
      alert('Leader만 멤버를 초대할 수 있습니다.');
      window.location.reload();
    } if (inviteStatus === houseStatus.FAILURE_EMAIL) {
      alert('오렌지농장에 등록되지 않은 회원입니다. 우선 가입해주세요.');
    } if (inviteStatus === houseStatus.FAILURE) {
      alert('잘못된 접근입니다.');
      window.location.reload();
    }
  }, [inviteStatus]);

  const onSubmitToInvite = (data: HouseInviteFormData) => onInviteHouse(
    props.houseId, data.email,
  );

  const formTitle = 'House 초대';
  const submitIcon = <i className="far fa-envelope fa-3x" />;

  return (
    <>
      <h2>{formTitle}</h2>
      <form onSubmit={handleSubmit(onSubmitToInvite)}>
        <h4>이메일로 House 초대장이 전송됩니다.</h4>
        <TextField
          name="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <h4 style={{ marginRight: '3em' }}>Email</h4>
              </InputAdornment>
            ),
          }}
          inputRef={register({ required: true })}
          disabled={Boolean(userToBeInvited)}
          error={Boolean(errors.email)}
          helperText={errors.email && 'Email을 입력해주세요!'}
          className="text-input"
        />
        <Button type="submit">{submitIcon}</Button>
      </form>
    </>
  );
}

export default HouseInviteButton;
