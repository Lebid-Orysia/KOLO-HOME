import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Імпортуємо стилі Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import './HeroSlider.scss';

// Імпортуємо картинки напряму, щоб Vite коректно опрацював їх при збірці
import bgBlue from '../../assets/images/blue-bg.webp';
import bgOrange from '../../assets/images/orange-bg.webp';
import bgGreen from '../../assets/images/green-bg.webp';
import bgPastel from '../../assets/images/pastel-bg.webp';

// Оновлений масив із правильними посиланнями на змінні
const slidesData = [
  {
    id: 1,
    text: 'Minimal wreaths for modern homes',
    bgImage: bgBlue
  },
  {
    id: 2,
    text: 'Handcrafted with love and nature',
    bgImage: bgOrange
  },
  {
    id: 3,
    text: 'Earthy aesthetics, woven by hand',
    bgImage: bgGreen
  },
  {
    id: 4,
    text: 'Simple details for timeless interiors',
    bgImage: bgPastel
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
          delay: 4000, // 3000ms може здатися швидкуватим для читання + fade-ефекту в 1300ms. 4000ms зазвичай комфортніше
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
              style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${slide.bgImage})` }}
            >
              <div className="container">
                <div className="hero__content">
                  {/* h1 краще для головного екрану з точки зору SEO */}
                  <h1 className="hero__title">{slide.text}</h1>
                  <a href="/catalog" className="btn btn--primary">
                    Shop collection
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