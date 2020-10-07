import React from 'react';
import './index.scss';
import {ReactComponent as WhatsappIcon} from '../../../assets/svg/whatsapp-icon.svg';

const About = ({toggleCreateAccountModal}) => {
  return (
    <section className="about">
      <div className="container">
        <button className="about__btn btn btn--sm btn--yellow" onClick={toggleCreateAccountModal}>Empezar a ganar</button>
        <div className="whatsapp">
          <a className="widget btn btn--lg btn--yellow" href="https://dspro.me/Lnxtj">
            <div className="widget__icon">
              <WhatsappIcon />
            </div>
            <div className="widget__description">
              <div className="widget__description-title">whatsapp</div>
              <div className="widget__description-text">haga click para chatear</div>
          </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default About;