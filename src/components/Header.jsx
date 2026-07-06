import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore'; 
import ModalFeedback from './ModalFeedback'; 
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const totalItems = useCartStore((state) => state.getTotalItems());

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const openContactModal = () => {
    setIsModalOpen(true);
    closeMenu();
  };

  return (
    <>
      <header className="header">
        <div className="container header__container">
          <Link to='' className="logo" onClick={closeMenu}>
            <img src={`${import.meta.env.BASE_URL}assets/images/kolo-home-logo.svg`} alt="KOLO HOME Logo" />
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
              onClick={openContactModal}
              className="header__contact-btn"
              type="button"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              title="Contact us"
            >
              <svg fill="#000000" width="35px" height="35px" viewBox="0 0 64 64" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="_x32_5_attachment" />
                <g id="_x32_4_office" />
                <g id="_x32_3_pin" />
                <g id="_x32_2_business_card" />
                <g id="_x32_1_form" />
                <g id="_x32_0_headset" />
                <g id="_x31_9_video_call" />
                <g id="_x31_8_letter_box" />
                <g id="_x31_7_papperplane">
                  <g>
                    <g>
                      <path d="M62.9891,2.5618c-0.0765-0.5779-0.6611-0.9805-1.2299-0.8401L7.4043,15.2065c-0.3535,0.0879-0.6318,0.3608-0.7256,0.7129     s0.0112,0.7275,0.2744,0.9795l13.9343,13.3583l-2.7649,17.1495c-0.1079,0.6712,0.4969,1.2576,1.1582,1.1445l18.0805-3.1324     l17.1832,9.6988c0.1523,0.0859,0.3218,0.1289,0.4917,0.1289c0.1523,0,0.3047-0.0347,0.4453-0.1045     c0.2969-0.1475,0.5015-0.4331,0.5459-0.7617l6.9639-51.5542C63.0031,2.7372,63.0007,2.6487,62.9891,2.5618z M9.647,16.7109     L56.8914,4.9902L22.2545,28.7978L9.647,16.7109z M36.9146,43.4663l-16.5942,2.875l2.4995-15.5054L58.8633,6.0615L36.9146,43.4663     z M54.2427,52.6504l-15.3231-8.6492l21.4231-36.509L54.2427,52.6504z" />
                      <path d="M14.4438,51.6099l-4.6948,5.209c-0.3701,0.4102-0.3369,1.0425,0.0732,1.4121c0.1909,0.1724,0.4307,0.2573,0.6689,0.2573     c0.2734,0,0.5459-0.1113,0.7432-0.3306l4.6948-5.209c0.3701-0.4102,0.3369-1.0425-0.0732-1.4121     C15.4463,51.1675,14.8135,51.2002,14.4438,51.6099z" />
                      <path d="M5.9478,29.0562l-4.6909,5.2085c-0.3696,0.4106-0.3364,1.043,0.0742,1.4126c0.1909,0.1719,0.4302,0.2568,0.6685,0.2568     c0.2739,0,0.5459-0.1113,0.7437-0.3311l4.6909-5.2085c0.3696-0.4106,0.3364-1.043-0.0742-1.4126     C6.9487,28.6128,6.3179,28.6455,5.9478,29.0562z" />
                      <path d="M40.8164,55.4331l-4.6909,5.2051c-0.3701,0.4102-0.3369,1.0425,0.0732,1.4121c0.1909,0.1724,0.4307,0.2573,0.6689,0.2573     c0.2734,0,0.5459-0.1113,0.7432-0.3306l4.6909-5.2051c0.3701-0.4102,0.3369-1.0425-0.0732-1.4121     C41.8188,54.9907,41.186,55.0234,40.8164,55.4331z" />
                    </g>
                  </g>
                </g>
                <g id="_x31_6_laptop" />
                <g id="_x31_5_connection" />
                <g id="_x31_4_phonebook" />
                <g id="_x31_3_classic_telephone" />
                <g id="_x31_2_sending_mail" />
                <g id="_x31_1_man_talking" />
                <g id="_x31_0_date" />
                <g id="_x30_9_review" />
                <g id="_x30_8_email" />
                <g id="_x30_7_information" />
                <g id="_x30_6_phone_talking" />
                <g id="_x30_5_women_talking" />
                <g id="_x30_4_calling" />
                <g id="_x30_3_women" />
                <g id="_x30_2_writing" />
                <g id="_x30_1_chatting" />
              </svg>
            </button>

            {/* Іконка Кошика */}
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
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>

            {/* Бургер */}
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
      {isModalOpen && <ModalFeedback onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Header;