import React, {  useState, useRef, useContext } from 'react';
import './index.scss';
import { createPortal } from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../api/api'
import { UserContext } from '../../context/userContext';
import LoadingSpinner from '../LoadingSpinner';
import handleServerError from '../../utils/handleServerError';
import { useForm } from 'react-hook-form';

const ModalLogin = ({ isOpen, closeModal }) => {

  const { register,  handleSubmit, errors } = useForm();

  const history = useHistory();

  const { saveUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const [submitError, setSubmitError] = useState();

  const onSubmit = ({ email, password }) => {
    setIsLoading(true);
    login(email, password)
    .then(res=> {
      setIsLoading(false)
      if(res.status === 200) {
        closeModal();
        saveUser(
          res.data.user.username,
          res.data.user.email,
          res.data.user.payToken,
          true
        );
        history.push('/profile');
      }
    })
    .catch(error => {
      setIsLoading(false);
      setSubmitError(handleServerError(error));
    })
  }

  return (
    <div className={isOpen ? "login-modal opened" : "login-modal" }>
      <div className="modal__header">
        <h2 className="modal__title">Entrar</h2>
        <div className="modal__cross" onClick={closeModal}>
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
        <label htmlFor="password">Password</label>
        <input 
          type="password"
          name="password"
          id="password"
          ref={
            register({
              required: 'Please, fill this field.'
            })
          }
        />
        {errors.password && <p className="alert-message">{errors.password.message}</p>}
        {submitError && <p class="alert-message">{submitError}</p>}
        <div className="modal__form-controls">
          {isLoading ? <LoadingSpinner isLoading={isLoading} /> : <input type="submit" value="Entrar" />}
        </div>
        </form>
        <div className="modal__form-links">
          <Link to="/register" className="modal__form-link" onClick={closeModal}>Don`t have account yet?</Link> 
          <Link to="/forgot-password" className="modal__form-link" onClick={closeModal}>¿Olvidaste&nbsp;tu contraseña?</Link>
        </div>
    </div>
  )
}

const AuthModal = ({ isShowing, hide }) => {

  const modal = useRef();

  const handleOutsideClick = (e) => {
    if (modal.current && !modal.current.contains(e.target)) {
      hide();
    }
  }
  
  if (isShowing) {
    return createPortal(
    <div className="modal" ref={modal} onClick={handleOutsideClick}>
      <div className="modal__wrapper">
        <div className="modal__content">
          <ModalLogin isOpen={true} closeModal={hide}/>
        </div>
      </div>
    </div>, document.body
    )
  } else {
    return null;
  }
}

export default AuthModal;