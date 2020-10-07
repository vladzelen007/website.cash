import React, { useState, useRef } from 'react';
import './index.scss';
import coinImg1 from '../../../assets/img/coin-1.png';
import coinImg2 from '../../../assets/img/coin-2.png';
import coinImg3 from '../../../assets/img/coin-3.png';

const Calculator = ({toggleCreateAccountModal}) => {

  const inputEl = useRef(null)

  const [calculator, setCalculator] = useState({
    day: 1125,
    week: 7875,
    month: 33750
  }) 

  const handleInput = (e) => {
    if (e.target.value.length > 4) {
      e.target.value = e.target.value.substr(0, 4)
    }
  }

  const handleOnFocus = (e) => {
    e.target.placeholder = 'Insertar cantidad'
  }

  const handleKeyDown = (e) => {
    if (e.key.keyCode === 69 ||
        e.key.keyCode === 189 ||
        e.key.keyCode === 107 ||
        e.key.keyCode === 109) {
          e.target.value = ""
      }
  }

  const handleCalculate = (e) => {
    let sum = inputEl.current.value * 2.25;
    setCalculator({
      day: sum.toFixed(),
      week: (sum * 7).toFixed(),
      month: (sum * 30).toFixed()
    })
  }


  return (
    <section className="count">
        <div className="count__wrapper">
          <div className="container">
            <h2 className="count__title">CALCULA TUS GANANCIAS</h2>
            <div className="count__content">
              <input className="count__content-input" type="number" name="count" max="9999" min="0" maxLength="4" placeholder="500" onChange={handleInput} onFocus={handleOnFocus} onKeyDown={handleKeyDown} ref={inputEl}/>
              <span className="count__content-currency">€</span>
              <button className="count__content-btn btn btn--white btn--sm" onClick={handleCalculate}>Calcula</button>
            </div>
            <ul className="count__profit profit">
              <li className="profit__item">
                <div className="profit__img">
                  <img src={coinImg1} alt="coin"/>
                </div>
                <div className="profit__details">
                  <div className="profit__details-days">1 día</div>
                  <hr className="profit__divider"/>
                  <div className="profit__details-value">{calculator.day}€</div>
                </div>
              </li>
              <li className="profit__item">
                <div className="profit__img">
                  <img src={coinImg2} alt="coins"/>
                </div>
                <div className="profit__details">
                  <div className="profit__details-days">7 días</div>
                  <hr className="profit__divider"/>
                  <div className="profit__details-value">{calculator.week}€</div>
                </div>
              </li>
              <li className="profit__item">
                <div className="profit__img">
                  <img src={coinImg3} alt="coins"/>
                </div>
                <div className="profit__details">
                  <div className="profit__details-days">30 días</div>
                  <hr className="profit__divider"/>
                  <div className="profit__details-value" id="monthCount">{calculator.month}€</div>
                </div>
              </li>
            </ul>
            <button className="count__btn btn btn--lg btn--yellow" onClick={toggleCreateAccountModal}>Empezar a ganar</button>
          </div>
        </div>
      </section>
  )
}

export default Calculator;