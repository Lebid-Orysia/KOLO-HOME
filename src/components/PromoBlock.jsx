import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const PromoBlock = ({ image, title, description, buttonText, linkTo, imageLeft = true }) => {
  const blockRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (blockRef.current) {
      observer.observe(blockRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const combinedClasses = `promo-block ${imageLeft ? 'img-left' : 'img-right'} ${isVisible ? 'is-visible' : ''}`;

  return (
    <section ref={blockRef} className={combinedClasses}>
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