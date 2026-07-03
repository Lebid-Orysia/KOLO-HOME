import React from 'react';
import HeroSlider from '../components/HeroSlider';
import PromoBlock from '../components/PromoBlock';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
        <HeroSlider />

        <div className="home-page">
          <PromoBlock
            image="/promo-block-img/1.webp"
            title="Ready-made designer wreaths"
            description="Exclusive decor for your home that creates a festive and cozy atmosphere at first sight. Choose your perfect wreath for your door or table."
            buttonText="View"
            linkTo="/catalog/wreathsCollected"
            imageLeft={true}
          />

          <PromoBlock
            image="/promo-block-img/4.webp"
            title="Elegant dried flowers"
            description="Beauty that doesn't fade over the years. Lavender, cotton, lagurus and stylish dried flowers for creating long-lasting and aesthetic interior bouquets."
            buttonText="View"
            linkTo="/catalog/driedFlowers"
            imageLeft={false}
          />

          <PromoBlock
            image="/promo-block-img/6.webp"
            title="Decorative branches"
            description="Fresh and artificial decorative branches, greenery and coniferous elements. Add volume, natural splendor and texture to your compositions."
            buttonText="View"
            linkTo="/catalog/branches"
            imageLeft={true}
          />

          <PromoBlock
            image="/promo-block-img/8.webp"
            title="Decorative butterflies"
            description="Lightweight, realistic butterflies on convenient clips and wire. A small detail that will bring any wreath or floral arrangement to life."
            buttonText="View"
            linkTo="/catalog/butterflies"
            imageLeft={false}
          />
        </div>

        <Footer/>
    </>
  );
}