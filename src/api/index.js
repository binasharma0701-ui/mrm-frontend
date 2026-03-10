import axiosInstance from './axiosInstance'
import { ENDPOINTS } from './endpoints'

export const productAPI = {
  getAll: (params) => axiosInstance.get(ENDPOINTS.GET_PRODUCTS, { params }),
  getById: (id) => axiosInstance.get(ENDPOINTS.GET_PRODUCT_BY_ID.replace(':id', id)),
  getBySlug: (slug) => axiosInstance.get(ENDPOINTS.GET_PRODUCT_BY_SLUG.replace(':slug', slug)),
}

export const collectionAPI = {
  getAll: (params) => axiosInstance.get(ENDPOINTS.GET_COLLECTIONS, { params }),
  getById: (id) => axiosInstance.get(ENDPOINTS.GET_COLLECTION_BY_ID.replace(':id', id)),
  getBySlug: (slug) => axiosInstance.get(ENDPOINTS.GET_COLLECTION_BY_SLUG.replace(':slug', slug)),
}

export const cartAPI = {
  get: () => axiosInstance.get(ENDPOINTS.GET_CART),
  add: (data) => axiosInstance.post(ENDPOINTS.ADD_TO_CART, data),
  update: (id, data) => axiosInstance.put(ENDPOINTS.UPDATE_CART_ITEM.replace(':id', id), data),
  remove: (id) => axiosInstance.delete(ENDPOINTS.REMOVE_FROM_CART.replace(':id', id)),
  clear: () => axiosInstance.post(ENDPOINTS.CLEAR_CART),
}

export const wishlistAPI = {
  get: () => axiosInstance.get(ENDPOINTS.GET_WISHLIST),
  add: (data) => axiosInstance.post(ENDPOINTS.ADD_TO_WISHLIST, data),
  remove: (id) => axiosInstance.delete(ENDPOINTS.REMOVE_FROM_WISHLIST.replace(':id', id)),
}

export const orderAPI = {
  getAll: () => axiosInstance.get(ENDPOINTS.GET_ORDERS),
  getById: (id) => axiosInstance.get(ENDPOINTS.GET_ORDER_BY_ID.replace(':id', id)),
  create: (data) => axiosInstance.post(ENDPOINTS.CREATE_ORDER, data),
  updateStatus: (id, status) => axiosInstance.put(ENDPOINTS.UPDATE_ORDER_STATUS.replace(':id', id), { status }),
}

export const authAPI = {
  login: (data) => axiosInstance.post(ENDPOINTS.LOGIN, data),
  register: (data) => axiosInstance.post(ENDPOINTS.REGISTER, data),
  logout: () => axiosInstance.post(ENDPOINTS.LOGOUT),
  refreshToken: () => axiosInstance.post(ENDPOINTS.REFRESH_TOKEN),
  getCurrentUser: () => axiosInstance.get(ENDPOINTS.GET_CURRENT_USER),
  forgotPassword: (email) => axiosInstance.post(ENDPOINTS.FORGOT_PASSWORD, { email }),
  resetPassword: (token, password) => axiosInstance.post(ENDPOINTS.RESET_PASSWORD, { token, password }),
}

export const userAPI = {
  getProfile: () => axiosInstance.get(ENDPOINTS.GET_USER_PROFILE),
  updateProfile: (data) => axiosInstance.put(ENDPOINTS.UPDATE_USER_PROFILE, data),
  getAddresses: () => axiosInstance.get(ENDPOINTS.GET_ADDRESSES),
  addAddress: (data) => axiosInstance.post(ENDPOINTS.ADD_ADDRESS, data),
  updateAddress: (id, data) => axiosInstance.put(ENDPOINTS.UPDATE_ADDRESS.replace(':id', id), data),
  deleteAddress: (id) => axiosInstance.delete(ENDPOINTS.DELETE_ADDRESS.replace(':id', id)),
}

export const paymentAPI = {
  createIntent: (data) => axiosInstance.post(ENDPOINTS.CREATE_PAYMENT_INTENT, data),
  verify: (data) => axiosInstance.post(ENDPOINTS.VERIFY_PAYMENT, data),
}

export const reviewAPI = {
  getByProduct: (productId) => axiosInstance.get(ENDPOINTS.GET_PRODUCT_REVIEWS.replace(':id', productId)),
  create: (data) => axiosInstance.post(ENDPOINTS.CREATE_REVIEW, data),
  update: (id, data) => axiosInstance.put(ENDPOINTS.UPDATE_REVIEW.replace(':id', id), data),
  delete: (id) => axiosInstance.delete(ENDPOINTS.DELETE_REVIEW.replace(':id', id)),
}

export const contactAPI = {
  send: (data) => axiosInstance.post(ENDPOINTS.SEND_CONTACT_MESSAGE, data),
}
