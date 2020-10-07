import React, { useState, useEffect, useContext } from 'react';
import { registerUser } from '../../api/api';
import { sendEmailWithUsersInfo } from '../../api/api';
import handleServerError from '../../utils/handleServerError';
import './index.scss';
import { UserContext } from '../../context/userContext';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useForm } from 'react-hook-form';

const ErrorMessage = ({ error, setIsSubmitted, setSubmitError }) => {
  return (
    <div className="error">
      <div className="error__header">
        <h2 className="error__title">Error!</h2>
      </div>
      <div className="error__message">{error} <span className="info-link" onClick={() =>{  setIsSubmitted(false)
      setSubmitError()
      }}>try again</span>.</div>
    </div>
  )
}

const SuccessMessage = () => {
  return (
    <div className="success">
      <div className="success__header">
        <h2 className="success__title">Success!</h2>
      </div>
      <div className="success__message">You have been successfully registrated. Your login and password has been sent to your email. Keep it safe!</div>
    </div>
  )
}

const MessageAlert = ({error, setIsSubmitted, setSubmitError}) => {
 if (error && error.status === 400) {
   return <ErrorMessage  error={handleServerError(error)} setIsSubmitted={setIsSubmitted} setSubmitError={setSubmitError} />
 } else {
  return <SuccessMessage />
 }
}

const RegisterPage = () => {

  const { register, handleSubmit, watch, errors } = useForm();

  const { saveUser, isAuth } = useContext(UserContext);

  let history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [submitError, setSubmitError] = useState();

  useEffect(() => {
    if (isAuth === true) {
      history.push('/')
    }
  }, [])

  const onSubmit = ({ email, password, confirmPassword }) => {
    setIsLoading(true);
    registerUser(email, email, password, confirmPassword)
    .then(res => {
      setIsLoading(false);
      setIsSubmitted(true);
      saveUser(email, email, res.data.user.payToken, true);
      sendEmailWithUsersInfo(email, email, password);
    })
    .catch(error => {
      setIsLoading(false);
      setIsSubmitted(true);
      setSubmitError(error);
    })
  };

  return (
    <div className="register">
      <div className="container">
        {!isSubmitted ? 
        (
          <>
            <h2 className="register__title">Create new account</h2>
            <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="Email">Email</label>
              <input 
                type="email"
                name="email"
                ref={
                  register({
                    required: 'Please, fill this field.',
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Invalid email address"
                    }
                  })
                }
              />
              {errors.email && <p className="alert-message">{errors.email.message}</p>}
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                ref={
                  register({
                    required: 'Please. fill this field.'
                  })
                }
              />
              {errors.password && <p className="alert-message">{errors.password.message}</p>}
              <label htmlFor="confirmPassword">Confirm password</label>
              <input 
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                ref={
                  register({
                    required: 'Please, fill this field.',
                    validate: {
                      value: (value) => value === watch('password') || "Passwords dont match"
                    }
                  })  
                }
              />
              {errors.confirmPassword && <p className="alert-message">{errors.confirmPassword.message}</p>}
              <div className="form__controls">
                {isLoading ? <LoadingSpinner isLoading={isLoading} /> : <input type="submit" value="Create account" />}
              </div> 
            </form >
          </>
      ) :
      (
        <MessageAlert error={submitError} setIsSubmitted={setIsSubmitted} setSubmitError={setSubmitError} />
      )
      }
      </div>
    </div>
  )
}

export default RegisterPage;