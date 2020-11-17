import React from 'react';
import './SignUpModal.css';
import { useForm } from 'react-hook-form';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

interface Props {
  onSignUp: (email: string, username: string, password: string) => any; // for redux dispatch
}

interface SignUpFormData {
  email: string;
  username: string;
  password: string;
}

function SignUpModal(props: Props) {
  const {
    register, handleSubmit, errors,
  } = useForm<SignUpFormData>();

  const onSubmit = (data: SignUpFormData) => props.onSignUp(
    data.email, data.username, data.password,
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="email"
          placeholder="이메일"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          inputRef={register({
            required: { value: true, message: '이메일을 입력해주세요!' },
            pattern: {
              // eslint-disable-next-line
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: '이메일 형식에 맞지 않습니다!',
            },
          })}
          error={Boolean(errors.email)}
          helperText={errors.email && errors.email.message}
        />
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
        <Button type="submit">회원가입</Button>
      </form>
    </>
  );
}

export default SignUpModal;
