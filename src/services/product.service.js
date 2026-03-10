import { productAPI, collectionAPI } from '../api/index'

const ProductService = {
  async getAllProducts(params = {}) {
    try {
      const response = await productAPI.getAll(params)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch products'
    }
  },

  async getProductById(id) {
    try {
      const response = await productAPI.getById(id)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch product'
    }
  },

  async getProductBySlug(slug) {
    try {
      const response = await productAPI.getBySlug(slug)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch product'
    }
  },

  async getAllCollections(params = {}) {
    try {
      const response = await collectionAPI.getAll(params)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch collections'
    }
  },

  async getCollectionById(id) {
    try {
      const response = await collectionAPI.getById(id)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch collection'
    }
  },

  async getCollectionBySlug(slug) {
    try {
      const response = await collectionAPI.getBySlug(slug)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch collection'
    }
  },
}

export default ProductService
