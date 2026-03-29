import { useSearchParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getImageUrl } from '../../app/config';
import axiosInstance from '../../api/axiosInstance';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import RatingStars from '../../components/ui/RatingStars/RatingStars';
import ProductSkeleton from '../../components/ui/ProductSkeleton/ProductSkeleton';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import './Collections.css'

const collectionMapping = {
  'pure-marble': 'marble',
  'poshak-sringar': 'poshak',
  'dust-murties': 'dust',
  'kali-idols': 'kali'
};

export default function Collections() {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type')
  const searchQuery = searchParams.get('search')
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Build API params for server-side filtering
  const buildProductParams = () => {
    const params = new URLSearchParams({ limit: 100 });
    if (type) {
      const normalizedType = type.toLowerCase().replace(/-collection$/, '');
      const targetCollection = collectionMapping[normalizedType] || normalizedType;
      params.append('collection', targetCollection);
    }
    if (searchQuery) params.append('search', searchQuery);
    return params.toString();
  };

  // Fetch products with caching (stale for 2 min)
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['products', type, searchQuery],
    queryFn: () => axiosInstance.get(`/products?${buildProductParams()}`).then(r => r.data.data || []),
    staleTime: 2 * 60 * 1000, // 2 minutes
    placeholderData: [],
  });

  // Fetch collections in real time after CRM CRUD actions
  const { data: collections = [] } = useQuery({
    queryKey: ['collections'],
    queryFn: () => axiosInstance.get('/collections', {
      headers: { 'Cache-Control': 'no-cache' },
      params: { t: Date.now() }
    }).then(r => r.data.data || []),
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const products = productsData || [];

  const categoryInfo = type
    ? collections.find(c => c.slug?.toLowerCase() === type.toLowerCase()) ||
    collections.find(c => c.category?.toLowerCase() === type.toLowerCase().replace(/-collection$/, '')) ||
    collections.find(c => c.name?.toLowerCase().includes(type.toLowerCase().replace(/-collection$/, '').replace('-', ' '))) ||
    { name: `${type.charAt(0).toUpperCase() + type.slice(1).replace(/-collection$/, '').replace('-', ' ')} Collection`, description: `Browse our ${type.replace(/-collection$/, '').replace('-', ' ')} collection` }
    : { name: 'All Collections', description: 'Browse our complete range of divine idols' }

  return (
    <div className="collections-page">
      <div className="container">
        <div className="collections-header">
          <h1>{categoryInfo?.name || 'Collections'}</h1>
          <p>{categoryInfo?.description || 'Browse all collections'}</p>
        </div>

        {productsLoading ? (
          <div className="products-grid">
            <ProductSkeleton count={8} />
          </div>
        ) : products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => (
              <div key={product._id || product.id} className="product-card relative group">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className={`wishlist-btn ${isInWishlist(product._id || product.id) ? 'active' : ''}`}
                  title={isInWishlist(product._id || product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <FiHeart className="w-5 h-5" />
                </button>

                <Link to={`/product/${product.slug}`} className="block">
                  <div className="product-image">
                    <img src={getImageUrl(product.image, 500)} alt={product.name} loading="lazy" decoding="async" />
                  </div>
                </Link>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-rating">
                    <RatingStars rating={product.rating || 0} count={product.reviews || 0} />
                  </div>
                  <p>{product.description}</p>

                  <div className="product-actions">
                    <button
                      className="btn btn-secondary cart-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                    <a href={`https://wa.me/916367929608?text=Hello%20I%20am%20interested%20in%20your%20${encodeURIComponent(product.name)}`}
                      className="btn btn-secondary whatsapp-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Order via WhatsApp"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No products found in this category.</p>
            <Link to="/collections" className="btn btn-primary">View All Collections</Link>
          </div>
        )}
      </div>
    </div>
  )
}
