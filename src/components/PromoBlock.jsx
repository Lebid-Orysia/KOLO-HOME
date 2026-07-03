import React from 'react';

const PromoBlock = ({ image, title, description, buttonText, linkTo, imageLeft = true }) => {
  return (
    <section className={`promo-block ${imageLeft ? 'img-left' : 'img-right'}`}>
      <div className="promo-block__image-side">
        <img src={image} alt={title} />
      </div>
      <div className="promo-block__text-side">
        <h2>{title}</h2>
        <p>{description}</p>
        
        <a href={linkTo} className="promo-block__btn">
          {buttonText}
        </a>
      </div>
    </section>
  );
};

export default PromoBlock;