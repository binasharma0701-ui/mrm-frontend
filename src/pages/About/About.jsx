import React, { useEffect, useState } from 'react';
import { GiLotus, GiAnvil } from 'react-icons/gi';
import { FaQuoteLeft } from 'react-icons/fa';
import './About.css';

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Open at top
    fetchAboutUsData();
  }, []);

  const fetchAboutUsData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/aboutus`);
      if (res.ok) {
        const data = await res.json();
        setAboutData(data);
      }
    } catch (error) {
      console.error('Error fetching About Us data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    return `${apiUrl}${path}`;
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <span className="est-badge">EST. 1980</span>
          <h1>{aboutData?.heroTitle || 'Crafting Divinity in Every Detail'}</h1>
          <p>
            {aboutData?.heroDescription || 'Bringing the sacred presence of the divine into your home through timeless craftry.'}
          </p>
        </div>
      </section>

      {/* The Art of Devotion Section */}
      <section className="about-devotion container">
        <div className="section-icon">
          <GiLotus />
        </div>
        <h2>The Art of Devotion</h2>
        <p>
          {aboutData?.content
            ? aboutData.content
            : "At MRM Moorti Arts, we don't just create statues; we breathe life into stone and metal. With a legacy spanning over four decades, our family of artisans has dedicated their lives to the spiritual craft of sculpting Hindu religious idols. Every curve, every ornament, and every expression is meticulously carved to reflect the profound serenity of the gods."
          }
        </p>
      </section>

      {/* Exquisite Materials Section */}
      <section className="about-materials">
        <div className="container">
          <div className="section-icon">
            <GiAnvil />
          </div>
          <h2>Exquisite Materials</h2>
          <p className="materials-desc">
            Our commitment to quality begins with the source. We exclusively use premium{' '}
            <strong>Makrana Marble</strong>, known for its enduring purity and luminous finish,
            and high-grade <strong>Panchdhatu Brass</strong>. These materials ensure that each idol
            remains a centerpiece of your altar for generations.
          </p>

          <div className="materials-cards">
            <div className="material-card">
              <h4>Pure Marble</h4>
              <p>Hand-selected for clarity and strength.</p>
            </div>
            <div className="material-card">
              <h4>Fine Brass</h4>
              <p>Traditional casting for intricate detail.</p>
            </div>
          </div>

          <div className="carving-image">
            <img
              src={aboutData?.image1 ? getImageUrl(aboutData.image1) : "https://images.unsplash.com/photo-1544813545-4827233fc5ce?auto=format&fit=crop&q=80&w=800"}
              alt="Artisan hands carving a statue"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission container">
        <div className="quote-icon">
          <FaQuoteLeft />
        </div>
        <blockquote>
          "{aboutData?.missionStatement || 'Our mission is to spread spirituality and devotion across the world by providing devotees with idols that truly embody the divine essence they represent.'}"
        </blockquote>
        <div className="mission-label">
          <hr />
          <span>OUR MISSION</span>
          <hr />
        </div>
      </section>

      {/* Legacy/Secondary Image Section (If it exists) */}
      {aboutData?.image2 && (
        <section className="container" style={{ textAlign: 'center', margin: '4rem auto' }}>
          <img
            src={getImageUrl(aboutData.image2)}
            alt="Legacy and craftsmanship"
            style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          />
        </section>
      )}

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container stats-grid">
          <div className="stat-item">
            <h3>{aboutData?.stat1Value || '40+'}</h3>
            <p>{aboutData?.stat1Label || 'YEARS OF LEGACY'}</p>
          </div>
          <div className="stat-item">
            <h3>{aboutData?.stat2Value || '50k+'}</h3>
            <p>{aboutData?.stat2Label || 'IDOLS CRAFTED'}</p>
          </div>
          <div className="stat-item">
            <h3>{aboutData?.stat3Value || '120+'}</h3>
            <p>{aboutData?.stat3Label || 'MASTER ARTISANS'}</p>
          </div>
          <div className="stat-item">
            <h3>{aboutData?.stat4Value || 'Global'}</h3>
            <p>{aboutData?.stat4Label || 'DEVOTEES SERVED'}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
