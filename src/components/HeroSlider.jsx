import React from 'react';
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
    bgImage: './src/assets/images/blue-bg.webp'
  },
  {
    id: 2,
    text: 'Handcrafted with love and nature',
    bgImage: './src/assets/images/orange-bg.webp'
  },
  {
    id: 3,
    text: 'Earthy aesthetics, woven by hand',
    bgImage: './src/assets/images/green-bg.webp'
  },
  {
    id: 4,
    text: 'Simple details for timeless interiors',
    bgImage: './src/assets/images/pastel-bg.webp'
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
          delay: 3000,
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
              style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${slide.bgImage})` }}
            >

              <div className="container">
                <div className="hero__content">
                  <p>{slide.text}</p>
                  <a href="/catalog" className="btn">
                    Start shop
                  </a>
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