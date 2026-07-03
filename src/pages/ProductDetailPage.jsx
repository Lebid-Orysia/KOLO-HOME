import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import productsData from '../mocks/products.json';
import '../assets/scss/quantity.scss';
import useCartStore from '../store/useCartStore';
import Footer from '../components/Footer';

export default function ProductDetailPage() {
  const { categoryName, productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = useCartStore((state) => state.handleAddToCart);

  const categoryItems = productsData[categoryName];
  const product = categoryItems?.find(item => String(item.id) === String(productId));

  if (!product) {
    return (
      <div className="product-error">
        <h2>Product not found 😢</h2>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => {
      if (prev > 1) {
        return prev - 1;
      }
      return 1;
    });
  };

  const handleAddToCartClick = () => {
    handleAddToCart(product, quantity);
  };

  return (
    <>
      <div className="container">
        <div className="product-detail-container">
          <button className="btn-back" onClick={() => navigate(-1)}>
            ⬅ Back to catalog
          </button>
          <div className="product-detail">
            <div className="product-detail__image">
              <img src={`${import.meta.env.BASE_URL}${product.img}`} alt={product.title} />
            </div>
            <div className="product-detail__info">
              <span className="product-detail__category">{categoryName}</span>
              <h1 className="product-detail__title">{product.title}</h1>
              <p className="product-detail__price">{product.price}</p>


              <div className="quantity-selector">
                <span className="quantity-selector__label"></span>

                <div className="quantity-selector__controls">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}>
                    -
                  </button>
                  <span className="quantity-selector__value">{quantity}</span>

                  <button type="button" onClick={handleIncrement}>
                    +
                  </button>
                </div>
              </div>

              {/* ------------------------- */}
              <div className="product-detail__actions">
                <button className="btn-buy" type="button" onClick={handleAddToCartClick}>
                  Add to cart
                </button>
              </div>
              <div className="product-detail__description">
                <h3>Product description</h3>
                <p>{product.full_desc || product.desc}</p>
              </div>
              {product.features && (
                <div className="product-detail__specs">
                  <h3> Characteristics</h3>
                  <ul>
                    {product.features.map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}