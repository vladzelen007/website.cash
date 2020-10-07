import React from 'react';
import './index.scss';
import welcomeImg from '../../../assets/img/one.png';
import {ReactComponent as ListIcon} from '../../../assets/svg/list-icon.svg';
import {ReactComponent as TvIcon} from '../../../assets/svg/tv-icon.svg';
import {ReactComponent as ClockIcon} from '../../../assets/svg/clock-icon.svg';
import {ReactComponent as WatchIcon} from '../../../assets/svg/watch-icon.svg';
import { FiCircle } from 'react-icons/fi';

const Welcome = ({ toggleCreateAccountModal }) => {

  return (
    <>
      <section className="welcome">
        <div className="welcome__wrapper">
          <div className="container">
            <div className="welcome__content">
              <div className="welcome__img" >
                <img src={welcomeImg} alt="one"></img>
              </div>
              <h2 className="welcome__title">En las apuestas deportivas</h2>
            </div>
            <ul className="welcome__advantages">
              <li className="welcome__advantages-item">
                <FiCircle />
                Apuestas seguras al 90%
              </li>
              <li className="welcome__advantages-item">
                <FiCircle />
                Análisis profesional
              </li>
              <li className="welcome__advantages-item">
                <FiCircle />
                Más de 5 años de experiencia en análisis deportivo
              </li>
            </ul>
            <button className="welcome__btn btn btn--lg btn--yellow" onClick={toggleCreateAccountModal}>Unirse a vip</button>
          </div> 
        </div>
        <div className="privilege" id="profit">
          <div className="privilege__wrapper">
          <div className="container">
            <h2 className="privilege__title">Nuestras ventajas</h2>
            <div className="privilege__moto">
              <span>¡Vuestras victorias son nuestras victorias también!</span>
            </div>
            <ul className="privilege__list">
              <li className="privilege__item">
                <div className="privilege__item-content">
                  <div className="privilege__item-icon">
                    <ListIcon />
                  </div>
                  <span className="privilege__item-text"><b>Mínimo 4 pronósticos al dia</b> cuota alta desde 1.6</span>
                </div>
              </li>
              <li className="privilege__item">
                <div className="privilege__item-content">
                  <div className="privilege__item-icon">
                    <TvIcon />
                  </div>
                  <span className="privilege__item-text"><b>Mínimo 4 pronósticos</b> en directo al día</span>
                </div>
              </li>
              <li className="privilege__item">
                <div className="privilege__item-content">
                  <div className="privilege__item-icon">
                    <ClockIcon />
                  </div>
                  <span className="privilege__item-text"><b>1 combinada</b><br/> con máxima seguridad</span>
                </div>
              </li>
              <li className="privilege__item">
                <div className="privilege__item-content">
                  <div className="privilege__item-icon">
                    <WatchIcon />
                  </div>
                  <span className="privilege__item-text">Mi asistencia personal en cualquier momento <b>24/7</b></span>
                </div>
              </li>
            </ul>
            <div className="privilege__btn">
              <button className="btn btn--lg btn--yellow" onClick={toggleCreateAccountModal}>Empezar a ganar</button>
            </div>
          </div>
          </div>
        </div> 
      </section>
    </>
  )
}

export default Welcome;