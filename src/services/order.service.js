import { orderAPI } from '../api/index'

const OrderService = {
  async getOrders() {
    try {
      const response = await orderAPI.getAll()
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch orders'
    }
  },

  async getOrderById(orderId) {
    try {
      const response = await orderAPI.getById(orderId)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch order'
    }
  },

  async createOrder(data) {
    try {
      const response = await orderAPI.create(data)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create order'
    }
  },

  async updateOrderStatus(orderId, status) {
    try {
      const response = await orderAPI.updateStatus(orderId, status)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update order'
    }
  },
}

export default OrderService
