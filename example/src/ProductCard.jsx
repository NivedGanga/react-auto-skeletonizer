import React from 'react';
import { ClampList } from './clampList';

export function ProductCard({ title, price, description, category, rating, image, items = [] }) {
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
        <div className="product-description">
          <ClampList items={[description, ...items]} maxLines={2} />
        </div>
        <div className="product-footer">
          <span className="product-price">${price}</span>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
