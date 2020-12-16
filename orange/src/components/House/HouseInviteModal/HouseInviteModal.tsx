import React, { useEffect } from 'react';
import {
  TextField, Button, InputAdornment,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { House } from '../../../api';
import { houseStatus } from '../../../constants/constants';
import { OrangeGlobalState } from '../../../store/state';
import { houseActions } from '../../../store/actions';

interface Props {
  house?: House;
}

interface HouseInviteFormData {
  email: string;
}

function HouseInviteModal(props: Props) {
  const {
    register, handleSubmit, errors,
  } = useForm<HouseInviteFormData>();

  const dispatch = useDispatch();
  const { inviteStatus } = useSelector((state: OrangeGlobalState) => state.house);

  const onInviteHouse = (houseId: number, email: string) => {
    dispatch(houseActions.inviteHouse(houseId, email));
  };

  useEffect(() => {
    if (inviteStatus === houseStatus.SUCCESS) {
      alert('입력한 이메일로 초대장을 전송했습니다.');
    } if (inviteStatus === houseStatus.FAILURE_AUTHENTICATION) {
      alert('메일주소 또는 인터넷 연결상태를 확인하고 다시 시도해주세요.');
    } if (inviteStatus === houseStatus.FAILURE_INVITE_LEADER) {
      alert('Leader만 멤버를 초대할 수 있습니다.');
    } if (inviteStatus === houseStatus.FAILURE_INVITE_OR_TOSS_ME) {
      alert('자기 자신은 초대할 수 없습니다.');
    } if (inviteStatus === houseStatus.FAILURE_EMAIL) {
      alert('오렌지농장에 등록되지 않은 회원입니다.');
    } if (inviteStatus === houseStatus.FAILURE) {
      alert('잘못된 접근입니다.');
    }
  }, [inviteStatus]);

  useEffect(() => {
    if (inviteStatus !== houseStatus.NONE) {
      window.location.reload();
    }
  });

  const onSubmitToInvite = (data: HouseInviteFormData) => onInviteHouse(
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    props.house!.id, data.email,
  );

  const formTitle = `${props.house?.name} 초대`;
  const submitIcon = <i className="far fa-envelope fa-3x" />;

  return (
    <>
      <h2>{formTitle}</h2>
      <form onSubmit={handleSubmit(onSubmitToInvite)}>
        <h4>
          이메일로
          [
          {props.house?.name}
          ]
          초대장이 전송됩니다.
        </h4>
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
          error={Boolean(errors.email)}
          helperText={errors.email && 'Email을 입력해주세요!'}
          className="text-input"
        />
        <Button type="submit">{submitIcon}</Button>
      </form>
    </>
  );
}

export default HouseInviteModal;
