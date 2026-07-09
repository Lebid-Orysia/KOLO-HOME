import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import "../assets/scss/CheckoutPage.scss";
import Select from 'react-select';
import { InputMask } from '@react-input/mask';
import ModalSuccess from '../components/ModalSuccess';
const API_URL = import.meta.env.VITE_API_URL;

export default function CheckoutPage() {
  const { cart, handleUpdateQuantity, handleRemoveFromCart, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', city: '', deliveryType: 'branch', address: '', payment: 'card'
  });
  const [cities, setCities] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const handleInputChange = (e) => {
    const name = e.target ? e.target.name : 'phone';
    const value = e.target ? e.target.value : e;

    setFormData({ ...formData, [name]: value });
  };

  const handleCitySearch = async (inputValue) => {
    if (inputValue.length < 3) return;
    const response = await fetch(`${API_URL}/api/cities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cityName: inputValue })
    });
    const result = await response.json();
    if (result.success) setCities(result.data);
  };

  const fetchWarehouses = async (cityRef) => {
    const response = await fetch(`${API_URL}/api/warehouses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cityRef })
    });
    const result = await response.json();
    if (result.success) setWarehouses(result.data);
  };

  const confirmOrder = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, cart })
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'Помилка при відправці замовлення');
      }
      setShowSuccessModal(true);
      if (typeof clearCart === 'function') {
        clearCart();
      }

    } catch (err) {
      console.error("Помилка оформлення:", err);
      alert(err.message || "Сервер тимчасово недоступний. Спробуйте пізніше.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return formData.name.trim() !== '' && formData.phone.trim() !== '' &&
      formData.city !== '' && formData.address !== '';
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0 && !showSuccessModal) {
    return (
      <div className="container">
        <h2>Your cart is empty 🛒</h2>
        <Link to="/catalog">Go to Catalog</Link>
      </div>
    );
  }

  return (
    <>
      <div className="container checkout-page">
        <div className="checkout-layout">
          <div className="checkout-form">
            <section className="form-section">
              <h3>Contact Details</h3>
              <input
                name="name"
                placeholder="Full name"
                onChange={handleInputChange}
                required
              />
              <InputMask
                mask="+380 (__) ___-__-__"
                replacement={{ _: /\d/ }}
                name="phone"
                className="input-field"
                placeholder="+380 (__) ___-__-__"
                onChange={handleInputChange}
                required
              />
            </section>

            <section className="form-section">
              <h3>Delivery
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    viewBox="0 0 396.85 155.91"
                  >
                    <path
                      fill="#da292b"
                      d="M90.27 113.11v-23.3H70.46v23.31H55.31l18.37 18.37a9.446 9.446 0 0 0 13.36 0l18.37-18.37H90.27zm-44.86-9.9V53.1L27.03 71.47a9.446 9.446 0 0 0 0 13.36zM70.46 43.2v23.3h19.81V43.2h15.15L87.05 24.82a9.446 9.446 0 0 0-13.36 0L55.31 43.2zm63.24 28.27L115.33 53.1v50.11l18.37-18.37c3.69-3.69 3.69-9.68 0-13.37m49.05-23.43h-13.3v-9.31c0-2.45-1.81-4.25-4.25-4.25h-11.7v9.84h5.32v27.39h10.64V58.14h13.3V71.7h10.64V34.48h-10.64v13.56zm35.11-14.09c-11.22 0-19.41 8.08-19.41 19.15s8.19 19.15 19.41 19.15 19.41-8.08 19.41-19.15-8.19-19.15-19.41-19.15m0 27.92c-5.05 0-8.78-3.72-8.78-8.78s3.72-8.78 8.78-8.78 8.78 3.72 8.78 8.78-3.73 8.78-8.78 8.78m52.32-9.85c2.63-1.61 4.27-4.35 4.27-7.65 0-5.74-3.72-9.89-11.12-9.89h-21.01v37.23h21.01c7.77 0 12.29-4.52 12.29-10.74 0-4-2.12-7.23-5.44-8.95m-17.97-9.25h7.92c2.5 0 3.94 1.22 3.94 3.3s-1.44 3.3-3.94 3.3h-7.92zm8.67 20.75h-8.67V56.6h8.67c2.66 0 4.15 1.28 4.15 3.46s-1.49 3.46-4.15 3.46m31.01-29.04-14.68 37.23h11.33l2.36-6.86h14.95l2.36 6.86h11.54l-14.68-37.23zm1.89 22.02 4.2-12.18h.81l4.2 12.18zM189.34 83.51H153.7v9.84h5.32v27.39h10.64V93.35h13.3v27.39h10.64V87.77c0-2.71-1.55-4.26-4.26-4.26m28.72-.53c-11.22 0-19.41 8.08-19.41 19.15s8.19 19.15 19.41 19.15 19.41-8.08 19.41-19.15-8.19-19.15-19.41-19.15m0 27.92c-5.05 0-8.78-3.72-8.78-8.78 0-5.05 3.72-8.78 8.78-8.78s8.78 3.72 8.78 8.78-3.73 8.78-8.78 8.78m65.95 0h-10.1V83.51h-10.64v27.39h-10.11V83.51h-10.63v37.23h52.12V83.51h-10.64zm51.86-17.55v-9.84H299.7v9.84h12.76v27.39h10.64V93.35zm27.81 27.39h11.54l-14.68-37.23h-13.19l-14.68 37.23H344l2.36-6.86h14.95zm-14.44-15.21 4.2-12.18h.81l4.2 12.18z"
                    ></path><path fill="none" d="M0 0h396.85v155.91H0z"></path></svg>
                </span>
              </h3>

              <div className="select-custom">
                <Select classNamePrefix="select"
                  options={cities.map(c => ({ value: c.Ref, label: c.Description }))}
                  onInputChange={(inputValue, { action }) => {
                    if (action === 'input-change') handleCitySearch(inputValue);
                  }}
                  onChange={(selected) => {
                    if (selected) {
                      setFormData({ ...formData, city: selected.label, address: '' });
                      fetchWarehouses(selected.value);
                    } else {
                      setFormData({ ...formData, city: '', address: '' });
                      setWarehouses([]);
                    }
                  }}
                  placeholder="Enter city..."
                  isSearchable
                  isClearable
                />
                <Select classNamePrefix="select"
                  options={warehouses.map(w => ({ value: w.Description, label: w.Description }))}
                  onChange={(selected) => {
                    if (selected) {
                      setFormData({ ...formData, address: selected.label });
                    }
                  }}
                  placeholder={formData.city ? "Select a branch..." : "First, select a city..."}
                  isDisabled={!formData.city || warehouses.length === 0}
                  isSearchable
                  isClearable
                  styles={{ control: (base) => ({ ...base, marginTop: '10px' }) }}
                />
              </div>
            </section>

            <section className="form-section">
              <h3>Payment Method</h3>
              <div className="radio-group">
                <label><input type="radio" name="payment" value="card" onChange={handleInputChange} defaultChecked /> Credit Card</label>
                <label><input type="radio" name="payment" value="cash" onChange={handleInputChange} /> Cash on Delivery</label>
              </div>
            </section>
          </div>

          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-info">
                    <p>{item.title}</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className="cart-item-price">
                    <button className="remove-btn" onClick={() => handleRemoveFromCart(item.id)}>✕</button>
                    <span>{item.price * item.quantity} UAH</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="total">
              <strong>Total: {totalPrice} UAH</strong>
            </div>
            <button
              className={`btn-confirm ${(!isFormValid() || isSubmitting) ? 'disabled' : ''}`}
              onClick={confirmOrder}
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Confirm Order'}
            </button>
          </div>
        </div>
      </div>
      {showSuccessModal && <ModalSuccess onClose={() => setShowSuccessModal(false)} />}

    </>
  );
}