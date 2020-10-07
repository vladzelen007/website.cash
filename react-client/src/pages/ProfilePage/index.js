import React, { useState, useEffect, useContext } from 'react';
import './index.scss';
import Logo from '../../assets/img/bruno-logo.png';
import { Link } from 'react-router-dom';
import {ReactComponent as ProfileIcon} from '../../assets/svg/profile-icon.svg';
import {ReactComponent as ArrowIcon} from '../../assets/svg/arrow--small-icon.svg';
import Cookie from 'js-cookie';
import wa_icon from '../../assets/svg/whatsapp.svg';
import {ReactComponent as TgIcon} from '../../assets/svg/telegram-icon.svg';

import { UserContext }  from '../../context/userContext';
import Special from '../../components/Sections/Special';
import { isAuth, getSocialLinks } from  '../../api/api';

const SubscribeBtn = () => {
  return (
    <button className="btn btn--yellow">Subscribe</button>
  )
}

const Links = ({links}) => {
  return (
    <div className="links">
      <div className="links__content">
        <div className="links__title">Join us to get latests bets ....</div>
        <div className="links__btns">
          <a className="links-btn links-btn--blue" href={links.telegram}>
            <span className="links-btn__text">Join group</span>
            {/* <img className="links-btn__icon" src={tg_icon} alt="telegram-icon" /> */}
            <TgIcon />
          </a>
          <a className="links-btn links-btn--green" href={links.whatsapp}>
            <span className="links-btn__text">Join chat</span>
            <img className="links-btn__icon" src={wa_icon} alt="whatsapp-icon" />
          </a>
        </div>
      </div>
    </div>
  )
}

const ProfilePage = () => {

  const [links, setLinks] = useState();

  const { saveUser } = useContext(UserContext);

  const { username, email } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const logout = () => {
    Cookie.remove('token');
    saveUser(null, null)
  }

  useEffect(() => {
    getSocialLinks().then(res => {
      setLinks({
        telegram: res.data.telegram,
        whatsapp: res.data.whatsapp 
      })
    })
  }, [])

  return (
    <div className="profile">
        <div className="container">
          <header className="profile__header">
            <div className="profile__logo">
              <Link className="profile__logo-link" to="/">
                <img className="profile__logo-img" alt="profile-logo" src={Logo}></img> 
              </Link>
            </div>
            <div className="profile__menu">
              <div className={isOpen ? "profile__menu-wrapper active" : "profile__menu-wrapper"} >
                <button className="profile__menu-btn" onClick={toggleMenu}>
                  <ProfileIcon className="profile__menu-icon" />
                    <span className="profile__menu-user">{email}</span>
                  <ArrowIcon className="profile__menu-icon--arrow" />
                </button>
                <ul className="profile__menu-list">
                  <li className="profile__menu-item">
                    <Link className="profile__menu-link" to="/" onClick={logout}>Salir</Link>
                  </li>
                </ul>
              </div>
            </div>
          </header>
        <div className="profile__content">
          {links ? <Links links={links} /> : <Special />} 
        </div>
        </div>
    </div>
  )
}

export default ProfilePage;