export const routesConfig = [
  {
    path: '/',
    name: 'Home',
    component: 'Home',
  },
  {
    path: '/collections',
    name: 'Collections',
    component: 'Collections',
  },
  {
    path: '/collections/:slug',
    name: 'Collection Details',
    component: 'CollectionDetails',
    hidden: true,
  },
  {
    path: '/product/:slug',
    name: 'Product Details',
    component: 'ProductDetails',
    hidden: true,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: 'Cart',
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: 'Wishlist',
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: 'Checkout',
    protected: true,
  },
  {
    path: '/orders',
    name: 'Orders',
    component: 'Orders',
    protected: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: 'Profile',
    protected: true,
  },
  {
    path: '/about',
    name: 'About',
    component: 'About',
  },
  {
    path: '/contact',
    name: 'Contact',
    component: 'Contact',
  },
]

export const navLinks = routesConfig.filter(route => !route.hidden && !route.protected)
