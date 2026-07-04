import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (

    <footer className="footer">
      <div className="container footer__container">

        {/* ЛІВА ЧАСТИНА*/}
        <div className="footer__left-map">
          <Link to="/contacts" className="footer__map-link" title="Open full map">
            <img
              src="/KOLO-HOME/map-screenshot.webp"
              alt="Map location static look"
              className="footer__map-img"
            />
          </Link>
        </div>

        {/* ПРАВА ЧАСТИНА */}
        <div className="footer__right-info">
          <div className="footer__contacts">
            <h3>Contacts</h3>
            <p>Email: <a href="mailto:info@kolohome.com">info@kolohome.com</a></p>
            <p>Phone: <a href="tel:+380123456789">+38 012 345 6789</a></p>
            <p>Address: Ploshcha Rynok, Lviv, Ukraine</p>
          </div>

          <div className="footer__socials">
            <h3>Social media</h3>
            <ul className="footer__socials-list">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <svg
                    className="instagram"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 50 50"
                    aria-hidden="true"
                  >
                    <g fill="none" stroke="#000" strokeWidth="2">
                      <rect x="1" y="1" width="48" height="48" rx="8" ry="8" />
                      <circle cx="25" cy="25" r="10" />
                      <circle cx="35" cy="15" r="2" />
                    </g>
                  </svg>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <svg
                    className="facebook"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 50 50"
                    aria-hidden="true"
                  >
                    <g fill="none" stroke="#000" strokeWidth="2">
                      <rect x="1" y="1" width="48" height="48" rx="8" ry="8" />
                      <path d="M32 15h-4c-1 0-1 1-1 1v4h5l-1 5h-4v12h-5V25h-4v-5h4v-3c0-2 1-4 4-4h3v5z" />
                    </g>
                  </svg>
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <svg
                    className="pinterest"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 50 50"
                    aria-hidden="true"
                  >
                    <g fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="1" width="48" height="48" rx="8" ry="8" />
                      <path d="M25 12C16 12 12 18 12 24c0 5 3 7 6 7 1 0 2-1 2-2l1-4c0-2 2-5 5-5 4 0 6 3 6 7 0 6-3 11-7 11-3 0-4-3-3-5l-3 12" />
                    </g>
                  </svg>
                  <span>Pinterest</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>

      <div className="footer__copyright">
        <p>© {new Date().getFullYear()} KOLO HOME. All rights reserved.</p>
      </div>
    </footer>
  );
}