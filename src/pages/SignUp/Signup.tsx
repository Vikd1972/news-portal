import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ToastContainer } from 'react-toastify';
import { AxiosError } from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { signUp } from '../../api/userApi';
import { setCurrentUser } from '../../store/newsPortalSlice';
import { useAppDispatch } from '../../store/hooks';
import config from '../../utils/constant';
import showToast from '../../validation/showToast';
import signUpValidation from '../../validation/signUpValidation';

import SignUpWrapper from './Signup.styles';

type ValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    } as ValuesType,
    validationSchema: signUpValidation,
    onSubmit: async (values) => {
      try {
        if (values.password !== values.confirmPassword) {
          showToast('Passwords do not match');
          return;
        }
        const data = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        };
        const result = await signUp(data);
        dispatch(setCurrentUser(result.user));

        navigate(config.localPath.news);
      } catch (err) {
        if (err instanceof AxiosError) {
          showToast(err.response?.data.message);
        }
      }
    },
  });

  return (
    <SignUpWrapper>
      <div className="login">
        <div className="login__name">
          <div>Sign Up /</div>
          <Link
            className="login__name-toggle"
            to="/sign-in"
          >
            Sign In
          </Link>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="login__form"
        >
          <div className="task-item">
            <p>First Name:</p>
            <TextField
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              margin="normal"
              placeholder="First Name"
              fullWidth
            />
          </div>

          <div className="task-item">
            <p>Last Name:</p>
            <TextField
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              margin="normal"
              placeholder="Last Name"
              fullWidth
            />
          </div>

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

          <div className="task-item">
            <p>Password:</p>
            <TextField
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              margin="normal"
              placeholder="Confirm Password"
              fullWidth
            />
          </div>

          <Button
            type="submit"
            className="button-item"
            variant="outlined"
          >
            Sign Up
          </Button>
        </form>
      </div>
      <ToastContainer
        className="toast"
        bodyClassName="toast-body"
      />
    </SignUpWrapper>
  );
};

export default Signup;
