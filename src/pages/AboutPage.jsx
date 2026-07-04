import React, { useState } from 'react';
import Footer from '../components/Footer';

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <section id="about" className="about">
        <div className="container">
          <div className="about__header">
            <h2 className="about__title">About</h2>
            <p className="about__description">
              Welcome to our cozy world of everlasting botanical beauty! We specialize in creating
              handcrafted wreaths, selecting unique branches, and designing exquisite dried flower arrangements.
              Our mission is to bring the warmth of nature, captivating textures, and a touch of timeless
              elegance into your home decor.
            </p>
          </div>

          {/* Контейнер акордеону */}
          <div className="about__accordion">

            {/* Блок 1: Години роботи */}
            <div className={`about__item ${activeIndex === 0 ? 'about__item--active' : ''}`}>
              <button className="about__trigger" onClick={() => toggleAccordion(0)}>
                <span className="about__subtitle">🕒 Online Store Hours</span>
                <span className="about__icon"></span>
              </button>
              <div className="about__content">
                <div className="about__inner">
                  <p>
                    We are open <strong>Monday–Friday from 10 a.m. to 7 p.m.</strong><br />
                    Saturday and Sunday are our days off. <br />
                    <span className="about__note">
                      ⚡ Orders paid before 4 p.m. leave our warehouse the same day (except Monday).
                      Paid after 4 p.m.? We will ship them the next business day.
                      Monday orders are safely shipped on Tuesday.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Блок 2: Правила замовлення */}
            <div className={`about__item ${activeIndex === 1 ? 'about__item--active' : ''}`}>
              <button className="about__trigger" onClick={() => toggleAccordion(1)}>
                <span className="about__subtitle">📦 Ordering Rules</span>
                <span className="about__icon"></span>
              </button>
              <div className="about__content">
                <div className="about__inner">
                  <ul>
                    <li>Minimum order amount is <strong>500 UAH</strong>.</li>
                    <li>Orders <strong>over 1000 UAH</strong> are packed in premium bubble wrap and placed securely in a sturdy box.</li>
                    <li>Orders <strong>under 1000 UAH</strong> are pre-packed with care at our warehouse and safely boxed at the Nova Poshta branch (according to their tariffs).</li>
                    <li>When choosing a Nova Poshta branch, please select branches that accept up to 30 kg.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Блок 3: Доставка та комунікація */}
            <div className={`about__item ${activeIndex === 2 ? 'about__item--active' : ''}`}>
              <button className="about__trigger" onClick={() => toggleAccordion(2)}>
                <span className="about__subtitle">🌱 Delivery & Care</span>
                <span className="about__icon"></span>
              </button>
              <div className="about__content">
                <div className="about__inner">
                  <p>
                    When placing your order, please provide your <strong>Viber or Telegram</strong> phone number
                    so our manager can stay in touch.
                    Before shipping, <strong>we can send you a real photo of your finished wreaths or dried flower arrangements</strong> via messenger!
                    This allows you to look at the details, adjust your order, or replace items if necessary, ensuring you are 100% in love with your new botanical decor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Фонове відео з динамічним префіксом */}
        <div className="about__video-wrapper">
          <video
            src={`${import.meta.env.BASE_URL}about-video.mp4`} 
            autoPlay
            muted
            loop
            playsInline
            className="about__video"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      <Footer />
    </>
  );
}