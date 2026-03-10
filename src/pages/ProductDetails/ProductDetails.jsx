import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { getImageUrl } from '../../app/config';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import RatingStars from '../../components/ui/RatingStars/RatingStars';
import { FiHeart, FiShoppingCart, FiShare2, FiChevronRight } from 'react-icons/fi';
import './ProductDetails.css';

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(null);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/products/slug/${slug}`);
        const data = response.data.data;
        setProduct(data);
        setActiveImage(data.image);

        // Fetch related products
        if (data.collection) {
          const relatedRes = await axiosInstance.get(`/products?collection=${data.collection}&limit=4`);
          setRelatedProducts(relatedRes.data.data.filter(p => p._id !== data._id));
        }
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Product not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) return <div className="product-details-loading"><div className="loader"></div></div>;
  if (error || !product) return (
    <div className="product-details-error">
      <h2>{error || 'Product not found'}</h2>
      <Link to="/collections" className="back-link">Back to Collections</Link>
    </div>
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this beautiful ${product.name} at MRM Moorti Arts`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const images = [product.image, ...(product.images || [])].filter(Boolean);

  return (
    <div className="product-details-page">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <Link to="/">Home</Link>
          <FiChevronRight className="separator" />
          <Link to="/collections">Collections</Link>
          <FiChevronRight className="separator" />
          <span className="current" style={{ textTransform: 'capitalize' }}>{product.collection}</span>
          <FiChevronRight className="separator" />
          <span className="current">{product.name}</span>
        </nav>

        <div className="product-details-grid">
          {/* Left Side: Images */}
          <div className="product-gallery">
            <div className="main-image-container">
              <img
                src={getImageUrl(activeImage)}
                alt={product.name}
                className="main-product-image"
                loading="lazy"
              />
              <button
                className={`wishlist-toggle-btn ${isInWishlist(product._id || product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <FiHeart />
              </button>
            </div>
            {images.length > 1 && (
              <div className="thumbnail-list">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`thumbnail-item ${activeImage === img ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img src={getImageUrl(img)} alt={`${product.name} thumbnail ${idx + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Information */}
          <div className="product-info-panel">
            <div className="product-header">
              <div className="sku-badge">SKU: {product.sku || 'N/A'}</div>
              <h1>{product.name}</h1>
              <div className="rating-wrapper">
                <RatingStars rating={product.rating || 0} count={product.reviews || 0} />
              </div>
            </div>


            <div className="product-summary">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="specifications-grid">
              <div className="spec-item">
                <span className="spec-label">Material</span>
                <span className="spec-value">{product.material || 'Marble'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Weight</span>
                <span className="spec-value">{product.weight ? `${product.weight} kg` : 'N/A'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Dimensions</span>
                <span className="spec-value">
                  {product.dimensions?.length || 0}L x {product.dimensions?.width || 0}W x {product.dimensions?.height || 0}H cm
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Craftsmanship</span>
                <span className="spec-value">{product.craftsmanship || 'Handcrafted'}</span>
              </div>
            </div>

            <div className="action-button-group">
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                <FiShoppingCart /> Add to Cart
              </button>

              <a
                href={`https://wa.me/916367929608?text=Hello%20I%20am%20interested%20in%20your%20${encodeURIComponent(product.name)}`}
                className="whatsapp-buy-btn"
                target="_blank"
                rel="noopener noreferrer"
                title="Order via WhatsApp"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>

              <button className="share-btn" onClick={handleShare} title="Share Product">
                <FiShare2 />
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="section-title">You May Also Like</h2>
            <div className="related-grid">
              {relatedProducts.map(relProduct => (
                <Link to={`/product/${relProduct.slug}`} key={relProduct._id} className="related-card-link">
                  <div className="related-card">
                    <div className="related-image">
                      <img src={getImageUrl(relProduct.image)} alt={relProduct.name} />
                    </div>
                    <div className="related-info">
                      <h4>{relProduct.name}</h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
