import React from 'react';
import './index.scss';

const PaymentFailPage = () => {
  return (
    <div className="payment">
      <div className="container">
        <div className="payment__content">
          <h2 className="payment__title">Payment Failed!</h2>
          <p className="payment__desc">Something went wrong and your payment didnt proceed.</p>
          <ul className="payment__info">
            <li className="payment__item">
              <p></p>
              <p></p>
            </li>
            <div className="payment__line"></div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailPage;