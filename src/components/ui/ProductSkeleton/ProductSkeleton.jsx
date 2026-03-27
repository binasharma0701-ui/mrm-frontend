import './ProductSkeleton.css';

export default function ProductSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="product-card skeleton-card">
          <div className="skeleton-image shimmer" />
          <div className="product-info">
            <div className="skeleton-line shimmer" style={{ width: '70%', height: '20px', marginBottom: '8px' }} />
            <div className="skeleton-line shimmer" style={{ width: '40%', height: '14px', marginBottom: '12px' }} />
            <div className="skeleton-line shimmer" style={{ width: '90%', height: '12px', marginBottom: '6px' }} />
            <div className="skeleton-line shimmer" style={{ width: '75%', height: '12px', marginBottom: '16px' }} />
            <div className="skeleton-actions">
              <div className="skeleton-btn shimmer" />
              <div className="skeleton-btn shimmer" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
