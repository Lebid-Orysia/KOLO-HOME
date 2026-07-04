import React from 'react';
export default function ContactsPage() {
  return (
    <div className="fullscreen-map-wrapper">
     
      <iframe 
        src="https://www.google.com/maps?q=Площа+Ринок,+Львів,+Україна&output=embed" 
        className="fullscreen-map"
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy"
        title="KOLO HOME Location Map"
      />

      <div className="map-overlay-card">
        <h1 className="map-overlay-card__title">Contacts</h1>
        
        <div className="map-overlay-card__item">
          <strong>Email:</strong> 
          <a href="mailto:info@kolohome.com">info@kolohome.com</a>
        </div>
        
        <div className="map-overlay-card__item">
          <strong>Phone:</strong> 
          <a href="tel:+380123456789">+38 012 345 6789</a>
        </div>
        
        <div className="map-overlay-card__item">
          <strong>Address:</strong> 
          <span>Ploshcha Rynok, Lviv, Ukraine</span>
        </div>

        <div className="map-overlay-card__item">
          <strong>Hours:</strong> 
          <span>Monday–Friday from 10 a.m. to 7 p.m.</span>
        </div>
      </div>
    </div>
  );
}