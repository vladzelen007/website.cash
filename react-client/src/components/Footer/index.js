import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import logoImg from '../../assets/img/bruno-logo.png';
import visaImg from '../../assets/img/visa.png';
import maestroImg from '../../assets/img/maestro.png';
import masterCardImg from '../../assets/img/masterCard.png';
import {ReactComponent as MailIcon} from '../../assets/svg/mail-icon.svg';
import {ReactComponent as InstagramIcon} from '../../assets/svg/instagram-icon.svg';
import {ReactComponent as TelegramIcon} from '../../assets/svg/telegram-icon.svg';
import {ReactComponent as WhatsAppIcon} from '../../assets/svg/whatsapp-icon2.svg';
import { HashLink } from 'react-router-hash-link';

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer__wrapper">
        <div className="container">
          <div className="footer__content">
            <div className="footer__controls">
              <div className="footer__links">
                <ul className="footer__menu">
                  <li className="footer__menu-item">
                    <Link to="/privacy">Privacy policy</Link>  
                  </li>  
                  <li className="footer__menu-item">
                    <Link to="/terms">Terms</Link>  
                  </li>  
                  <li className="footer__menu-item">
                    <Link to="/payment-info">Payment methods</Link>  
                  </li>  
                  <li className="footer__menu-item">
                    <HashLink to="/#subscribe">Suscripción</HashLink>  
                  </li>  
                  <li className="footer__menu-item">
                    <HashLink to="/#profit">Beneficio</HashLink>  
                  </li>  
                  <li className="footer__menu-item">
                    <HashLink to="/#footer">Contactanos</HashLink>  
                  </li> 
                </ul>  
              </div>
              <div className="footer__info">
                <div className="footer__info-header">
                <div className="footer__social">
                  <a href="https://t.me/joinchat/AAAAAE_SJsbZ6aAjqo_BQQ">
                    <TelegramIcon />
                  </a>
                  <a href="https://dspro.me/Lnxtj">
                    <WhatsAppIcon />
                  </a>
                </div>
                  <ul className="footer__cards">
                    <li className="footer__cards-item"><img src={visaImg} alt="visa-logo"/></li> 
                    <li className="footer__cards-item"><img src={maestroImg} alt="maestro-logo" /></li> 
                    <li className="footer__cards-item"><img src={masterCardImg} alt="mastercard-logo" /></li> 
                  </ul>  
                  <div className="footer__address">
                    <div className="footer__address-email">
                      <MailIcon />
                      <a href="mailto:support@bruno.cash">support@bruno.cash</a>
                    </div>
                    <div className="footer__agent">
                      {/* <Link href="https://www.payeer.com" target="_blank" rel="noopener noreferrer">"Payeer"</Link> is our authorized payment agent */}
                    </div>
                  </div>
                </div>
                <div className="footer__additional">
                  <p className="additional-info">VENSON LTD<br />Stasinou 1, MITSI BUILDING 1, 1st Floor, Flat/Office 4, Plateia Eleftherias, 1060, Nicosia, Cyprus</p>  
                </div>
              </div>
            </div>
            <div className="footer__logo">
              <a className="footer__link" href="#ds">
                <img src={logoImg} alt="logo"></img>
              </a>
            </div>
          </div>
        </div>
      </div> 
    </footer>
  )
}

export default Footer;