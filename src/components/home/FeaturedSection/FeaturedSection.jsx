import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getImageUrl } from '../../../app/config';
import axiosInstance from '../../../api/axiosInstance';
import { useCart } from '../../../context/CartContext.jsx';
import { useWishlist } from '../../../context/WishlistContext.jsx';
import RatingStars from '../../ui/RatingStars/RatingStars';
import ProductSkeleton from '../../ui/ProductSkeleton/ProductSkeleton';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import './FeaturedSection.css'

const ITEMS_PER_PAGE = 5

export default function FeaturedSection() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Fetch featured products with caching (stale for 2 min)
  const { data: featuredProducts = [], isLoading: loading } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => axiosInstance.get('/products?featured=true').then(r => r.data.data || []),
    staleTime: 2 * 60 * 1000,
  })

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter])

  const filters = ['All', 'Pure marble', 'Poshak', 'Dust']

  const getFilterMatch = (filterName) => {
    switch (filterName) {
      case 'Pure marble': return ['marble', 'pure-marble', 'pure marble'];
      case 'Poshak': return ['poshak', 'poshak-sringar'];
      case 'Dust': return ['dust', 'dust-murties', 'dust marble'];
      default: return [filterName.toLowerCase()];
    }
  }

  const filteredProducts = activeFilter === 'All'
    ? featuredProducts
    : featuredProducts.filter(p => {
      const matches = getFilterMatch(activeFilter);
      return matches.includes(p.collection?.toLowerCase()) || matches.includes(p.category?.toLowerCase());
    }) || []

  // Pagination — only apply when "All" is selected
  const isPaginated = activeFilter === 'All'
  const totalPages = isPaginated ? Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) : 1
  const displayedProducts = isPaginated
    ? filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : filteredProducts

  return (
    <section className="featured-section">
      <div className="container">
        <div className="featured-top-bar">
          <div className="section-header">
            <h2>Featured Idols</h2>
            <p>Handpicked selection for your home temple</p>
          </div>

          <div className="filter-tabs">
            {filters.map(filter => (
              <button
                key={filter}
                className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="products-grid">
          {loading ? (
            <ProductSkeleton count={5} />
          ) : displayedProducts.map(product => (
            <div
              key={product._id || product.id}
              className="product-card relative group cursor-pointer"
              onClick={() => navigate(`/product/${product.slug || product._id || product.id}`)}
            >
              {/* Wishlist Button */}
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

              <div className="product-image">
                <img src={getImageUrl(product.image)} alt={product.name} loading="lazy" decoding="async" />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-rating">
                  <RatingStars rating={product.rating || 0} />
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
                    onClick={(e) => e.stopPropagation()}
                    title="Order via WhatsApp">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination — only shown in "All" mode */}
        {isPaginated && totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ← Prev
            </button>

            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
