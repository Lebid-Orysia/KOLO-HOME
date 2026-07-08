import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 

export default function CategoryProducts() {
  const { categoryName } = useParams();
  const [productsData, setProductsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const origin = window.location.origin;
    const baseUrl = import.meta.env.BASE_URL;
    const cleanBase = baseUrl.startsWith('/') ? baseUrl : `/${baseUrl}`;
    const targetUrl = `${origin}${cleanBase}mocks/products.json`.replace(/([^:]\/)\/+/g, "$1");

    fetch(targetUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Не вдалося завантажити товари');
        }
        return res.json();
      })
      .then((data) => {
        setProductsData(data); 
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const categoryItems = productsData ? productsData[categoryName] : null;

  if (!categoryItems || categoryItems.length === 0) {
    return (
      <div className="no-products">
        <p>There are no products in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="catalog__grid">
      {categoryItems.map((product) => (
        <Link 
          to={`${product.id}`}
          className="card" 
          key={product.id}
        >
          <div className="card__image">
            <img src={`${import.meta.env.BASE_URL}assets/images${product.img}`} alt={product.title} />
          </div>
          <div className="card__content">
            <h3>{product.title}</h3>
            <p className="card__desc">{product.desc}</p> 
            <p className="card__price">{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}