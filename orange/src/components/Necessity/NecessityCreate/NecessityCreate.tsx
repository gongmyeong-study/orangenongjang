import React from 'react';
import {
  TextField, Button, InputAdornment,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import './NecessityCreate.css';

interface Props {
  onCreateNecessityPlace: (
    placeId: number,
    name: string,
    option: string,
    description: string,
    price: number,
    count: number,
  ) => any;
  placeId: number;
}

interface NecessityCreateFormData {
  name: string;
  option: string;
  description: string;
  price: number;
  count: number;
}
function NecessityCreate(props: Props) {
  const {
    register, handleSubmit, errors,
  } = useForm<NecessityCreateFormData>();

  const onSubmit = (data: NecessityCreateFormData) => props.onCreateNecessityPlace(
    props.placeId, data.name, data.option, data.description, data.price, data.count,
  );

  return (
    <>
      <h3 className="create-form-title">집에 필요한 물품을 추가해보세요!</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="create-form">
        <TextField
          name="name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <h4 style={{ marginRight: '3em' }}>이름</h4>
              </InputAdornment>
            ),
          }}
          inputRef={register({ required: true })}
          placeholder="휴지"
          error={Boolean(errors.name)}
          helperText={errors.name && '생필품 이름을 입력해주세요!'}
          className="text-input"
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <h4 style={{ marginRight: '3em' }}>옵션</h4>
              </InputAdornment>
            ),
          }}
          name="option"
          inputRef={register}
          placeholder="크리넥스"
          className="text-input"
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <h4 style={{ marginRight: '3em' }}>설명</h4>
              </InputAdornment>
            ),
          }}
          name="description"
          inputRef={register}
          placeholder="부드러운거임"
          className="text-input"
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <h4 style={{ marginRight: '3em' }}>가격</h4>
              </InputAdornment>
            ),
          }}
          name="price"
          inputRef={register({ required: true })}
          error={Boolean(errors.price)}
          type="number"
          placeholder="10000"
          className="text-input"
          helperText={errors.count && '가격을 입력해주세요!'}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <h4 style={{ marginRight: '3em' }}>개수</h4>
              </InputAdornment>
            ),
          }}
          name="count"
          type="number"
          inputRef={register({ required: true })}
          error={Boolean(errors.count)}
          className="text-input"
          placeholder="1"
          helperText={errors.count && '개수를 입력해주세요!'}
        />
        <Button type="submit"><i className="fas fa-plus-circle fa-4x" /></Button>
      </form>
    </>
  );
}

export default NecessityCreate;
