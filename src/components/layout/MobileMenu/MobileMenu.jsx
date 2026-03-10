import { useState, useEffect } from 'react'
import './MobileMenu.css'
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

  return (
    <>
      <button
        className="mobile-menu-toggle hide-desktop"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {isOpen && <div className="mobile-menu-overlay" onClick={() => setIsOpen(false)} />}

      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <h2>Menu</h2>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <nav className="mobile-menu-nav">
          <a href="/" onClick={() => setIsOpen(false)}>Home</a>
          <a href="/collections" onClick={() => setIsOpen(false)}>Idols</a>
          <a href="/collections?type=poshak-sringar" onClick={() => setIsOpen(false)}>Shingar &amp; Poshak</a>
          <button
            className="mobile-menu-btn text-left p-4 border-b border-gray-100 font-bold"
            onClick={() => { setIsOpen(false); if (openOffersModal) openOffersModal(); }}
            style={{ background: 'none', width: '100%', fontSize: '1.2rem', color: 'inherit', cursor: 'pointer' }}
          >
            Offers
          </button>
          <hr />

          <a href="/wishlist" onClick={() => setIsOpen(false)}>Wishlist</a>
          <a href="/login" onClick={() => setIsOpen(false)}>Login</a>
          <a href="/register" onClick={() => setIsOpen(false)}>Register</a>
        </nav>
      </div>
    </>
  )
}
