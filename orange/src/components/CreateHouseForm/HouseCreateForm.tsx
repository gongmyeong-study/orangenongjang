import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './HouseCreateForm.scss';

interface HouseCreateFormData {
  name: string;
  introduction: string;
}

function HouseCreateForm() {
  const history = useHistory();

  const goToTheRoom = (houseId: number) => {
    const url = `/main/${houseId}`;
    history.push(url);
  };

  const createPlace = (
    name: string,
    introduction: string,
  ) => {
    axios.post('/api/v1/house/', { name, introduction })
      .then((res) => {
        const { data } = res;
        goToTheRoom(data.id);
      })
      .catch(() => {
        window.alert('같은 이름의 집을 가지고 있거나 요청에 문제가 있습니다.');
      });
  };

  const {
    register, handleSubmit, errors,
  } = useForm<HouseCreateFormData>();

  const onSubmit = (data: HouseCreateFormData) => {
    createPlace(data.name, data.introduction);
  };

  return (
    <form className="create-house-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>이름</h3>
      <TextField
        name="name"
        inputRef={register({ required: true })}
        error={Boolean(errors.name)}
        helperText={errors.name && '집 이름을 입력해주세요!'}
        className="text-input"
      />
      <h3>소개</h3>
      <TextField
        name="introduction"
        inputRef={register({ required: true })}
        error={Boolean(errors.name)}
        helperText={errors.name && '집 소개를 입력해주세요!'}
        className="text-input intro"
        inputProps={{ disableUnderline: true }}
        multiline
        rows={4}
        rowsMax={4}
      />
      <Button type="submit" className="create-button">
        집 생성하기
      </Button>
    </form>
  );
}

export default HouseCreateForm;
