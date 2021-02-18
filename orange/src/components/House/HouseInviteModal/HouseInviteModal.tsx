import React from 'react';
import {
  TextField, Button, InputAdornment,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { House } from '../../../api';
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

  const onInviteHouse = (houseId: number, email: string) => {
    dispatch(houseActions.inviteHouse(houseId, email));
  };

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
