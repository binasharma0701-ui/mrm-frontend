import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { getImageUrl } from '../../app/config';
import { FiHeart, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import './Wishlist.css';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="wishlist-page container mx-auto px-4 py-12 min-h-[60vh]">
      <div className="flex items-center justify-center gap-3 mb-8">
        <FiHeart className="w-8 h-8 text-red-500 fill-red-500" />
        <h1 className="text-4xl font-serif text-center text-[#1d0000]">Your Wishlist</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <FiHeart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-500 mb-6">Your wishlist is currently empty.</p>
          <Link to="/collections" className="btn btn-primary inline-block">
            Browse Collections
          </Link>
        </div>
      ) : (
        <div className="products-grid max-w-6xl mx-auto">
          {wishlistItems.map(product => (
            <div key={product._id || product.id} className="product-card group relative">
              {/* Remove from Wishlist Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeFromWishlist(product._id || product.id);
                }}
                className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md text-red-500 hover:bg-red-50 hover:scale-110 transition-all"
                title="Remove from Wishlist"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>

              <Link to={`/product/${product.slug}`} className="block">
                <div className="product-image !mb-0">
                  <img src={getImageUrl(product.image)} alt={product.name} loading="lazy" />
                </div>
              </Link>

              <div className="product-info !pt-4 border-t border-gray-100">
                <h3>{product.name}</h3>
                <div className="product-rating">⭐⭐⭐⭐⭐ <span>({product.reviews || 0})</span></div>
                <p className="description line-clamp-2 !min-h-[40px] !mb-4">{product.description}</p>

                <div className="flex gap-2 mt-auto">
                  <button
                    className="btn btn-secondary flex-1 !py-2 flex items-center justify-center gap-2 !px-2 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <FiShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
