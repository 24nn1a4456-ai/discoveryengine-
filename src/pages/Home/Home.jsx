import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [searchPrompt, setSearchPrompt] = useState('');

  const samplePrompts = [
    'Wireless noise-canceling headphones for travel under $200',
    ' Lightweight gaming laptop with long battery life',
    'Compact espresso machine for beginner home baristas',
  ];

  const categories = [
    { icon: '', name: 'Electronics & Tech', items: '450k+ items' },
    { icon: '', name: 'Home & Kitchen', items: '320k+ items' },
    { icon: '', name: 'Fashion & Apparel', items: '610k+ items' },
    { icon: '', name: 'Smart Gadgets', items: '180k+ items' },
  ];

  const features = [
    {
      icon: '',
      title: 'Conversational Search',
      desc: 'Describe what you need in plain English instead of fighting complex side-bar filters.',
    },
    {
      icon: '',
      title: 'Instant Side-by-Side',
      desc: 'Automatically summarize reviews, specs, and prices across top platforms.',
    },
    {
      icon: '',
      title: '99.4% Match Accuracy',
      desc: 'Our semantic AI matches products based on true context, budget, and preference.',
    },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchPrompt.trim()) {
      navigate(`/discover?query=${encodeURIComponent(searchPrompt)}`);
    } else {
      navigate('/discover');
    }
  };

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        
        {/* HERO SECTION */}
        <section style={styles.heroSection}>
          <div style={styles.taglineBadge}>✨ THE SMARTER WAY TO SHOP</div>
          
          <h1 style={styles.heroTitle}>
            Find Exactly What You Want, <br />
            <span style={styles.heroGradient}>Without the Effort.</span>
          </h1>

          <p style={styles.heroSub}>
            Stop switching between dozens of tabs. Describe your ideal product in plain language and let AI curate the absolute best choices for you.
          </p>

          {/* INTERACTIVE AI SEARCH BAR */}
          <form onSubmit={handleSearchSubmit} style={styles.searchBarContainer}>
            <span style={{ fontSize: '18px', marginLeft: '6px' }}>🔍</span>
            <input
              type="text"
              placeholder="e.g., Ergonomic office chair under $300 with lumbar support..."
              value={searchPrompt}
              onChange={(e) => setSearchPrompt(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchBtn}>
              Find Matches →
            </button>
          </form>

          {/* SAMPLE PROMPT PILLS */}
          <div style={styles.pillsRow}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Try asking:</span>
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSearchPrompt(prompt.replace(/^[^\s]+\s/, ''))}
                style={styles.promptPill}
              >
                {prompt}
              </button>
            ))}
          </div>
        </section>

        {/* FEATURED CATEGORIES */}
        <section>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>EXPLORE DEPARTMENTS</span>
            <h2 style={styles.sectionTitle}>Shop by Category</h2>
          </div>

          <div style={styles.gridFour}>
            {categories.map((cat, idx) => (
              <div 
                key={idx} 
                style={styles.categoryCard}
                onClick={() => navigate('/categories')}
              >
                <div style={styles.catIcon}>{cat.icon}</div>
                <div>
                  <h3 style={styles.catName}>{cat.name}</h3>
                  <p style={styles.catItems}>{cat.items}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CORE FEATURES GRID */}
        <section>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>POWERED BY INTELLECTUAL AI</span>
            <h2 style={styles.sectionTitle}>Why Shop With Discovery Engine?</h2>
          </div>

          <div style={styles.gridThree}>
            {features.map((feat, idx) => (
              <div key={idx} style={styles.featureCard}>
                <div style={styles.featureIcon}>{feat.icon}</div>
                <h3 style={styles.featureTitle}>{feat.title}</h3>
                <p style={styles.featureDesc}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <section style={styles.ctaBanner}>
          <div style={{ fontSize: '32px' }}></div>
          <h2 style={styles.ctaTitle}>Need a personal shopping assistant?</h2>
          <p style={styles.ctaSub}>
            Chat with our AI Assistant directly to ask questions, compare specs, or get personalized recommendations in real-time.
          </p>
          <button 
            style={styles.ctaBtn}
            onClick={() => navigate('/ai-assistant')}
          >
            Launch AI Assistant →
          </button>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div>
            <h3 style={{ color: '#22d3ee', margin: '0 0 4px 0', fontSize: '18px' }}>Discovery Engine</h3>
            <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>The smarter way to shop.</p>
          </div>
          <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>
            © 2026 Discovery Engine. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// INLINE STYLES ENSURING STABILITY, CLEAN SPACING & RESPONSIVENESS
const styles = {
  container: {
    backgroundColor: '#060b13',
    color: '#f8fafc',
    minHeight: '100vh',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  main: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '60px 24px 80px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '90px',
  },
  heroSection: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '22px',
    paddingTop: '20px',
  },
  taglineBadge: {
    backgroundColor: 'rgba(8, 51, 68, 0.8)',
    border: '1px solid rgba(34, 211, 238, 0.4)',
    color: '#22d3ee',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  heroTitle: {
    fontSize: '52px',
    fontWeight: '800',
    lineHeight: '1.15',
    margin: 0,
    letterSpacing: '-1px',
  },
  heroGradient: {
    background: 'linear-gradient(to right, #22d3ee, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSub: {
    color: '#94a3b8',
    maxWidth: '620px',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: 0,
  },
  searchBarContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    border: '1px solid rgba(34, 211, 238, 0.3)',
    borderRadius: '16px',
    padding: '8px 8px 8px 16px',
    width: '100%',
    maxWidth: '680px',
    gap: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
    marginTop: '10px',
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
    padding: '12px 22px',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  pillsRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '750px',
  },
  promptPill: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid #1e293b',
    color: '#94a3b8',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  sectionTag: {
    color: '#22d3ee',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: '700',
    margin: '6px 0 0 0',
  },
  gridFour: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '18px',
  },
  categoryCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  catIcon: {
    fontSize: '28px',
    backgroundColor: '#030712',
    padding: '10px',
    borderRadius: '12px',
  },
  catName: {
    fontSize: '15px',
    fontWeight: '700',
    margin: 0,
  },
  catItems: {
    color: '#64748b',
    fontSize: '12px',
    margin: '2px 0 0 0',
  },
  gridThree: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  featureCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    border: '1px solid #1e293b',
    borderRadius: '18px',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  featureIcon: {
    fontSize: '26px',
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: '700',
    margin: 0,
  },
  featureDesc: {
    color: '#94a3b8',
    fontSize: '13px',
    lineHeight: '1.6',
    margin: 0,
  },
  ctaBanner: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid rgba(34, 211, 238, 0.25)',
    borderRadius: '24px',
    padding: '44px 24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
  },
  ctaTitle: {
    fontSize: '26px',
    fontWeight: '700',
    margin: 0,
  },
  ctaSub: {
    color: '#94a3b8',
    fontSize: '14px',
    maxWidth: '520px',
    margin: 0,
    lineHeight: '1.5',
  },
  ctaBtn: {
    backgroundColor: '#06b6d4',
    color: '#020617',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '6px',
  },
  footer: {
    borderTop: '1px solid #1e293b',
    backgroundColor: '#030712',
    padding: '30px 24px',
  },
  footerContent: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
};