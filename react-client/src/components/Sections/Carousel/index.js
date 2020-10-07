import React from 'react';
import './index.scss';
import slideImg1 from '../../../assets/img/screen-1.jpg';
import slideImg2 from '../../../assets/img/screen-2.jpg';
import slideImg3 from '../../../assets/img/screen-3.jpg';
import slideImg4 from '../../../assets/img/screen-4.jpg';
import slideImg5 from '../../../assets/img/screen-5.jpg';
import slideImg6 from '../../../assets/img/screen-6.jpg';
import slideImg7 from '../../../assets/img/screen-7.jpg';
import arrowImg from '../../../assets/img/arrow.png';
import Slider from "react-slick";

const SampleNextArrow = (props) => {
  const { style, onClick } = props;
  return (
    <div
      className="control right"
      style={{ ...style}}
      onClick={onClick}
    >
      <img src={arrowImg} alt="arrow-next" />
    </div>
  );
}

const SamplePrevArrow = (props) => {
  const { style, onClick } = props;
  return (
    <div
      className="control"
      style={{ ...style}}
      onClick={onClick}
    >
      <img src={arrowImg} alt="arrow-prev"/>
    </div>
  );
}

const Carousel = () => {

  const sliderSettings = {
    dots: false,
    infinite: true,
    draggable: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '12px',
    variableWidth: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  }
  
  return (
    <section className="carousel" id="about-us">
      <div className="container">
        <h2 className="carousel__title">Nuestros miembros</h2>
      </div>
      <Slider className="carousel__wrapper" {...sliderSettings}>
        <img className="carousel__img" src={slideImg1} alt="screen1"/>
        <img className="carousel__img" src={slideImg2} alt="screen2"/>
        <img className="carousel__img" src={slideImg3} alt="screen3"/>
        <img className="carousel__img" src={slideImg4} alt="screen4"/>
        <img className="carousel__img" src={slideImg5} alt="screen5"/>
        <img className="carousel__img" src={slideImg6} alt="screen6"/>
        <img className="carousel__img" src={slideImg7} alt="screen7"/>
      </Slider>
    </section>
  )
}

export default Carousel;