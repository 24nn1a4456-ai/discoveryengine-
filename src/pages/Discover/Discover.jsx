import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Discover() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('Gaming laptop under $1000');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [comparedProducts, setComparedProducts] = useState(['Acer Nitro V Gaming Laptop']);

  const categories = ['All', 'Laptops', 'Phones', 'Headphones', 'Monitors'];

  const products = [
    {
      id: '1',
      name: 'Acer Nitro V Gaming Laptop',
      matchScore: '96%',
      price: '$899',
      specs: 'RTX 4050 • 16GB RAM • 512GB SSD',
      rating: 4.6,
      reviews: '1,284',
      badge: 'Good value',
      icon: '💻',
    },
    {
      id: '2',
      name: 'Sony WH-1000XM5',
      matchScore: '94%',
      price: '$349',
      specs: 'ANC • 30hr Battery • Wireless',
      rating: 4.8,
      reviews: '5,621',
      badge: 'Good value',
      icon: '🎧',
    },
    {
      id: '3',
      name: 'ASUS TUF Gaming A15',
      matchScore: '92%',
      price: '$999',
      specs: 'RTX 4060 • 16GB RAM • 512GB SSD',
      rating: 4.7,
      reviews: '2,105',
      badge: 'Good value',
      icon: '💻',
    },
    {
      id: '4',
      name: 'LG UltraGear Gaming Monitor',
      matchScore: '90%',
      price: '$399',
      specs: '27-inch • 144Hz • 1ms • QHD',
      rating: 4.6,
      reviews: '1,756',
      badge: 'Good value',
      icon: '🖥️',
    },
    {
      id: '5',
      name: 'Google Pixel 9',
      matchScore: '89%',
      price: '$799',
      specs: '128GB • OLED Display • Advanced Camera',
      rating: 4.7,
      reviews: '3,421',
      badge: 'Good value',
      icon: '📱',
    },
  ];

  const toggleCompare = (productName) => {
    if (comparedProducts.includes(productName)) {
      setComparedProducts(comparedProducts.filter((p) => p !== productName));
    } else if (comparedProducts.length < 3) {
      setComparedProducts([...comparedProducts, productName]);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <main style={styles.container}>
        
        {/* HEADER SECTION */}
        <header style={styles.header}>
          <div>
            <span style={styles.subHeaderTag}>✨ AI PRODUCT DISCOVERY</span>
            <h1 style={styles.title}>Find the right product</h1>
            <p style={styles.subtitle}>
              Describe what you need in your own words. Our AI analyzes your requirements and ranks products based on price, features, ratings, and relevance.
            </p>
          </div>
          <div style={styles.headerRight}>
            <span style={styles.disclaimerTag}>DISCOVERY ENGINE</span>
            <span style={styles.disclaimerSub}>AI-powered recommendations</span>
          </div>
        </header>

        {/* SEARCH BOX */}
        <section style={styles.searchCard}>
          <div style={styles.searchLabelRow}>
            <span style={styles.searchLabel}>What are you looking for?</span>
            <span style={styles.searchHelp}>Use natural language — AI will understand your intent.</span>
          </div>

          <form onSubmit={(e) => e.preventDefault()} style={styles.searchForm}>
            <div style={styles.inputWrapper}>
              <span style={{ fontSize: '16px' }}>🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Example: Gaming laptop under $1000 with RTX graphics"
                style={styles.searchInput}
              />
            </div>
            <button type="submit" style={styles.searchBtn}>
              Find Products
            </button>
          </form>

          <div style={styles.pillsRow}>
            <span style={styles.pillLabel}>Try:</span>
            <button onClick={() => setSearchQuery('Gaming laptop under $1000')} style={styles.pillBtn}>
              Gaming laptop under $1000
            </button>
            <button onClick={() => setSearchQuery('Best phone for photography')} style={styles.pillBtn}>
              Best phone for photography
            </button>
            <button onClick={() => setSearchQuery('Wireless headphones')} style={styles.pillBtn}>
              Wireless headphones
            </button>
          </div>
        </section>

        {/* MAIN RESULTS GRID: FILTERS (LEFT) & PRODUCTS (RIGHT) */}
        <div style={styles.resultsGrid}>
          
          {/* LEFT SIDEBAR FILTERS */}
          <aside style={styles.sidebar}>
            <div style={styles.filterHeader}>
              <span style={styles.filterTitle}>Filters</span>
              <button style={styles.resetBtn} onClick={() => setSelectedCategory('All')}>
                Reset
              </button>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterGroupLabel}>CATEGORY</label>
              <div style={styles.categoryList}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      ...styles.categoryBtn,
                      backgroundColor: selectedCategory === cat ? 'rgba(34, 211, 238, 0.15)' : 'transparent',
                      color: selectedCategory === cat ? '#22d3ee' : '#94a3b8',
                      fontWeight: selectedCategory === cat ? '600' : '400',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterGroupLabel}>PRICE</label>
              <div style={styles.priceRow}>
                <input type="text" placeholder="Min" style={styles.priceInput} />
                <input type="text" placeholder="Max" style={styles.priceInput} />
              </div>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterGroupLabel}>MINIMUM RATING</label>
              <div style={styles.radioList}>
                <label style={styles.radioLabel}><input type="radio" name="rating" /> 4.5+ ★</label>
                <label style={styles.radioLabel}><input type="radio" name="rating" /> 4.0+ ★</label>
                <label style={styles.radioLabel}><input type="radio" name="rating" defaultChecked /> Any rating</label>
              </div>
            </div>
          </aside>

          {/* RIGHT PRODUCT LIST */}
          <section style={styles.productSection}>
            
            <div style={styles.resultsHeader}>
              <div>
                <span style={styles.resultsTag}>SEARCH RESULTS FOR</span>
                <h2 style={styles.queryTitle}>"{searchQuery}"</h2>
              </div>
              <div style={styles.sortBox}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{products.length} products found</span>
                <select style={styles.sortSelect}>
                  <option>Best Match</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Highest Rated</option>
                </select>
              </div>
            </div>

            {/* AI RECOMMENDATION BANNER */}
            <div style={styles.aiBanner}>
              <span style={{ fontSize: '18px' }}>✨</span>
              <div>
                <strong style={{ color: '#22d3ee', fontSize: '14px' }}>AI Recommendation</strong>
                <p style={{ color: '#94a3b8', fontSize: '12px', margin: '2px 0 0 0' }}>
                  Based on your search, these products offer the strongest combination of price, specifications, ratings, and overall value.
                </p>
              </div>
            </div>

            {/* PRODUCT CARDS */}
            <div style={styles.productList}>
              {products.map((item) => {
                const isCompared = comparedProducts.includes(item.name);
                return (
                  <div key={item.id} style={styles.productCard}>
                    <div style={styles.cardHeader}>
                      <span style={styles.matchBadge}>{item.matchScore} AI match</span>
                      <div style={styles.priceBox}>
                        <span style={styles.priceText}>{item.price}</span>
                        <span style={styles.matchText}>Best available match</span>
                      </div>
                    </div>

                    <div style={styles.cardBody}>
                      <div style={styles.productIcon}>{item.icon}</div>
                      <div style={styles.productDetails}>
                        <h3 style={styles.productName}>{item.name}</h3>
                        <p style={styles.productSpecs}>{item.specs}</p>
                        
                        <div style={styles.ratingRow}>
                          <span style={styles.starText}>★ {item.rating}</span>
                          <span style={styles.reviewsText}>{item.reviews} reviews</span>
                          <span style={styles.valueBadge}>✓ {item.badge}</span>
                        </div>

                        <div style={styles.cardActions}>
                          <button style={styles.viewBtn}>View Product</button>
                          <button
                            style={{
                              ...styles.compareBtn,
                              color: isCompared ? '#22d3ee' : '#94a3b8',
                              borderColor: isCompared ? '#22d3ee' : '#334155',
                            }}
                            onClick={() => toggleCompare(item.name)}
                          >
                            {isCompared ? '✓ Added to Compare' : '+ Compare'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* COMPARE BAR */}
            {comparedProducts.length > 0 && (
              <div style={styles.compareBar}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '13px' }}>{comparedProducts.length} product selected</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Select up to 3 products to compare.</div>
                </div>
                <div style={styles.comparePills}>
                  {comparedProducts.map((p) => (
                    <span key={p} style={styles.selectedPill}>
                      {p} <button style={styles.removePillBtn} onClick={() => toggleCompare(p)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* NEED HELP CHOOSING BANNER */}
            <div style={styles.helpBanner}>
              <div>
                <h4 style={styles.helpTitle}>Need help choosing?</h4>
                <p style={styles.helpSub}>Compare shortlisted products and ask AI which one fits your requirements best.</p>
              </div>
              <button style={styles.askAiBtn} onClick={() => navigate('/ai-assistant')}>
                Ask AI Assistant →
              </button>
            </div>

          </section>
        </div>

      </main>
    </div>
  );
}

// INLINE STYLES ENSURING PERFECT ALIGNMENT & NO CLUTTER
const styles = {
  pageWrapper: {
    backgroundColor: '#060b13',
    color: '#f8fafc',
    minHeight: '100vh',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    paddingBottom: '60px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
  },
  subHeaderTag: {
    color: '#22d3ee',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    margin: '4px 0 8px 0',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '14px',
    maxWidth: '680px',
    margin: 0,
    lineHeight: '1.5',
  },
  headerRight: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  disclaimerTag: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: '0.5px',
  },
  disclaimerSub: {
    fontSize: '12px',
    color: '#22d3ee',
    fontWeight: '500',
  },
  searchCard: {
    backgroundColor: '#0b1322',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  searchLabelRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  searchLabel: {
    fontWeight: '700',
    fontSize: '14px',
  },
  searchHelp: {
    fontSize: '12px',
    color: '#64748b',
  },
  searchForm: {
    display: 'flex',
    gap: '12px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#060b13',
    border: '1px solid #334155',
    borderRadius: '10px',
    padding: '10px 14px',
    flex: 1,
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
    padding: '0 24px',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer',
  },
  pillsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  pillLabel: {
    fontSize: '12px',
    color: '#64748b',
  },
  pillBtn: {
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b',
    color: '#94a3b8',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: '220px 1fr',
    gap: '24px',
  },
  sidebar: {
    backgroundColor: '#0b1322',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    padding: '20px',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  filterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterTitle: {
    fontWeight: '700',
    fontSize: '14px',
  },
  resetBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#22d3ee',
    fontSize: '12px',
    cursor: 'pointer',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  filterGroupLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: '0.5px',
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  categoryBtn: {
    textAlign: 'left',
    border: 'none',
    padding: '8px 10px',
    borderRadius: '8px',
    fontSize: '13px',
    cursor: 'pointer',
  },
  priceRow: {
    display: 'flex',
    gap: '8px',
  },
  priceInput: {
    width: '100%',
    backgroundColor: '#060b13',
    border: '1px solid #334155',
    color: '#f8fafc',
    padding: '6px 8px',
    borderRadius: '6px',
    fontSize: '12px',
  },
  radioList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  radioLabel: {
    fontSize: '12px',
    color: '#94a3b8',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
  },
  productSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  resultsTag: {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: '700',
  },
  queryTitle: {
    fontSize: '20px',
    fontWeight: '700',
    margin: '2px 0 0 0',
  },
  sortBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  sortSelect: {
    backgroundColor: '#0b1322',
    border: '1px solid #334155',
    color: '#f8fafc',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '12px',
  },
  aiBanner: {
    backgroundColor: 'rgba(8, 51, 68, 0.4)',
    border: '1px solid rgba(34, 211, 238, 0.3)',
    borderRadius: '12px',
    padding: '14px 18px',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  productList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  productCard: {
    backgroundColor: '#0b1322',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    padding: '18px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchBadge: {
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    color: '#22d3ee',
    fontSize: '12px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '20px',
  },
  priceBox: {
    textAlign: 'right',
  },
  priceText: {
    fontSize: '20px',
    fontWeight: '800',
    display: 'block',
  },
  matchText: {
    fontSize: '11px',
    color: '#64748b',
  },
  cardBody: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  productIcon: {
    fontSize: '32px',
    backgroundColor: '#060b13',
    padding: '12px',
    borderRadius: '12px',
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: '16px',
    fontWeight: '700',
    margin: 0,
  },
  productSpecs: {
    color: '#94a3b8',
    fontSize: '12px',
    margin: '4px 0 10px 0',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '12px',
    marginBottom: '14px',
  },
  starText: {
    color: '#facc15',
    fontWeight: '700',
  },
  reviewsText: {
    color: '#64748b',
  },
  valueBadge: {
    color: '#34d399',
    fontWeight: '500',
  },
  cardActions: {
    display: 'flex',
    gap: '10px',
  },
  viewBtn: {
    backgroundColor: '#06b6d4',
    color: '#020617',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '12px',
    cursor: 'pointer',
  },
  compareBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #334155',
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '12px',
    cursor: 'pointer',
  },
  compareBar: {
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  comparePills: {
    display: 'flex',
    gap: '8px',
  },
  selectedPill: {
    backgroundColor: '#1e293b',
    color: '#22d3ee',
    fontSize: '12px',
    padding: '4px 10px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  removePillBtn: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '14px',
  },
  helpBanner: {
    backgroundColor: '#0b1322',
    border: '1px solid #1e293b',
    borderRadius: '14px',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
  },
  helpTitle: {
    fontSize: '15px',
    fontWeight: '700',
    margin: 0,
  },
  helpSub: {
    color: '#94a3b8',
    fontSize: '12px',
    margin: '4px 0 0 0',
  },
  askAiBtn: {
    backgroundColor: '#0f172a',
    color: '#22d3ee',
    border: '1px solid rgba(34, 211, 238, 0.3)',
    padding: '10px 18px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '12px',
    cursor: 'pointer',
  },
};