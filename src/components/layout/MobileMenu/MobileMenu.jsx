import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './MobileMenu.css'

export default function MobileMenu({ openOffersModal }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button
        className={`mobile-menu-toggle hide-desktop ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>

      {isOpen && <div className="mobile-menu-overlay" onClick={() => setIsOpen(false)} />}

      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
            <h2 className="menu-title">Main Menu</h2>
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <nav className="mobile-menu-nav">
          <Link to="/" onClick={handleLinkClick}>Home</Link>
          <Link to="/collections" onClick={handleLinkClick}>All Idols</Link>
          <Link to="/collections?type=poshak-sringar" onClick={handleLinkClick}>Shingar &amp; Poshak</Link>
          <button
            className="mobile-menu-offer-btn"
            onClick={() => { setIsOpen(false); if (openOffersModal) openOffersModal(); }}
          >
            <span>Exclusive Offers</span>
            <div className="offer-badge-dot"></div>
          </button>
          
          <div className="mobile-menu-divider">Account & Misc</div>
          
          <Link to="/wishlist" onClick={handleLinkClick}>My Wishlist</Link>
          <Link to="/cart" onClick={handleLinkClick}>Shopping Cart</Link>
          <Link to="/login" onClick={handleLinkClick}>Sign In / Register</Link>
        </nav>
      </div>
    </>
  )
}
