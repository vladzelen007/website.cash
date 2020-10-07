import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { resetPassword } from '../../api/api';
import './index.scss';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../../components/LoadingSpinner';
import handleServerError from '../../utils/handleServerError';

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
      <div className="success__message">Your new password has been successfully accepted.</div>
    </div>
  )
}

const MessageAlert = ({error, setIsSubmitted, setSubmitError}) => {
  if (error) {
    console.log(error)
  }
 if (error && error.status === 400) {
   return <ErrorMessage  error={handleServerError(error)} setIsSubmitted={setIsSubmitted} setSubmitError={setSubmitError} />
 } else {
  return <SuccessMessage />
 }
}
 
const ResetPasswordPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');
  
  const { register, handleSubmit, watch, errors } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [submitError, setSubmitError] = useState();

  const onSubmit = ({ password, confirmPassword, }) => {
    setIsLoading(true);
    resetPassword(code, password, confirmPassword)
    .then(res => {
      setIsLoading(false);
      setIsSubmitted(true);
    })
    .catch(error => {
      console.log(error)
      setIsLoading(false);
      setIsSubmitted(true);
      setSubmitError(error);
    })
  }

  return ( 
    <div className="reset-password">
      <div className="container">
        {!isSubmitted ?
        (
        <>
          <h2 className="reset-password__title">Enter new password</h2>
            <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="password">New password</label>
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
              <label htmlFor="confirmPassword">Confirm new password</label>
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
              {isLoading ? <LoadingSpinner isLoading={isLoading} /> : <input type="submit" value="Set new password" />} 
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

export default ResetPasswordPage;