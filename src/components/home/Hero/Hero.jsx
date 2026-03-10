import { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { getImageUrl } from '../../../app/config';
import './Hero.css';

export default function Hero() {
  const [heroImages, setHeroImages] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axiosInstance.get('/settings');
        if (res.data?.data?.heroImages && res.data.data.heroImages.length > 0) {
          setHeroImages(res.data.data.heroImages);
        } else {
          // Fallback static image if CRM hasn't set any
          setHeroImages([{ url: '/images/hero/main-idol.png' }]);
        }
      } catch (error) {
        console.error('Failed to fetch hero images from settings:', error);
        setHeroImages([{ url: '/images/hero/main-idol.png' }]);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (heroImages.length <= 1) return;

    // Change image every 4 seconds
    const interval = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages]);

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <div className="title-top-row">
              <span className="bring-home-text">Bring Home</span>
              <span className="hero-badge">✨ Premium collection</span>
            </div>
            <span className="hero-title-highlight">Divine Blessings</span>
          </h1>
          <p>
            Discover our exquisite collection of Handicrafts idols, meticulously designed to bring peace, prosperity, and spiritual aura to your home.
          </p>
          <div className="hero-buttons">
            <a href="/collections" className="btn btn-primary" style={{ backgroundColor: '#000', color: '#fff' }}>
              Shop Collection →
            </a>
            <a href="https://wa.me/916367929608?text=Hello%20I%20am%20interested%20in%20your%20handcrafted%20idol%20collection"
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: '#fff', color: '#000', border: '1px solid #e0e0e0' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg> Order via Whatsapp
            </a>
          </div>
          <div className="hero-features">
            <div className="feature">
              <span style={{ fontSize: '1.2rem' }}>🛡️</span> Secure Packing
            </div>
            <div className="feature">
              <span style={{ fontSize: '1.2rem' }}>👐</span> Handcrafted
            </div>
            <div className="feature">
              <span style={{ fontSize: '1.2rem' }}>✔️</span> Premium Quality
            </div>
          </div>
        </div>
        <div className="hero-image-container relative w-full flex items-end justify-center" style={{ minHeight: '500px' }}>
          <div className="hero-arch">
            {heroImages.map((img, idx) => (
              <img
                key={idx}
                src={getImageUrl(img.url)}
                alt={`Hero Idol ${idx + 1}`}
                className={`hero-idol-img ${idx === currentIdx ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
