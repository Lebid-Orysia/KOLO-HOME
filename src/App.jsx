import React, { useEffect } from 'react';
import { Outlet } from "react-router-dom"; 
import useCartStore from './store/useCartStore';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';

export default function App() {
  const isCartOpen = useCartStore((state) => state.isCartOpen);

  // Блокуємо скрол сторінки, якщо кошик відкритий
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  return (
    <div className="page-wrapper">
      <Header />
      

      <main>
        <Outlet />
      </main>

      <CartSidebar />
    </div>
  );
}