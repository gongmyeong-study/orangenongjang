import React from 'react';
import { useDispatch } from 'react-redux';
import { TextField, InputAdornment, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useForm } from 'react-hook-form';
import { signUp } from '../../store/actions/user/user';
import './SignUpForm.scss';

interface SignUpFormData {
  email: string;
  username: string;
  password: string;
}

function SignUpForm() {
  const dispatch = useDispatch();

  const onSignUp = (email: string, username: string, password: string) => {
    dispatch(signUp(email, username, password));
  };

  const {
    register, handleSubmit, errors,
  } = useForm<SignUpFormData>();

  const onSubmit = (data: SignUpFormData) => {
    onSignUp(data.email, data.username, data.password);
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>회원가입</h1>
        <TextField
          className="textfield"
          name="email"
          placeholder="이메일"
          color="secondary"
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
              // eslint-disable-next-line no-useless-escape
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: '이메일 형식에 맞지 않습니다!',
            },
          })}
          error={Boolean(errors.email)}
          helperText={errors.email && errors.email.message}
        />
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
        <h2>인증 메일 전송</h2>
      </Button>
    </form>
  );
}

export default SignUpForm;
