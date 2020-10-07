import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import { Link } from 'react-router-dom';
import { updateMe } from '../../api/api';
import { paymentCallback } from '../../api/api';
import { payeerCallback } from '../../api/api';
import { useLocation, } from 'react-router-dom';
import './index.scss';

const PaymentSuccessPage = () => {

  let location = useLocation();
  let query = location.search;
  let params = new URLSearchParams(query);

  const [state, setState] = useState({
    m_operation_id: params.get('m_operation_id'),
    m_operation_ps: params.get('m_operation_date'),
    m_operation_date: params.get('m_operation_date'),
    m_operation_pay_date: params.get('m_operation_pay_date'),
    m_shop: 'bruno.cash',
    m_orderid: params.get('m_orderid'),
    m_amount: params.get('m_amount'),
    m_curr: params.get('m_curr'),
    m_status: params.get('m_status')
  })

  useEffect(() => {
    payeerCallback(query)
    .then(res => {
      if (res.data.isPaymentSuccess === true) {
        updateMe({subscribed: true})
      }
    })
  })
  
  return (
    <div className="payment">
      <div className="container">
        <div className="payment__content">
          <h2 className="payment__title">Your payment successed!</h2>
          <p className="payment__desc">Payment details:</p>
          <ul className="payment__info">
            <li className="payment__item">
              <span>Operation id:</span>
              <span>{state.m_operation_id}</span>
            </li>
            <li className="payment__item">
              <span>Operation date:</span>
              <span>{state.m_operation_date}</span>
            </li>
            <li className="payment__item">
              <span>Order id:</span>
              <span>{state.m_orderid}</span>
            </li>
            <li className="payment__item">
              <span>Status</span>
              <span>{state.m_status}</span>
            </li>
            <div className="payment__line"></div>
            <li className="payment__item">
              <span>Summary:</span>
              <span>{state.m_amount} {state.m_curr}</span>
            </li>
          </ul>
          <div className="payment__bottom">
            <p className="payment__bottom-text">Now you are ready to start!</p>
            <span>Go to your <Link className="info-link" to="/profile">Profile</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessPage;