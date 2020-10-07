import React, { useState } from 'react';
import {ReactComponent as ArrowIcon} from '../../assets/svg/scrolltoparrow-icon.svg';
import './index.scss';

const ScrollTopArrow = () => {

  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  window.addEventListener('scroll', checkScrollTop)

  return (
    <ArrowIcon className="scrollTop" onClick={scrollTop} style={{height: 40, display: showScroll ? 'flex' : 'none'}} />  
  );

}

export default ScrollTopArrow;