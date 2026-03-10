export const ENDPOINTS = {
  // Products
  GET_PRODUCTS: '/products',
  GET_PRODUCT_BY_ID: '/products/:id',
  GET_PRODUCT_BY_SLUG: '/products/slug/:slug',

  // Collections
  GET_COLLECTIONS: '/collections',
  GET_COLLECTION_BY_ID: '/collections/:id',
  GET_COLLECTION_BY_SLUG: '/collections/slug/:slug',

  // Cart
  GET_CART: '/cart',
  ADD_TO_CART: '/cart/add',
  UPDATE_CART_ITEM: '/cart/update/:id',
  REMOVE_FROM_CART: '/cart/remove/:id',
  CLEAR_CART: '/cart/clear',

  // Wishlist
  GET_WISHLIST: '/wishlist',
  ADD_TO_WISHLIST: '/wishlist/add',
  REMOVE_FROM_WISHLIST: '/wishlist/remove/:id',

  // Orders
  GET_ORDERS: '/orders',
  GET_ORDER_BY_ID: '/orders/:id',
  CREATE_ORDER: '/orders/create',
  UPDATE_ORDER_STATUS: '/orders/:id/status',

  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  GET_CURRENT_USER: '/auth/me',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // User
  GET_USER_PROFILE: '/users/profile',
  UPDATE_USER_PROFILE: '/users/profile',
  GET_ADDRESSES: '/users/addresses',
  ADD_ADDRESS: '/users/addresses',
  UPDATE_ADDRESS: '/users/addresses/:id',
  DELETE_ADDRESS: '/users/addresses/:id',

  // Payments
  CREATE_PAYMENT_INTENT: '/payments/intent',
  VERIFY_PAYMENT: '/payments/verify',

  // Reviews
  GET_PRODUCT_REVIEWS: '/products/:id/reviews',
  CREATE_REVIEW: '/reviews/create',
  UPDATE_REVIEW: '/reviews/:id',
  DELETE_REVIEW: '/reviews/:id',

  // Contact
  SEND_CONTACT_MESSAGE: '/contact/send',
}
