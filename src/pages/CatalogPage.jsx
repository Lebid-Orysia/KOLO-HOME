import React from 'react';
import { NavLink, Outlet } from 'react-router';
import Footer from '../components/Footer';

export default function CatalogPage() {
  return (
    <>
      <div className="container">
        <div className="shop-catalog">
          {/* SIDEBAR */}
          <aside className="shop-catalog__sidebar">
            <div className="shop-catalog__title">Categories</div>
            <ul className="shop-catalog__list">
              <li>
                {/* Робимо шляхи відносними — прибираємо початковий слеш та /catalog, бо ми вже тут */}
                <NavLink to="wreaths" className="shop-catalog__item">
                  Wreaths
                </NavLink>
              </li>
              <li>
                <NavLink to="wreathsCollected" className="shop-catalog__item">
                  Ready wreaths
                </NavLink>
              </li>
              <li>
                <NavLink to="branches" className="shop-catalog__item">
                  Branches
                </NavLink>
              </li>
              <li>
                <NavLink to="driedFlowers" className="shop-catalog__item">
                  Dried flowers
                </NavLink>
              </li>
              <li>
                <li>
                <NavLink to="flowersHeads" className="shop-catalog__item">
                  Flower heads
                </NavLink>
              </li>
              </li>
              <li>
                <NavLink to="butterflies" className="shop-catalog__item">
                  Butterflies clips
                </NavLink>
              </li>
              <li>
                <NavLink to="ribbons" className="shop-catalog__item">
                  Ribbons
                </NavLink>
              </li>
            </ul>
          </aside>

          <div className="shop-catalog__content">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}