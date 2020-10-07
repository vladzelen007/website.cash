import React, { useState, useEffect, useRef, useContext } from 'react';
import './index.scss';
import {ReactComponent as WreathSvgImg} from '../../../assets/svg/wreath.svg';
import {ReactComponent as WreathGoldenSvgImg} from '../../../assets/svg/wreath-golden.svg';
import FlipDown from 'flipdown/dist/flipdown.js';
import 'flipdown/dist/flipdown.min.css';
import { getPaymentUrls } from '../../../api/api';
import { UserContext } from '../../../context/userContext';
import PuffLoader from 'react-spinners/PuffLoader';

const Special = ({ toggleCreateAccountModal }) => { 
  var today = new Date();
  today.setHours(today.getHours() + 1);

  const { payToken, isAuth } = useContext(UserContext);

  const [paymentUrls, setPaymentUrls] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  const prevPaymentUrls = useRef();

  useEffect(() => {

    let countdown = new FlipDown(today.getTime()).start();
    
    let onbeforeunloadFn= () => {
      localStorage.setItem('userCountDownTime', Math.floor(countdown.epoch))  
    } 
    
    window.addEventListener('beforeunload', onbeforeunloadFn);

    return () => {
      window.removeEventListener('beforeunload', onbeforeunloadFn);
    } 

  }, [])

  useEffect(() => {
    if (payToken) {
      setIsLoading(true)
      getPaymentUrls(payToken).then(async res => {
        await setPaymentUrls(res.data)
        setIsLoading(false)
      })
    }
  }, [payToken])

  return (
    <section className="special" id="subscribe">
        <div className="special__wrapper">
          <div className="container">
            <h2 className="special__title">Solamente hoy</h2>
            <div className="special__content">
              <div className="special__item">
                <div className="special__item-content">
                  <WreathSvgImg />
                  <span className="special__item-day">7</span>
                  <span className="special__item-name">días</span>
                </div>
                <div className="special__item-price">
                  <span className="special__item-price-num">1</span>
                  <span className="special__item-price-char">€</span>
                </div>
                {isAuth ? <a href={paymentUrls[0]} className="btn btn--white">Seleccionar</a> : <button onClick={toggleCreateAccountModal} className="btn btn--white">Seleccionar</button>}
              </div>
              <div className="special__item">
                  <div className="special__item-alert">
                    <span className="special__item-alert-content">special offer</span>
                  </div>
                <div className="special__item-content">
                  <WreathGoldenSvgImg />
                  <span className="special__item-day">30</span>
                  <span className="special__item-name special__item-name--special">días</span>
                </div>
                <div className="special__item-price">
                  <span className="special__item-price-num">29.99</span>
                  <span className="special__item-price-char">€</span>
                </div>
                {isAuth ? <a href={paymentUrls[1]} className="btn btn--sm btn--yellow">comprar con descuento</a> : <button onClick={toggleCreateAccountModal} className="btn btn--sm btn--yellow">comprar con descuento</button>}
                <div className="countdown">
                  <div id="flipdown" className="flipdown"></div>
                </div>
              </div>
              <div className="special__item">
                <div className="special__item-content">
                  <WreathSvgImg />
                  <span className="special__item-day">3</span>
                  <span className="special__item-name">meses</span>
                </div>
                <div className="special__item-price">
                  <span className="special__item-price-num">49.99</span>
                  <span className="special__item-price-char">€</span>
                </div>
                {isAuth ? <a href={paymentUrls[2]} className="btn btn--white">Seleccionar</a> : <button onClick={toggleCreateAccountModal} className="btn btn--white">Seleccionar</button>}
              </div>
            </div>
          </div>
        </div>
      </section>
  )
} 

export default Special;