import { cartAPI } from '../api/index'

const CartService = {
  async getCart() {
    try {
      const response = await cartAPI.get()
      return response.data
    } catch (error) {
      console.error('Failed to fetch cart:', error)
      return { items: [] }
    }
  },

  async addToCart(productId, quantity = 1) {
    try {
      const response = await cartAPI.add({ productId, quantity })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to add to cart'
    }
  },

  async updateCartItem(itemId, quantity) {
    try {
      const response = await cartAPI.update(itemId, { quantity })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update cart'
    }
  },

  async removeFromCart(itemId) {
    try {
      const response = await cartAPI.remove(itemId)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to remove from cart'
    }
  },

  async clearCart() {
    try {
      const response = await cartAPI.clear()
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to clear cart'
    }
  },
}

export default CartService
