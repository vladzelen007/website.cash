import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import headerLogo from '../../assets/img/bruno-logo.png';
import navLogo from '../../assets/img/bruno-logo-dark.png';
import visa from '../../assets/img/visa.png';
import maestro from '../../assets/img/maestro.png';
import masterCard from '../../assets/img/masterCard.png';
import {ReactComponent as MenuIcon} from '../../assets/svg/menu-icon.svg';
import {ReactComponent as CrossIcon} from '../../assets/svg/cross-icon.svg';
import {ReactComponent as InstagramIcon} from '../../assets/svg/instagram-icon.svg';
import {ReactComponent as TelegramIcon} from '../../assets/svg/telegram-icon.svg';
import {ReactComponent as WhatsAppIcon} from '../../assets/svg/whatsapp-icon2.svg';
import './index.scss';
import { HashLink } from 'react-router-hash-link';
import AuthModal from '../AuthModal';
import useModal from '../../hooks/useModal';
import { UserContext }  from '../../context/userContext';
import Spinner from '../Spinner';

const Nav = () => {

  let location = useLocation();

  const { username } = useContext(UserContext);

  const [isShowing, toggle] = useModal();

  const [isOpen, setIsOpen] = useState(false);

  const handleOutsideClick = () => {
    setIsOpen(false)
  }
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const closeModal = () => {
    setIsOpen(false)
  }


  useEffect(() => {

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '17px';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
    }

  }, [isOpen, location])

  if (location.pathname === '/profile') {
    return null
  }

  return (
    <>
      <div className={isOpen ? "overlay show": "overlay"} onClick={handleOutsideClick}></div>
      <AuthModal isShowing={isShowing} hide={toggle} />
        <div className="container wrapper">
          <header className="header">
            <div className="header__logo">
              <Link to="/">
                <img src={headerLogo} alt="logo"/>
              </Link>
            </div>
            <div className="header__menu-icon">
            <MenuIcon onClick={toggleMenu} />
            </div>
            <nav className={isOpen ? 'header__nav nav show' : 'heaver__nav nav hide'}>
              <ul className="nav__list">
                <li className="nav__item desktop">
                <HashLink to="/#subscribe" onClick={closeModal}>
                  Suscripción
                </HashLink>
                </li>
                <li className="nav__item desktop">
                  <HashLink to="/#profit" onClick={closeModal}>Beneficio</HashLink>
                </li>
                <li className="nav__item desktop">
                  <HashLink to="/#about-us" onClick={closeModal}>Opiniones</HashLink>
                </li>
                <li className="nav__item">
                  <Link to="/terms" onClick={closeModal}>Terms</Link>
                </li>
                <li className="nav__item">
                  <Link to="/privacy" onClick={closeModal}>Privacy policy</Link>
                </li>
                <li className="nav__item">
                  <Link to="/payment-info" onClick={toggleMenu}>Payment methods</Link>
                </li>
                <li className="nav__item nav__item--last">
                  <HashLink to="/#footer" onClick={toggleMenu}>Contactanos</HashLink>
                </li>
                <li className="nav__cards">
                  <div className="nav__cards-item">
                    <img src={visa} alt="visa-logo"/>
                  </div>
                  <div className="nav__cards-item">
                    <img src={maestro} alt="maestro-logo"/>
                  </div>
                  <div className="nav__cards-item">
                    <img src={masterCard} alt="masterCard-logo"/>
                  </div>
                </li>
                <li className="nav__logo">
                  <Link className="nav__logo-link" to="/">
                    <img src={navLogo} alt="logo"/>
                  </Link>
                </li>
                <li className="nav__social">
                  <a href="https://t.me/joinchat/AAAAAE_SJsbZ6aAjqo_BQQ">
                    <TelegramIcon />
                  </a>
                  <a href="https://dspro.me/Lnxtj">
                    <WhatsAppIcon />
                  </a>
                </li>
                <li className="nav__control">
                  { username ? 
                    <Link className="nav__control-btn btn btn--yellow btn--enter" to="/profile">Profile</Link> :
                    <button className="nav__control-btn btn btn--yellow btn--enter" onClick={toggle}>Entrar</button>
                   }
                  <CrossIcon className="nav__control-icon" onClick={toggleMenu} />
                </li>
              </ul>
            </nav>
          </header>
        </div>
    </>
  )
}

export default Nav;