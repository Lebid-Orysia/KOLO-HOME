import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import '../assets/scss/quantity.scss';
import useCartStore from '../store/useCartStore';
import Footer from '../components/Footer';

function ProductDetailPage() {
  const { categoryName, productId } = useParams(); 
  const navigate = useNavigate(); 
  const handleAddToCartStore = useCartStore((state) => state.handleAddToCart); 
  
  const [productsData, setProductsData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const origin = window.location.origin;
    const baseUrl = import.meta.env.BASE_URL;
    
    const cleanBase = baseUrl.startsWith('/') ? baseUrl : `/${baseUrl}`;
    const targetUrl = `${origin}${cleanBase}mocks/products.json`.replace(/([^:]\/)\/+/g, "$1");

    fetch(targetUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Network error while downloading the file');
        return res.json();
      })
      .then((data) => {
        setProductsData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Loading error:", err);
        setIsLoading(false);
      });
  }, []);

  const categoryItems = productsData && categoryName ? productsData[categoryName] : [];
  const product = categoryItems.find(p => p.id.toString() === productId?.toString());

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = (prod, qty) => {
    handleAddToCartStore(prod, qty); 
  };

  if (isLoading) {
    return <div className="product-loading">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="product-error">
        <h2>Product not found 😢</h2>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="product-detail-container">
          <button className="btn-back" onClick={() => navigate(-1)}>
            ⬅ Back to catalog
          </button>
          <div className="product-detail">
            <div className="product-detail__image">
              <img src={`${import.meta.env.BASE_URL}assets/images${product.img}`} alt={product.title} />
            </div>
            <div className="product-detail__info">
              <span className="product-detail__category" style={{ textTransform: 'capitalize' }}>
                {categoryName}
              </span>
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

              <div className="product-detail__actions">  
                <button className="btn-buy" type="button" onClick={() => handleAddToCart(product, quantity)}>
                  Add to cart
                </button>
              </div>
              <div className="product-detail__description">
                <h3>Product description</h3>
                <p>{product.full_desc || product.desc}</p>
              </div>
              {product.features && (
                <div className="product-detail__specs">
                  <h3>Characteristics</h3>
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

export default ProductDetailPage;