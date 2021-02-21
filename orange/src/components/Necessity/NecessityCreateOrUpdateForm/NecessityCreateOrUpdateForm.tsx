import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, InputAdornment, TextField } from '@material-ui/core';

import { Necessity } from '../../../api';
import { necessityActions } from '../../../store/actions/index';
import './NecessityCreateOrUpdateForm.css';

type CreateOrUpdate = 'CREATE' | 'UPDATE';

interface Props {
  placeId: number;
  necessityToBeUpdated?: Necessity;
  type: CreateOrUpdate;
}

interface NecessityCreateOrUpdateFormData {
  name: string;
  option: string;
  description: string;
  price: number;
  count: number;
}

function NecessityCreateOrUpdateForm(props: Props) {
  const { necessityToBeUpdated } = props;
  const {
    register, handleSubmit, errors,
  } = useForm<NecessityCreateOrUpdateFormData>();

  const dispatch = useDispatch();

  const onCreateNecessityPlace = (
    placeId: number,
    name: string,
    option: string,
    description: string,
    price: number,
    count: number,
  ) => {
    dispatch(necessityActions.createNecessityPlace(
      placeId, name, option, description, price, count,
    ));
    dispatch(necessityActions.SetStatusNull());
  };

  const onUpdateNecessityPlace = (
    placeId: number,
    necessityId: number,
    description: string,
    price: number,
    count: number,
  ) => {
    dispatch(necessityActions.updateNecessityPlace(
      placeId, necessityId, description, price, count,
    ));
    dispatch(necessityActions.SetStatusNull());
  };

  const onSubmitToCreate = (data: NecessityCreateOrUpdateFormData) => onCreateNecessityPlace(
    props.placeId, data.name, data.option, data.description, data.price, data.count,
  );

  const onSubmitToUpdate = (data: NecessityCreateOrUpdateFormData) => onUpdateNecessityPlace(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    props.placeId, props.necessityToBeUpdated!.id, data.description, data.price, data.count,
  );

  const onSubmit = (data: NecessityCreateOrUpdateFormData) => {
    if (props.type === 'CREATE') {
      onSubmitToCreate(data);
    } else {
      onSubmitToUpdate(data);
    }
  };

  const formTitle = props.type === 'CREATE' ? '집에 필요한 물품을 추가해보세요!' : '수정할 내용을 적어 주세요';
  const submitIcon = props.type === 'CREATE' ? <i className="fas fa-plus-circle fa-4x" /> : <i className="fas fa-edit fa-3x" />;

  return (
    <>
      <h3 className="create-form-title">{formTitle}</h3>
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
          defaultValue={necessityToBeUpdated && necessityToBeUpdated.name}
          disabled={Boolean(necessityToBeUpdated)}
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
          defaultValue={necessityToBeUpdated && necessityToBeUpdated.option}
          disabled={Boolean(necessityToBeUpdated)}
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
          defaultValue={necessityToBeUpdated && necessityToBeUpdated.description}
          className="text-input"
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <h4 style={{ marginRight: '3em' }}>가격</h4>
              </InputAdornment>
            ),
            inputMode: 'numeric',
          }}
          name="price"
          type="number"
          inputRef={register({
            min: {
              value: 0,
              message: 'Value should be at least 0',
            },
            max: {
              value: 2 ** 32 - 1,
              message: 'Value should be at most 2^32 - 1 (= 4294967295)',
            },
          })}
          error={Boolean(errors.price)}
          className="text-input"
          defaultValue={necessityToBeUpdated ? necessityToBeUpdated.price : 0}
          helperText={errors.price && '올바른 양의 정수값을 입력해주세요!'}
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
          inputRef={register({
            required: true,
            min: {
              value: 0,
              message: 'Count should be at least 0',
            },
            max: {
              value: 2 ** 32 - 1,
              message: 'Count should be at most 2^32 - 1 (= 4294967295)',
            },
          })}
          error={Boolean(errors.count)}
          className="text-input"
          defaultValue={necessityToBeUpdated ? necessityToBeUpdated.count : 0}
          helperText={errors.count && '올바른 양의 정수값을 입력해주세요!'}
        />
        <Button type="submit">{submitIcon}</Button>
      </form>
    </>
  );
}

export default NecessityCreateOrUpdateForm;
