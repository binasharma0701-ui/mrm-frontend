import { wishlistAPI } from '../api/index'

const WishlistService = {
  async getWishlist() {
    try {
      const response = await wishlistAPI.get()
      return response.data
    } catch (error) {
      console.error('Failed to fetch wishlist:', error)
      return { items: [] }
    }
  },

  async addToWishlist(productId) {
    try {
      const response = await wishlistAPI.add({ productId })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to add to wishlist'
    }
  },

  async removeFromWishlist(itemId) {
    try {
      const response = await wishlistAPI.remove(itemId)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to remove from wishlist'
    }
  },
}

export default WishlistService
