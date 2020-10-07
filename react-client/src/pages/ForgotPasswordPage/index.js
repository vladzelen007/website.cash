import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './index.scss';
import { forgotPassword } from '../../api/api';
import handleServerError from '../../utils/handleServerError';
import LoadingSpinner from '../../components/LoadingSpinner';

const ErrorMessage = ({ error, setIsSubmitted }) => {
  return (
    <div className="error">
      <div className="error__header">
        <h2 className="error__title">Error!</h2>
      </div>
      <div className="error__message">{} <span className="info-link" onClick={() => setIsSubmitted(false)}>try again</span>.</div>
    </div>
  )
}

const SuccessMessage = () => {
  return (
    <div className="success">
      <div className="success__header">
        <h2 className="success__title">Success!</h2>
      </div>
      <div className="success__message">Check your email! Link to reset your password has been sent to your email.</div>
    </div>
  )
}

const MessageAlert = ({response, setIsSubmitted}) => {
 if (response && response.status === 400) {
   return <ErrorMessage  error={response} setIsSubmitted={setIsSubmitted} />
 } else {
  return <SuccessMessage />
 }
}


const ForgotPasswordPage = () => {

  const { register, handleSubmit, errors } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [submitError, setSubmitError] = useState();
  
  const onSubmit = ({email}) => {
    setIsLoading(true); 
    forgotPassword(email)
    .then(res => {
      setIsLoading(false);
      setIsSubmitted(true);
    })
    .catch(error => {
      setSubmitError(error);
      setIsLoading(false);
      setIsSubmitted(true);
    })
  };

  if(!isSubmitted) {
    return (
      <div className="forgot-password">
        <div className="container">
          <h2 className="forgot-password__title">Enter your email to restore your password</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input 
            type="email"
            name="email"
            id="email"
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
          <div className="form__controls">
            {isLoading ? <LoadingSpinner isLoading={isLoading} /> : <input type="submit" value="Restore password" />}
          </div>
        </form>
        </div>
      </div>
    )
  } else {
    return (
      <div className="forgot-password">
        <MessageAlert response={submitError} setIsSubmitted={setIsSubmitted} />
      </div>
    )
  }
}

export default ForgotPasswordPage;