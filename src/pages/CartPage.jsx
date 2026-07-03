import React from 'react';
import { Link } from 'react-router'; 
import useCartStore from '../store/useCartStore';

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const handleUpdateQuantity = useCartStore((state) => state.handleUpdateQuantity);
  const handleRemoveFromCart = useCartStore((state) => state.handleRemoveFromCart);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container">
        <h2>Your cart is empty 🛒</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/catalog" className="btn">
          Go to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Shopping Cart</h2>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <img src={item.img || '/src/assets/images/placeholder.jpg'} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>Price: {item.price} UAH</p>
                </div>
              </div>
              <div>
                <button 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
  
              <div>
                <span>{item.price * item.quantity} UAH</span>
                <button onClick={() => handleRemoveFromCart(item.id)} title="Remove item">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div>
            <span>Total:</span>
            <strong>{totalPrice} UAH</strong>
          </div>
          <button className="btn-checkout">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}