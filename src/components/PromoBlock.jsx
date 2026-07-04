import React from 'react';
import { Link } from 'react-router-dom'; 

const PromoBlock = ({ image, title, description, buttonText, linkTo, imageLeft = true }) => {
  return (
    <section className={`promo-block ${imageLeft ? 'img-left' : 'img-right'}`}>
      <div className="promo-block__image-side">
        <img src={image} alt={title} />
      </div>
      <div className="promo-block__text-side">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={linkTo} className="promo-block__btn">
          {buttonText}
        </Link>
      </div>
    </section>
  );
};

export default PromoBlock;