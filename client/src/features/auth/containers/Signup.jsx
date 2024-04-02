import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';

import {selectLoggedInUser, createUserAsync} from '../authSlice';
import {Link} from 'react-router-dom';
// import { Navigate } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  // console.log(errors);

  return (
    <div className="signup_ctr">
      <div>
        <h2>Create New Account</h2>
        <span className="new_user">
          Already a Member?{' '}
          <Link to="/login" className="login">
            Log In
          </Link>
        </span>
      </div>

      <form
        noValidate
        className="space-y-6"
        onSubmit={handleSubmit((data) => {
          dispatch(
            createUserAsync({
              userName: data.userName,
              email: data.email,
              password: data.password,
              addresses: [],
            }),
          );
          console.log(data);
        })}>
        <div>
          <div>
            <input
              placeholder="Your Name"
              id="userName"
              {...register('userName', {
                required: 'User Name is required',
              })}
              type="userName"
            />
          </div>
        </div>

        <div className="email_and_password">
          <div>
            <input
              placeholder="E-Mail"
              id="email"
              {...register('email', {
                required: 'email is required',
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: 'email not valid',
                },
              })}
              type="email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              placeholder="Phone"
              id="email"
              {...register('phone', {
                required: 'Phone number is required',
              })}
              type="number"
            />
          </div>
        </div>

        <div>
          <div>
            <input
              placeholder="Password"
              id="password"
              {...register('password', {
                required: 'password is required',
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                },
              })}
              type="password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div>
          <div>
            <input
              placeholder="Confirm Password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'confirm password is required',
                validate: (value, formValues) =>
                  value === formValues.password || 'password not matching',
              })}
              type="password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className="signup_ctr-btn">
          <button type="submit" className="signup_btn btn">
            Create Account
          </button>
        </div>
        <span>
          “You can sign up with a temporary account to continue. All products
          listed are dummy”
        </span>
      </form>
    </div>
  );
}
