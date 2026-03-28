import React, { useState } from 'react';

/**
 * DistributorCard – a custom React component that:
 *  - uses its own useState hook (expanded toggle)
 *  - renders a moderately rich card layout
 *
 * This is the primary demo for the getOrCreateWrapper feature: wrapping
 * <DistributorCard> in <Skeletonizer loading> will recursively skeletonize
 * whatever JSX this component renders, while hooks stay fully functional.
 */
function VendorTypeChip({ vendorType }) {
  const isRegulated = vendorType === 'Regulated';
  return (
    <span className={`dc-type-chip ${isRegulated ? 'dc-type-regulated' : 'dc-type-nonregulated'}`}>
      <span className="dc-type-icon">{isRegulated ? '🍷' : '☕'}</span>
      {vendorType}
    </span>
  );
}

export function DistributorCard({ vendorName, location, vendorType, products, productCategories, isServiceArea }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="dc-card">
      {/* ── Header row ──────────────────────────────────────── */}
      <div className="dc-header">
        <VendorTypeChip vendorType={vendorType} />

        {isServiceArea && (
          <span className="dc-service-chip">
            <span className="dc-service-icon">✅</span>
            Service Area
          </span>
        )}
      </div>

      {/* ── Identity ─────────────────────────────────────────── */}
      <h3 className="dc-vendor-name">{vendorName}</h3>
      <p className="dc-location">{location}</p>

      {/* ── Products list ──────────────────────────────────────  */}
      <ul className="dc-products">
        {(expanded ? products : products.slice(0, 3)).map((p, i) => (
          <li key={i} className="dc-product-item">{p}</li>
        ))}
      </ul>

      {products.length > 3 && (
        <button className="dc-expand-btn" onClick={() => setExpanded(e => !e)}>
          {expanded ? '▲ Show less' : `▼ +${products.length - 3} more`}
        </button>
      )}

      {/* ── Category chips ───────────────────────────────────── */}
      <div className="dc-categories">
        {productCategories.map((cat, i) => (
          <span key={i} className="dc-cat-chip">{cat}</span>
        ))}
      </div>
    </div>
  );
}
