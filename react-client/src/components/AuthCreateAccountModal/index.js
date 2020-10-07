import React, { useState, useRef, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import PuffLoader from 'react-spinners/PuffLoader';
import './index.scss';
import { registerUser } from '../../api/api';
import handleServerError from '../../utils/handleServerError';
import { UserContext } from '../../context/userContext.js';
import { sendEmailWithUsersInfo } from '../../api/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useForm } from 'react-hook-form';

let generator = require('generate-password');
 
let password = generator.generate({
    length: 10,
    numbers: true
});


const SuccessMessage = ({ closeModal }) => {
  return (
    <>
      <div className="modal__header">
        <h2 className="modal__title">Hooray!</h2>
        <div className="modal__cross" onClick={closeModal}>
          X
        </div>
      </div>
      <div className="success-message">Your account has been successfully created. Check your email for your login and password. Now you are ready to use your personal <Link className="info-link" to="/profile">profile</Link> and subscribe for.</div>
    </>
  )
}

const ErrorMessage = ({ error, closeModal }) => {
  return (
    <>
      <div className="modal__header">
        <h2 className="modal__title">Oops!</h2>
        <div className="modal__cross" onClick={closeModal}>
          X
        </div>
      </div>
      <div className="success-message">{error}</div>
    </>
  )
}

const AuthCreateAccountModal = ({ isShowing, toggle }) => {

  const { register, handleSubmit, errors } = useForm(); 

  const { saveUser } = useContext(UserContext);
   
  const modal = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false)

  const [submitError, setSubmitError] = useState();

  const onSubmit = ({email}, e) => {
    setIsLoading(true);
    setTimeout(() => {
      registerUser(email, email, password)
      .then(res => {
        setIsLoading(false);
        setIsSubmitted(true);
        saveUser(email, email, res.data.user.payToken, true);
        sendEmailWithUsersInfo(email, email, password);
      })
      .catch(error => {
        setIsLoading(false);
        setSubmitError(handleServerError(error));
        setTimeout(() => {
          e.target.reset();
          setSubmitError();
        }, 1000)
      })
    })
  }

  useEffect(() => {
    const handleEsc = event => {
      if (event.key === "Escape") {
        toggle();
      }
    };

    if (isShowing) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isShowing, toggle]);

  if (isShowing) {
    return createPortal(
      <div className="modal" ref={modal}>
      <div className="modal__wrapper">
        <div className="modal__content">
            {!isSubmitted ? 
            (<>
              <div className="modal__header">
                <h2 className="modal__title">Create Account</h2>
                <div className="modal__cross" onClick={toggle}>
                  X
                </div>
              </div>
                <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
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
                  {submitError && <p className="alert-message">{submitError}</p>}
                  <div className="modal__form-controls">
                    {isLoading ? <LoadingSpinner loading={isLoading} /> : <input type="submit" value="Create account" />}
                  </div>
                </form>
              </>
            ) :
             <SuccessMessage closeModal={toggle} />
            }
        </div>
      </div>
    </div>, document.body)
  } else {
    return null
  }
}

export default AuthCreateAccountModal;