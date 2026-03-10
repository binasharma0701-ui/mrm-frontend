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
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          {logo.url ? (
            <img
              src={getImageUrl(logo.url)}
              alt={logo.text || "MRM Idols Logo"}
              style={{ maxHeight: '50px', borderRadius: '50%', objectFit: 'cover' }} // Added circular border radius
            />
          ) : !logo.text ? (
            <span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--color-text)', fontFamily: 'var(--font-secondary)' }}>MRM Idols</span>
          ) : null}
          {logo.text && <span style={{ fontWeight: 'bold', fontSize: '1.3rem', color: 'var(--color-text)', fontFamily: 'var(--font-secondary)' }}>{logo.text}</span>}
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-menu hide-mobile">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/collections">IDOLS</Link></li>
          <li><Link to="/collections?type=poshak-sringar">SHINGAR &amp; POSHAK</Link></li>
          <li><Link to="/about">ABOUT US</Link></li>
          <li><button onClick={() => setIsOffersModalOpen(true)} className="nav-link-btn" style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' }}>OFFERS</button></li>
        </ul>


        {/* Search Bar */}
        <div className={`navbar-search ${isSearchOpen ? 'active' : ''}`} style={{ position: 'relative' }}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for idols"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            <button type="submit" title="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </form>

          {/* Search Suggestions */}
          {showSuggestions && searchQuery.trim() && filteredSuggestions.length > 0 && (
            <div className="search-suggestions">
              {filteredSuggestions.map(product => (
                <Link
                  key={product._id || product.id}
                  to={`/product/${product.slug}`}
                  className="suggestion-item"
                  onClick={() => {
                    setSearchQuery('');
                    setShowSuggestions(false);
                    setIsSearchOpen(false);
                  }}
                >
                  <div className="suggestion-img-wrapper" style={{ width: '40px', height: '40px', overflow: 'hidden', borderRadius: '4px', flexShrink: 0 }}>
                    <img src={getImageUrl(product.image)} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="suggestion-info">
                    <span className="suggestion-name">{product.name}</span>
                    <span className="suggestion-category">{product.category || product.collection || 'Idol'}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Icons */}
        <div className="navbar-icons">
          <button onClick={toggleTheme} className="icon-btn" title="Toggle Theme">
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>

          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="icon-btn search-toggle" title="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>

          <Link to="/wishlist" className="icon-btn hide-mobile relative" title="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            {wishlistItems && wishlistItems.length > 0 && <span className="cart-badge">{wishlistItems.length}</span>}
          </Link>

          <Link to="/cart" className="icon-btn cart-icon relative" title="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            {cartItems && cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
          </Link>

          {user ? (
            <div className="user-menu hide-mobile">
              <button className="user-btn">
                <img src="/images/user-avatar.png" alt="User" className="user-avatar" onError={(e) => { e.target.onerror = null; e.target.src = 'https://ui-avatars.com/api/?name=User&background=D4A574&color=fff'; }} />
              </button>
              <div className="dropdown">
                <Link to="/profile">My Profile</Link>
                <Link to="/orders">Orders</Link>
                <button onClick={logout}>Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="icon-btn hide-mobile" title="Account">
              <img src="/images/user-avatar.png" alt="User" className="user-avatar" onError={(e) => { e.target.onerror = null; e.target.src = 'https://ui-avatars.com/api/?name=User&background=D4A574&color=fff&rounded=true'; }} />
            </Link>
          )}

          <MobileMenu openOffersModal={() => setIsOffersModalOpen(true)} />
        </div>

      </div>
      <OffersModal isOpen={isOffersModalOpen} onClose={() => setIsOffersModalOpen(false)} />
    </nav>
  )
}
