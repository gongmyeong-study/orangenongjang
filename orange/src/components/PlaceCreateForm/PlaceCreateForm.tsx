import React from 'react';
import { useDispatch } from 'react-redux';
import './PlaceCreateForm.css';
import { TextField, InputAdornment, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { createPlace } from '../../store/actions/necessity/necessity';

interface Props {
  houseId: number;
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
    dispatch(createPlace(houseId, name));
  };

  const {
    register, handleSubmit, errors,
  } = useForm<PlaceCreateFormData>();

  const onSubmit = (data: PlaceCreateFormData) => {
    onCreatePlace(props.houseId, data.name);
  };

  return (
    <form className="create-place-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <h3 style={{ marginRight: '3em' }}>새 공간 이름</h3>
            </InputAdornment>
          ),
        }}
        inputRef={register({ required: true })}
        placeholder="주방"
        error={Boolean(errors.name)}
        helperText={errors.name && '공간 이름을 입력해주세요!'}
        className="text-input"
      />
      <Button type="submit">
        <i className="fas fa-plus fa-4x" />
      </Button>
    </form>
  );
}

export default PlaceCreateForm;
