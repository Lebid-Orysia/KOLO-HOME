import React, { useState } from 'react';

// Твої нові дані Telegram-бота
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
    }

    if (!isFormValid) {
      setErrors(newErrors);
      triggerToast('Fill in the required fields!', 'error');
      return;
    }

    setIsSubmitting(true);
    const messageText = `🌿New Message from KOLO HOME\n\nName: ${formData.name}\nContact: ${formData.contact}\nMessage: ${formData.message || 'Empty message'}`;

    try {
      const resp = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(messageText)}`
      );

      if (resp.ok) {
        const answer = await resp.json();
        if (answer.ok) {
          setFormData({ name: '', contact: '', message: '' }); 
          triggerToast('Data sent successfully!', 'success');
         
          setTimeout(() => {
            onClose();
          }, 2500);
        } else {
          console.error(answer.description);
          triggerToast('Telegram server error.', 'error');
        }
      } else {
        console.error('Server response error');
        triggerToast('Could not contact the server.', 'error');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      triggerToast('There is no network connection.', 'error');
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
          
          {/* Поле: Name */}
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
            {errors.name && <span className="input-error-message" style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="contact">Phone</label>
            <input 
              type="number" 
              id="contact" 
              className={errors.contact ? 'input-error' : ''}
              disabled={isSubmitting}
              value={formData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
            />
            {errors.contact && <span className="input-error-message" style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{errors.contact}</span>}
          </div>

          {/* Поле: Message */}
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


        {toast.show && (
          <div className={`my-toast ${toast.type}`}>
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalFeedback;