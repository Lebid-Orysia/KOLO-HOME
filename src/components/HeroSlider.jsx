import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import './HeroSlider.scss';

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const origin = window.location.origin;
    const baseUrl = import.meta.env.BASE_URL;
    const cleanBase = baseUrl.startsWith('/') ? baseUrl : `/${baseUrl}`;
    const targetUrl = `${origin}${cleanBase}mocks/slider.json`.replace(/([^:]\/)\/+/g, "$1");

    fetch(targetUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load slides: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setSlides(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading || slides.length === 0) {
    return <section className="hero-slider-section" style={{ height: '600px', background: '#f5f5f5' }}></section>;
  }

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
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="hero-slide-bg"
              style={{ 
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${import.meta.env.BASE_URL}${slide.bgImage})` 
              }}
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