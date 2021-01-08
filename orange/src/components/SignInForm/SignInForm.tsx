import React from 'react';
import { useDispatch } from 'react-redux';
import { TextField, InputAdornment, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { useForm } from 'react-hook-form';
import { login } from '../../store/actions/user/user';
import './SignInForm.scss';

interface SigInFormData {
  username: string;
  password: string;
}

function SignInForm() {
  const dispatch = useDispatch();

  const onLogin = (username: string, password: string) => {
    dispatch(login(username, password));
  };

  const {
    register, handleSubmit, errors,
  } = useForm<SigInFormData>();

  const onSubmit = (data: SigInFormData) => {
    onLogin(data.username, data.password);
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
      <h1>로그인</h1>
      <TextField
        className="textfield"
        name="username"
        placeholder="이름"
        color="secondary"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        inputRef={register({ required: true })}
        error={Boolean(errors.username)}
        helperText={errors.username && '이름을 입력해주세요!'}
      />
      <TextField
        className="textfield"
        name="password"
        placeholder="비밀번호"
        color="secondary"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
        type="password"
        variant="outlined"
        inputRef={register({ required: true })}
        error={Boolean(errors.password)}
        helperText={errors.password && '비밀번호를 입력해주세요!'}
      />
      <Button className="submit-button" type="submit">
        <h2>로그인</h2>
      </Button>
    </form>
  );
}

export default SignInForm;
