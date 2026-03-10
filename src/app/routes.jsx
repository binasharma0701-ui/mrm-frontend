import { Routes as ReactRoutes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Collections from '../pages/Collections/Collections'
import CollectionDetails from '../pages/CollectionDetails/CollectionDetails'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import Cart from '../pages/Cart/Cart'
import Wishlist from '../pages/Wishlist/Wishlist'
import Checkout from '../pages/Checkout/Checkout'
import Orders from '../pages/Orders/Orders'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import NotFound from '../pages/NotFound/NotFound'

export default function Routes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/collections/:slug" element={<CollectionDetails />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </ReactRoutes>
  )
}
