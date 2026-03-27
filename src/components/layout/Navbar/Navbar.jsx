import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../../context/CartContext.jsx'
import { useWishlist } from '../../../context/WishlistContext.jsx'
import { useAuth } from '../../../hooks/useAuth.js'
import { ThemeContext } from '../../../context/ThemeContext'
import axiosInstance from '../../../api/axiosInstance';
import { getImageUrl } from '../../../app/config';
import MobileMenu from '../MobileMenu/MobileMenu.jsx'
import OffersModal from '../../ui/OffersModal.jsx'
import './Navbar.css'


export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isOffersModalOpen, setIsOffersModalOpen] = useState(false)
  const [products, setProducts] = useState([])

  const [logo, setLogo] = useState({ url: null, text: '' })
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axiosInstance.get('/settings');
        if (res.data?.data) {
          setLogo({
            url: res.data.data.logoUrl || null,
            text: res.data.data.logoText || ''
          });
        }
      } catch (error) {
        console.error('Failed to fetch settings for navbar:', error);
      }
    };
    fetchSettings();

    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get('/products');
        setProducts(res.data.data || []);
      } catch (error) {
        console.error('Failed to fetch products for search:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredSuggestions = searchQuery.trim()
    ? products.filter(p =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.collection?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5)
    : [];

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/collections?search=${searchQuery}`)
      setSearchQuery('')
      setShowSuggestions(false)
      setIsSearchOpen(false)
    }
  }

  return (
    <nav className={`navbar ${isSearchOpen ? 'search-active' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          {logo.url ? (
            <img
              src={getImageUrl(logo.url)}
              alt={logo.text || "MRM Idols Logo"}
              className="logo-img"
            />
          ) : (
            <span className="logo-text">{logo.text || 'MRM Idols'}</span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-menu hide-mobile">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/collections">IDOLS</Link></li>
          <li><Link to="/collections?type=poshak-sringar">SHINGAR &amp; POSHAK</Link></li>
          <li><Link to="/about">ABOUT US</Link></li>
          <li>
            <button onClick={() => setIsOffersModalOpen(true)} className="nav-link-btn">
              OFFERS
            </button>
          </li>
        </ul>

        {/* Search Bar (Mobile & Desktop) */}
        <div className={`navbar-search ${isSearchOpen ? 'active' : ''}`}>
          <form onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search for masterpieces..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              <button type="submit" className="search-submit-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </div>
          </form>

          {/* Search Suggestions */}
          {showSuggestions && searchQuery.trim() && filteredSuggestions.length > 0 && (
            <div className="search-suggestions">
              {filteredSuggestions.map(product => (
                <Link
                  key={product._id}
                  to={`/product/${product.slug}`}
                  className="suggestion-item"
                  onClick={() => {
                    setSearchQuery('');
                    setShowSuggestions(false);
                    setIsSearchOpen(false);
                  }}
                >
                  <img src={getImageUrl(product.image)} alt={product.name} className="suggestion-img" />
                  <div className="suggestion-info">
                    <span className="suggestion-name">{product.name}</span>
                    <span className="suggestion-category">{product.category || product.collection}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Icons */}
        <div className="navbar-icons">
          <button onClick={toggleTheme} className="icon-btn theme-toggle" title="Toggle Theme">
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>

          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={`icon-btn search-toggle ${isSearchOpen ? 'active' : ''}`} title="Search">
            {isSearchOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            )}
          </button>

          <Link to="/wishlist" className="icon-btn hide-mobile relative" title="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            {wishlistItems && wishlistItems.length > 0 && <span className="cart-badge">{wishlistItems.length}</span>}
          </Link>

          <Link to="/cart" className="icon-btn cart-icon relative" title="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            {cartItems && cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
          </Link>

          {user ? (
            <div className="user-menu hide-mobile">
              <button className="user-btn">
                <img
                  src={user.avatar || "/images/user-avatar.png"}
                  alt="User"
                  className="user-avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${user.name || 'User'}&background=D4A574&color=fff&rounded=true`;
                  }}
                />
              </button>
              <div className="dropdown">
                <div className="dropdown-header">
                  <p className="dropdown-user-name">{user.name}</p>
                  <p className="dropdown-user-email">{user.email}</p>
                </div>
                <Link to="/profile">My Profile</Link>
                <Link to="/orders">Orders</Link>
                <div className="dropdown-divider"></div>
                <button onClick={logout} className="logout-btn">Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="icon-btn hide-mobile account-link" title="Account">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </Link>
          )}

          <MobileMenu openOffersModal={() => setIsOffersModalOpen(true)} />
        </div>

      </div>
      <OffersModal isOpen={isOffersModalOpen} onClose={() => setIsOffersModalOpen(false)} />
    </nav>
  )
}
