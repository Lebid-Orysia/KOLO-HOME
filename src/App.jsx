import { Outlet, Link } from "react-router-dom"; 
import React, { useState, useEffect } from 'react';
import useCartStore from './store/useCartStore';


export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {cart, isCartOpen, setIsCartOpen, handleUpdateQuantity, handleRemoveFromCart} = useCartStore();

  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

 
  useEffect(() => {
    if (isMenuOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen, isCartOpen]);


  return (
    <div className="page-wrapper">

      {/* HEADER */}
      <header className="header">
        <div className="container header__container">
          <Link to='' className="logo" onClick={closeMenu}>
            <img src={`${import.meta.env.BASE_URL}img/kolo-home-logo.svg`} alt="KOLO HOME Logo" />
          </Link>
          <nav className={`nav ${isMenuOpen ? 'nav--open' : ''}`}>
            <ul className="nav__list">
              <li><Link to='' onClick={closeMenu}>Home</Link></li>
              <li><Link to='catalog' onClick={closeMenu}>Catalog</Link></li>
              <li><Link to='about' onClick={closeMenu}>About</Link></li>
              <li><Link to='contacts' onClick={closeMenu}>Contacts</Link></li>
            </ul>
          </nav>

          <div className="header__icons">
            <button
              onClick={() => {
                setIsCartOpen(true);
                closeMenu();
              }}
              className="icon-cart"
              type="button"
              style={{ position: 'relative', display: 'inline-block', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <svg className="cart" xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 50 50">
                <g fill="none" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 18 L15 42 H35 L40 18 Z" />
                  <path d="M15 18 Q25 6 35 18" />
                  <line x1={16} y1={26} x2={34} y2={26} />
                  <line x1={16} y1={34} x2={34} y2={34} />
                  <line x1={20} y1={18} x2={20} y2={42} />
                  <line x1={28} y1={18} x2={28} y2={42} />
                </g>
              </svg>

              {totalItems > 0 && (
                <span className="cart-badge">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className={`burger ${isMenuOpen ? 'burger--active' : ''}`}
              onClick={toggleMenu}
              type="button"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      {/* --- МОДАЛЬНИЙ САЙДБАР КОШИКА --- */}
      {isCartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setIsCartOpen(false)}
        />
      )}
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
              const productImg = item.img || item.image;

              return (
                <div key={item.id} className="cart-sidebar__item">
                  <img
                    src={productImg ? `${import.meta.env.BASE_URL}${productImg}` : `${import.meta.env.BASE_URL}img/placeholder.jpg`}
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

        {/* Футер модалки з чекаутом */}
        {cart.length > 0 && (
          <div className="cart-sidebar__footer">
            <div className="cart-sidebar__summary-total">
              <span>Total:</span>
              <strong>{totalPrice} UAH</strong>
            </div>
            <button className="cart-sidebar__checkout-btn">
              Order Now
            </button>
          </div>
        )}
      </div>

    </div>
  );
}