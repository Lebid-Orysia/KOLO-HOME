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
      console.log("Сервер відповів успішно, намагаюсь відкрити модалку...");
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
              <h3>Delivery</h3>
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
                    <span>{item.price * item.quantity} UAH</span>
                    <button className="remove-btn" onClick={() => handleRemoveFromCart(item.id)}>✕</button>
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