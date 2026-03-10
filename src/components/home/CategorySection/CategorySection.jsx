import { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { getImageUrl } from '../../../app/config';
import './CategorySection.css';

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/collections');
        setCategories(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch collections:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="category-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">MRM Collection</span>
          <h2>Browser by Category</h2>
          <div className="section-header-underline"></div>
        </div>

        <div className="category-grid">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading categories...</div>
          ) : Array.isArray(categories) && categories.length > 0 ? categories.map((category) => (
            <a key={category._id || category.id} href={`/collections?type=${category.slug || (category.name ? category.name.toLowerCase() : '')}`} className="category-card">
              <div className="category-image">
                <img src={getImageUrl(category.image)} alt={category.name || 'Category'} loading="lazy" decoding="async" />
              </div>
              <h3>{category.name || 'Unnamed Category'}</h3>
            </a>
          )) : (
            <div style={{ textAlign: 'center', padding: '2rem', gridColumn: '1 / -1' }}>No collections found.</div>
          )}
        </div>
      </div>
    </section>
  );
}
