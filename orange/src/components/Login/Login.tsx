import React from 'react';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './Login.css';

interface Props {
  onLogin: (username: string, password: string) => any;
}

interface LoginFormData {
  username: string;
  password: string;
}

function Login(props: Props) {
  const history = useHistory();

  const {
    register, handleSubmit, errors,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await props.onLogin(data.username, data.password);
      history.push('/house');
    } catch (error) {
      console.error(error);
      window.location.reload();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="username"
          placeholder="이름"
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
          name="password"
          placeholder="비밀번호"
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
        <Button type="submit">로그인</Button>
      </form>
    </>
  );
}

export default Login;
