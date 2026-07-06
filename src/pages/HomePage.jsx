import React, { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import PromoBlock from '../components/PromoBlock';
import Footer from '../components/Footer';

export default function HomePage() {
  const [promoData, setPromoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const origin = window.location.origin;
    const baseUrl = import.meta.env.BASE_URL;
    
    const cleanBase = baseUrl.startsWith('/') ? baseUrl : `/${baseUrl}`;
    const targetUrl = `${origin}${cleanBase}mocks/promo.json`.replace(/([^:]\/)\/+/g, "$1");

    fetch(targetUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Сервер повернув статус ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPromoData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <HeroSlider />

      <div className="home-page">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          promoData.map((block) => (
            <PromoBlock
              key={block.id}
              image={`${import.meta.env.BASE_URL}${block.image}`}
              title={block.title}
              description={block.description}
              buttonText={block.buttonText}
              linkTo={block.linkTo}
              imageLeft={block.imageLeft}
            />
          ))
        )}
      </div>

      <Footer />
    </>
  );
}