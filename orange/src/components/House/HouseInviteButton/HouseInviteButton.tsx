import React from 'react';
import {
  TextField, Button, InputAdornment,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { House, User } from '../../../api';
import { inviteHouse } from '../../../store/actions/house/house';

import '../../Necessity/NecessityCreateOrUpdateForm/NecessityCreateOrUpdateForm.css';

interface Props {
  houseId: number;
  houseToBeInvited?: House;
  users?: User[];
}

interface HouseInviteFormData {
  email: string;
}

function HouseInviteButton(props: Props) {
  const { houseToBeInvited } = props;
  const {
    register, handleSubmit, errors,
  } = useForm<HouseInviteFormData>();

  const dispatch = useDispatch();

  const onInviteHouse = (
    houseId: number,
    email: string,
  ) => {
    dispatch(inviteHouse(houseId, email));
  };

  const onSubmitToInvite = (data: HouseInviteFormData) => onInviteHouse(
    props.houseId, data.email,
  );

  const formTitle = 'House 관리하기';
  const submitIcon = <i className="far fa-envelope fa-3x" />;

  return (
    <>
      <h2 className="create-form-title">{formTitle}</h2>
      {props.houseId}
      <form onSubmit={handleSubmit(onSubmitToInvite)} className="create-form">
        <h4>이메일을 입력하면 House 초대장이 전송됩니다.</h4>
        <TextField
          name="name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <h4 style={{ marginRight: '3em' }}>Email</h4>
              </InputAdornment>
            ),
          }}
          inputRef={register({ required: true })}
          disabled={Boolean(houseToBeInvited)}
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
