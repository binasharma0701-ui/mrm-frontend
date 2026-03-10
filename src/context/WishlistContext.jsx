import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const item = window.localStorage.getItem('wishlist');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error('Error reading wishlist from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item._id === product._id || item.id === product.id)) {
        return prev;
      }
      toast.success('Added to Wishlist!');
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => {
      toast.success('Removed from Wishlist');
      return prev.filter(item => item._id !== productId && item.id !== productId);
    });
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product._id || product.id)) {
      removeFromWishlist(product._id || product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item._id === productId || item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
