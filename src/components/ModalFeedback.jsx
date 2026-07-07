import React, { useState } from 'react';
const BOT_TOKEN = '8939819824:AAFjKgg7kbRNcf-CydQeIFbHEODgq_AHvNM';
const CHAT_ID = '-1003789218824';

const ModalFeedback = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [errors, setErrors] = useState({ name: '', contact: '' });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2500);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[\d\s\-()]{9,15}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (value.trim() !== '') {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isFormValid = true;
    let newErrors = { name: '', contact: '' };

    if (formData.name.trim() === '') {
      isFormValid = false;
      newErrors.name = 'Field cannot be empty.';
    }
    
    if (formData.contact.trim() === '') {
      isFormValid = false;
      newErrors.contact = 'Field cannot be empty.';
    } else if (!validatePhone(formData.contact)) {
      isFormValid = false;
      newErrors.contact = 'Invalid phone format.';
    }

    if (!isFormValid) {
      setErrors(newErrors);
      triggerToast('Please correct the errors!', 'error');
      return;
    }

    setIsSubmitting(true);
    const messageText = `🌿New Message from KOLO HOME\n\nName: ${formData.name}\nContact: ${formData.contact}\nMessage: ${formData.message || 'Empty message'}`;

    try {
      const resp = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(messageText)}`
      );

      if (resp.ok) {
        setFormData({ name: '', contact: '', message: '' });
        triggerToast('Data sent successfully!', 'success');
        setTimeout(onClose, 2500);
      } else {
        triggerToast('Server error.', 'error');
      }
    } catch (error) {
      triggerToast('No connection.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        <h3>Contact us</h3>
        <p>Leave your contact details, and we’ll create something cozy together!</p>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="name">Your name</label>
            <input 
              type="text" 
              id="name" 
              className={errors.name ? 'input-error' : ''}
              disabled={isSubmitting}
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            {errors.name && <span className="input-error-message" style={{ color: 'red' }}>{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contact">Phone</label>
            <input 
              type="tel" 
              id="contact" 
              className={errors.contact ? 'input-error' : ''}
              disabled={isSubmitting}
              value={formData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
              placeholder="+380XXXXXXXXX"
            />
            {errors.contact && <span className="input-error-message" style={{ color: 'red' }}>{errors.contact}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Your message (optional)</label>
            <textarea 
              id="message" 
              rows="4"
              disabled={isSubmitting}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>

          <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>

        {toast.show && <div className={`my-toast ${toast.type}`}>{toast.message}</div>}
      </div>
    </div>
  );
};

export default ModalFeedback;