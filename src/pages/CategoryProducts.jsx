import React from 'react';
import { useParams, Link } from 'react-router-dom'; 
import productsData from '../mocks/products.json'; 

export default function CategoryProducts() {
  const { categoryName } = useParams();
  const categoryItems = productsData[categoryName];

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
          // 🔥 2. Забираємо початковий сліш, щоб лінк став відносним і HashRouter не губився
          to={`${product.id}`}
          className="card" 
          key={product.id}
          style={{ textDecoration: 'none', color: 'inherit' }} 
        >
          <div className="card__image">
            <img src={`${import.meta.env.BASE_URL}${product.img}`} alt={product.title} />
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