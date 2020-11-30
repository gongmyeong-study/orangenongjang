import React from 'react';
import {
  TextField, Button, InputAdornment,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { House } from '../../../api';
import { inviteHouse } from '../../../store/actions/house/house';

import '../../Necessity/NecessityCreateOrUpdateForm/NecessityCreateOrUpdateForm.css';

interface Props {
  houseId: number;
  houseToBeInvited?: House;
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

  const formTitle = '집에 초대하고 싶은 사람의 이메일을 적어주세요';
  const submitIcon = <i className="fas fa-edit fa-3x" />;

  return (
    <>
      <h3 className="create-form-title">{formTitle}</h3>
      <form onSubmit={handleSubmit(onSubmitToInvite)} className="create-form">
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
