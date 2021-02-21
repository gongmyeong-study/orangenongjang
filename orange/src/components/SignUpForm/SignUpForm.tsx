import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
  Button, CircularProgress, InputAdornment, TextField,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import { signUp, signUpSetStateNull } from '../../store/actions/user/user';
import { OrangeGlobalState } from '../../store/state';
import './SignUpForm.scss';
import { userStatus } from '../../constants/constants';

interface SignUpFormData {
  email: string;
  username: string;
  password: string;
}

function SignUpForm() {
  const dispatch = useDispatch();

  const [isMailSended, setIsMailSended] = useState(false);

  const onSignUp = (email: string, username: string, password: string) => {
    setIsMailSended(true);
    dispatch(signUp(email, username, password));
    dispatch(signUpSetStateNull());
  };

  const {
    signupStatus,
  } = useSelector(
    (state: OrangeGlobalState) => state.user,
  );

  const {
    register, handleSubmit, errors,
  } = useForm<SignUpFormData>();

  const onSubmit = (data: SignUpFormData) => {
    onSignUp(data.email, data.username, data.password);
  };

  useEffect(() => {
    if (signupStatus === userStatus.SUCCESS
      || signupStatus === userStatus.FAILURE_EMAIL
      || signupStatus === userStatus.FAILURE_USERNAME
      || signupStatus === userStatus.FAILURE_AUTHENTICATION) {
      setIsMailSended(false);
    }
  }, [signupStatus]);

  return (
    <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="signup-spinner-box">
        <h1>회원가입&emsp;</h1>
        {isMailSended && <CircularProgress className="spinner" /> }
      </div>
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
