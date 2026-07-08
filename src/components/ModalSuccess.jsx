import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ModalSuccess = ({ onClose }) => {
  const navigate = useNavigate(); 

  const handleOverlayClick = () => {
    onClose();     
    navigate('/catalog');  
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Order Confirmed!</h3>
        <img src="assets/images/done.png" alt="" />
        <p>Your order has been successfully placed. We will contact you shortly.</p>
        <Link to="/catalog" className="form-submit-btn" onClick={onClose}>
          Back to Catalog
        </Link>
      </div>
    </div>
  );
};
export default ModalSuccess;