import React, { useEffect, useState } from 'react';
import {
  Button, CircularProgress, InputAdornment, TextField,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { House } from '../../../api';
import { houseActions } from '../../../store/actions';
import { OrangeGlobalState } from '../../../store/state';
import { houseStatus } from '../../../constants/constants';

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

  const [isMailSended, setIsMailSended] = useState(false);

  const {
    inviteHouseStatus,
  } = useSelector(
    (state: OrangeGlobalState) => state.house,
  );
  const dispatch = useDispatch();

  const onInviteHouse = (houseId: number, email: string) => {
    dispatch(houseActions.inviteHouse(houseId, email));
    setIsMailSended(true);
  };

  const onSubmitToInvite = (data: HouseInviteFormData) => onInviteHouse(
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    props.house!.id, data.email,
  );

  const formTitle = `${props.house?.name} 초대`;
  const submitIcon = <i className="far fa-envelope fa-3x" />;

  useEffect(() => {
    if (inviteHouseStatus === houseStatus.SUCCESS
      || inviteHouseStatus === houseStatus.FAILURE_EMAIL
      || inviteHouseStatus === houseStatus.FAILURE_USERNAME
      || inviteHouseStatus === houseStatus.FAILURE_AUTHENTICATION) {
      setIsMailSended(false);
    }
  }, [inviteHouseStatus]);

  return (
    <>
      <h2>{formTitle}</h2>
      {/* 상태변화 체크를 위한 console log */}
      {console.log(isMailSended, inviteHouseStatus)}
      {isMailSended && <CircularProgress className="spinner" /> }
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
