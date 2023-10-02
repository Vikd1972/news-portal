import React from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AxiosError } from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { signIn } from '../../api/userApi';
import { setUser } from '../../store/newsPortalSlice';
import { useAppDispatch } from '../../store/hooks';
import config from '../../utils/constant';
import showToast from '../../validation/showToast';
import signInValidation from '../../validation/signInValidation';

import LoginWrapper from './Login.styles';

type ValuesType = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    } as ValuesType,
    validationSchema: signInValidation,
    onSubmit: async (values) => {
      try {
        const result = await signIn(values);
        dispatch(setUser(result.user));

        navigate(config.localPath.news);
      } catch (err) {
        if (err instanceof AxiosError) {
          showToast(err.response?.data.message);
        }
      }
    },
  });

  return (
    <LoginWrapper>
      <div className="login">
        <div className="login__name">
          <div>Log In /</div>
          <Link
            className="login__name-toggle"
            to="/sign-up"
          >
            Sign Up
          </Link>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="login__form"
        >
          <div className="task-item">
            <p>Email:</p>
            <TextField
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
              placeholder="Email"
              fullWidth
            />
          </div>

          <div className="task-item">
            <p>Password:</p>
            <TextField
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
              placeholder="Password"
              fullWidth
            />
          </div>

          <Button
            type="submit"
            className="button-item"
            variant="outlined"
          >
            Sign In
          </Button>
        </form>
      </div>
      <ToastContainer
        className="toast"
        bodyClassName="toast-body"
      />
    </LoginWrapper>
  );
};

export default Login;
