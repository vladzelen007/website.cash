import React, { useState, useEffect, useRef } from 'react';
import Cookie from 'js-cookie';
import './index.scss';


const CookiePolicy = () => {

  const [isOpen, setIsOpen] = useState(Cookie.get('token') || Cookie.get('cookie-policy') ? false : true)

  const closeCookie = () => {
    Cookie.set('cookie-policy', 'accepted')
    setIsOpen(false);
  }

  if (isOpen) {
    return (
      <div className="cookie-policy">
      <div className="cookie-policy__container">
        <div className="cookie-policy__content">
          <h3 className="cookie-policy__title">Cookie Policy</h3>
          <p className="cookie-policy__text">This website uses cookies. By continuing to use this site, you accept our use of cookies. We only use cookies to improve your navigation around our site. We do not share or sell any of this data with other parties.</p>
        </div>
        <button className="cookie-policy__btn" onClick={closeCookie}>accept and close</button>
      </div>
    </div>
    )
  } else {
    return null
  }

}

export default CookiePolicy