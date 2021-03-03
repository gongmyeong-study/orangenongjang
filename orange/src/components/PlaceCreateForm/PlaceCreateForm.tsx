import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, InputAdornment, TextField } from '@material-ui/core';

import { necessityActions } from '../../store/actions/index';
import './PlaceCreateForm.scss';

interface Props {
  houseId: number;
  closeModal: () => void;
}

interface PlaceCreateFormData {
  name: string;
}

function PlaceCreateForm(props: Props) {
  const dispatch = useDispatch();

  const onCreatePlace = (
    houseId: number,
    name: string,
  ) => {
    dispatch(necessityActions.createPlace(houseId, name));
    dispatch(necessityActions.setNecessityStatusNull());
  };

  const {
    register, handleSubmit, errors,
  } = useForm<PlaceCreateFormData>();

  const onSubmit = (data: PlaceCreateFormData) => {
    onCreatePlace(props.houseId, data.name);
  };

  return (
    <form className="create-place-form" onSubmit={handleSubmit(onSubmit)}>
      <button className="close-button" type="button" onClick={props.closeModal}>
        <i className="fas fa-times" />
      </button>
      <div className="input-wrapper">
        <TextField
          name="name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <h3 style={{ marginRight: '24px' }}>새 공간 이름</h3>
              </InputAdornment>
            ),
          }}
          inputRef={register({ required: true })}
          error={Boolean(errors.name)}
          helperText={errors.name && '공간 이름을 입력해주세요!'}
          className="text-input"
        />
        <Button type="submit">
          <i className="fas fa-plus fa-4x" />
        </Button>
      </div>
    </form>
  );
}

export default PlaceCreateForm;
