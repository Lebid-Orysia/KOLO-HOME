import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import "../assets/scss/CheckoutPage.scss";
import Select from 'react-select';

export default function CheckoutPage() {
  const { cart, handleUpdateQuantity, handleRemoveFromCart } = useCartStore();

  const [formData, setFormData] = useState({
    name: '', phone: '', city: '', deliveryType: 'branch', address: '', payment: 'card'
  });

  const [cities, setCities] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCitySearch = async (inputValue) => {
    if (inputValue.length < 3) return;
    const response = await fetch('http://localhost:3001/api/cities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cityName: inputValue })
    });
    const result = await response.json();
    if (result.success) setCities(result.data);
  };

  const fetchWarehouses = async (cityRef) => {
    const response = await fetch('http://localhost:3001/api/warehouses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cityRef })
    });
    const result = await response.json();
    if (result.success) setWarehouses(result.data);
  };

  const isFormValid = () => {
    return formData.name.trim() !== '' && formData.phone.trim() !== '' &&
      formData.city !== '' && formData.address !== '';
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) return <div className="container"><h2>Your cart is empty 🛒</h2><Link to="/catalog">Go to Catalog</Link></div>;

  return (
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
            <input
              type="tel"
              name="phone"
              placeholder="+380XXXXXXXXX"
              onChange={handleInputChange}
              required
            />
          </section>

          <section className="form-section">
            <h3>Delivery</h3>
            <Select
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

            <Select
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
            className={`btn-confirm ${!isFormValid() ? 'disabled' : ''}`}
            onClick={() => console.log('Order:', { formData, cart })}
            disabled={!isFormValid()}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}