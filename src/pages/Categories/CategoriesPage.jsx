import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Categories() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const categoryList = [
    {
      id: 'laptops',
      title: 'Laptops',
      desc: 'Gaming, work, and everyday laptops',
      count: '12,400+ products',
      icon: '💻',
    },
    {
      id: 'smartphones',
      title: 'Smartphones',
      desc: 'Compare phones by camera, performance, and price',
      count: '8,700+ products',
      icon: '📱',
    },
    {
      id: 'headphones',
      title: 'Headphones',
      desc: 'Wireless, noise cancelling, and gaming audio',
      count: '5,200+ products',
      icon: '🎧',
    },
    {
      id: 'monitors',
      title: 'Monitors',
      desc: 'Gaming, productivity, and professional displays',
      count: '3,800+ products',
      icon: '🖥️',
    },
    {
      id: 'cameras',
      title: 'Cameras',
      desc: 'Cameras, lenses, and photography equipment',
      count: '4,100+ products',
      icon: '📷',
    },
    {
      id: 'gaming',
      title: 'Gaming',
      desc: 'Gaming hardware, accessories, and peripherals',
      count: '9,600+ products',
      icon: '🎮',
    },
  ];

  const filteredCategories = categoryList.filter((cat) =>
    cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/discover?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <main style={styles.container}>
        
        {/* HEADER SECTION */}
        <header style={styles.header}>
          <span style={styles.headerTag}>PRODUCT CATEGORIES</span>
          <h1 style={styles.title}>Explore products</h1>
          <p style={styles.subtitle}>
            Browse products by category or use AI-powered discovery to find exactly what you need.
          </p>
        </header>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearchSubmit} style={styles.searchBar}>
          <span style={{ fontSize: '16px' }}>🔍</span>
          <input
            type="text"
            placeholder="Search products or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchBtn}>
            Search
          </button>
        </form>

        {/* BROWSE BY CATEGORY SECTION */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h2 style={styles.sectionTitle}>Browse by category</h2>
            <p style={styles.sectionSub}>Choose a category to start discovering products.</p>
          </div>

          {/* GRID OF CATEGORIES */}
          <div style={styles.categoryGrid}>
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                style={styles.categoryCard}
                onClick={() => navigate(`/discover?category=${cat.id}`)}
              >
                <div style={styles.cardHeader}>
                  <span style={styles.catIcon}>{cat.icon}</span>
                  <span style={styles.arrowIcon}>→</span>
                </div>
                <div>
                  <h3 style={styles.catTitle}>{cat.title}</h3>
                  <p style={styles.catDesc}>{cat.desc}</p>
                  <span style={styles.catCount}>{cat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <section style={styles.aiBanner}>
          <div>
            <span style={styles.aiTag}>✨ Can't decide?</span>
            <h3 style={styles.aiTitle}>Let AI find the right product for you</h3>
            <p style={styles.aiSub}>
              Describe your budget, requirements, and preferences. Discovery Engine will help narrow down your choices.
            </p>
          </div>
          <button style={styles.askAiBtn} onClick={() => navigate('/ai-assistant')}>
            Ask AI Assistant →
          </button>
        </section>

      </main>
    </div>
  );
}

// STYLES ENSURING PERFECT ALIGNMENT & NO BOTTOM CLUTTER
const styles = {
  pageWrapper: {
    backgroundColor: '#060b13',
    color: '#f8fafc',
    minHeight: '100vh',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    paddingBottom: '80px',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '40px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  headerTag: {
    color: '#22d3ee',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.8px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '800',
    margin: 0,
    letterSpacing: '-0.5px',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '14px',
    margin: 0,
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#0b1322',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    padding: '8px 8px 8px 16px',
    maxWidth: '500px',
  },
  searchInput: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#f8fafc',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
  },
  searchBtn: {
    backgroundColor: '#06b6d4',
    color: '#020617',
    border: 'none',
    padding: '8px 18px',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    margin: 0,
  },
  sectionSub: {
    color: '#64748b',
    fontSize: '13px',
    margin: '4px 0 0 0',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '18px',
    marginTop: '8px',
  },
  categoryCard: {
    backgroundColor: '#0b1322',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catIcon: {
    fontSize: '28px',
    backgroundColor: '#060b13',
    padding: '8px',
    borderRadius: '10px',
  },
  arrowIcon: {
    color: '#64748b',
    fontSize: '16px',
  },
  catTitle: {
    fontSize: '18px',
    fontWeight: '700',
    margin: 0,
  },
  catDesc: {
    color: '#94a3b8',
    fontSize: '13px',
    margin: '6px 0 12px 0',
    lineHeight: '1.4',
  },
  catCount: {
    color: '#22d3ee',
    fontSize: '12px',
    fontWeight: '600',
  },
  aiBanner: {
    backgroundColor: '#0b1322',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    padding: '28px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px',
    gap: '20px',
    flexWrap: 'wrap',
  },
  aiTag: {
    color: '#22d3ee',
    fontSize: '12px',
    fontWeight: '700',
    display: 'block',
    marginBottom: '4px',
  },
  aiTitle: {
    fontSize: '20px',
    fontWeight: '700',
    margin: 0,
  },
  aiSub: {
    color: '#94a3b8',
    fontSize: '13px',
    margin: '6px 0 0 0',
    maxWidth: '550px',
  },
  askAiBtn: {
    backgroundColor: '#06b6d4',
    color: '#020617',
    border: 'none',
    padding: '12px 22px',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
};