import React from 'react';
import useCartStore from '../store/useCartStore';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
  const { cart, isCartOpen, setIsCartOpen, handleUpdateQuantity, handleRemoveFromCart } = useCartStore();

  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  return (
    <>
      {/* Оверлей */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      )}

      {/* Сайбар кошика */}
      <div className={`cart-sidebar ${isCartOpen ? 'is-open' : ''}`}>
        <div className="cart-sidebar__header">
          <h2>Your Cart ({totalItems})</h2>
          <button onClick={() => setIsCartOpen(false)} className="cart-sidebar__close-btn">✕</button>
        </div>

        <div className="cart-sidebar__content">
          {cart.length === 0 ? (
            <div className="cart-sidebar__empty">
              <p>Your cart is empty 🛒</p>
              <button onClick={() => setIsCartOpen(false)} className="cart-sidebar__continue-btn">
                Continue shopping
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemPrice = Number(item.price || 0);
              const itemQuantity = Number(item.quantity || 0);
              const itemTotalRow = itemPrice * itemQuantity;
              const productImg = item.image || item.img;

              return (
                <div key={item.id} className="cart-sidebar__item">
                  <img
                    src={productImg || `${import.meta.env.BASE_URL}assets/images/placeholder.jpg`}
                    alt={item.title || item.name}
                    className="cart-sidebar__item-img"
                  />

                  <div className="cart-sidebar__item-info">
                    <h4>{item.title || item.name}</h4>
                    <p className="cart-sidebar__item-price">{itemPrice} UAH</p>

                    <div className="cart-sidebar__quantity-ctrl">
                      <button onClick={() => handleUpdateQuantity(item.id, itemQuantity - 1)}>-</button>
                      <span>{itemQuantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.id, itemQuantity + 1)}>+</button>
                    </div>
                  </div>

                  <div className="cart-sidebar__item-actions">
                    <button onClick={() => handleRemoveFromCart(item.id)} className="cart-sidebar__remove-btn">✕</button>
                    <div className="cart-sidebar__item-total">{itemTotalRow} UAH</div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-sidebar__footer">
            <div className="cart-sidebar__summary-total">
              <span>Total:</span>
              <strong>{totalPrice} UAH</strong>
            </div>
            <Link to="/KOLO-HOME/checkout" className="cart-sidebar__checkout-btn" onClick={() => setIsCartOpen(false)}>
              Order Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;