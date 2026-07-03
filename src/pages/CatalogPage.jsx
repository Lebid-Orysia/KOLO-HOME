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
                <NavLink to="/catalog/wreaths" className="shop-catalog__item">
                  Wreaths
                </NavLink>
              </li>
              <li>
                <NavLink to="/catalog/wreathsCollected" className="shop-catalog__item">
                  Ready wreaths
                </NavLink>
              </li>
              <li>
                <NavLink to="/catalog/branches" className="shop-catalog__item">
                  Branches
                </NavLink>
              </li>
              <li>
                <NavLink to="/catalog/driedFlowers" className="shop-catalog__item">
                  Dried flowers
                </NavLink>
              </li>
              <li>
                <NavLink to="/catalog/flowersHeads" className="shop-catalog__item">
                  Flower heads
                </NavLink>
              </li>
              <li>
                <NavLink to="/catalog/butterflies" className="shop-catalog__item">
                  Butterflies clips
                </NavLink>
              </li>
              <li>
                <NavLink to="/catalog/ribbons" className="shop-catalog__item">
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