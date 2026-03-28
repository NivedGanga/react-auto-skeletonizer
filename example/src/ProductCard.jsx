import React from 'react';

export function ProductCard({ title, price, description, category, rating, image }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
      </div>
      <div className="product-details">
        <div className="product-category">{category}</div>
        <h3 className="product-title">{title}</h3>
        <div className="product-rating">
          <span className="star-icon">★</span>
          {rating.rate} ({rating.count} reviews)
        </div>
        <p className="product-description">{description}</p>
        <div className="product-footer">
          <span className="product-price">${price}</span>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
