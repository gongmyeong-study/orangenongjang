import React from 'react';
import { TextField, Button } from '@material-ui/core';
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="name"
        placeholder="생필품"
        variant="outlined"
        inputRef={register({ required: true })}
        error={Boolean(errors.name)}
        helperText={errors.name && '생필품 이름을 입력해주세요!'}
      />
      <TextField
        name="option"
        placeholder="옵션"
        variant="outlined"
      />
      <TextField
        name="description"
        placeholder="설명"
        variant="outlined"
      />
      <TextField
        name="price"
        placeholder="가격"
        variant="outlined"
      />
      <TextField
        name="count"
        placeholder="개수"
        variant="outlined"
        inputRef={register({ required: true })}
        error={Boolean(errors.count)}
        helperText={errors.count && '개수를 입력해주세요!'}
      />
      <Button type="submit">만들기</Button>
    </form>
  );
}

export default NecessityCreate;
