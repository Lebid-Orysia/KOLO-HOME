import React from 'react';
import { Link } from 'react-router-dom'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import './HeroSlider.scss';

const slidesData = [
  {
    id: 1,
    text: 'Minimal wreaths for modern homes',
    bgImage: 'img/blue-bg.webp'
  },
  {
    id: 2,
    text: 'Handcrafted with love and nature',
    bgImage: 'img/orange-bg.webp'
  },
  {
    id: 3,
    text: 'Earthy aesthetics, woven by hand',
    bgImage: 'img/green-bg.webp'
  },
  {
    id: 4,
    text: 'Simple details for timeless interiors',
    bgImage: 'img/pastel-bg.webp'
  }
];

const HeroSlider = () => {
  return (
    <section className="hero-slider-section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={'fade'}
        speed={1300}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={false}
        className="hero-swiper"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="hero-slide-bg"
              style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${import.meta.env.BASE_URL}${slide.bgImage})` }}
            >
              <div className="container">
                <div className="hero__content">
                  <h1 className="hero__title">{slide.text}</h1>
                  <Link to="/catalog" className="btn">
                    Start shop
                  </Link>
                  
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;