import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Simulated authentication state (default set to logged in)
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Sequential page order (Left-to-Right)
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Discover', path: '/discover' },
    { name: 'Categories', path: '/categories' },
    { name: 'AI Assistant', path: '/ai-assistant' },
    { name: 'About', path: '/about' },
  ];

  // Find current index for Prev / Next navigation
  const currentIndex = navItems.findIndex((item) => item.path === location.pathname);
  
  const prevPage = currentIndex > 0 ? navItems[currentIndex - 1] : null;
  const nextPage = currentIndex !== -1 && currentIndex < navItems.length - 1 ? navItems[currentIndex + 1] : null;

  // Handle Logout / Login Button Click
  const handleAuthAction = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav style={styles.navContainer}>
      <div style={styles.navInner}>
        
        {/* BRAND & TAGLINE */}
        <div style={styles.brandBox} onClick={() => navigate('/')}>
          <div style={styles.logoBadge}>✨</div>
          <div>
            <div style={styles.brandName}>Discovery Engine</div>
            <div style={styles.brandTagline}>The smarter way to shop.</div>
          </div>
        </div>

        {/* DIRECTIONAL PAGE CONTROLS (PREV / NEXT) */}
        <div style={styles.dirNavGroup}>
          <button
            style={{
              ...styles.dirBtn,
              opacity: prevPage ? 1 : 0.3,
              cursor: prevPage ? 'pointer' : 'not-allowed',
            }}
            disabled={!prevPage}
            onClick={() => prevPage && navigate(prevPage.path)}
            title={prevPage ? `Go to ${prevPage.name}` : 'First Page'}
          >
            ← Prev
          </button>

          {/* MAIN NAVIGATION TABS */}
          <div style={styles.navLinks}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  style={{
                    ...styles.navLink,
                    color: isActive ? '#22d3ee' : '#94a3b8',
                    borderBottom: isActive ? '2px solid #22d3ee' : '2px solid transparent',
                    fontWeight: isActive ? '700' : '500',
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <button
            style={{
              ...styles.dirBtn,
              opacity: nextPage ? 1 : 0.3,
              cursor: nextPage ? 'pointer' : 'not-allowed',
            }}
            disabled={!nextPage}
            onClick={() => nextPage && navigate(nextPage.path)}
            title={nextPage ? `Go to ${nextPage.name}` : 'Last Page'}
          >
            Next →
          </button>
        </div>

        {/* LOGOUT / LOGIN ACTION BUTTON */}
        <button
          onClick={handleAuthAction}
          style={{
            ...styles.authBtn,
            backgroundColor: isLoggedIn ? 'rgba(239, 68, 68, 0.15)' : '#06b6d4',
            color: isLoggedIn ? '#f87171' : '#020617',
            border: isLoggedIn ? '1px solid rgba(239, 68, 68, 0.4)' : 'none',
          }}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>

      </div>
    </nav>
  );
}

const styles = {
  navContainer: {
    backgroundColor: 'rgba(6, 11, 19, 0.95)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backdropFilter: 'blur(12px)',
  },
  navInner: {
    maxWidth: '1240px',
    margin: '0 auto',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  logoBadge: {
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    border: '1px solid rgba(34, 211, 238, 0.3)',
    borderRadius: '10px',
    padding: '6px 10px',
    fontSize: '16px',
  },
  brandName: {
    fontSize: '17px',
    fontWeight: '800',
    color: '#f8fafc',
    letterSpacing: '-0.3px',
  },
  brandTagline: {
    fontSize: '11px',
    color: '#22d3ee',
    fontWeight: '500',
    marginTop: '-2px',
  },
  dirNavGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    padding: '4px 12px',
    borderRadius: '30px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  dirBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#22d3ee',
    fontSize: '12px',
    fontWeight: '700',
    padding: '6px 10px',
    borderRadius: '14px',
    transition: 'all 0.2s ease',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  navLink: {
    textDecoration: 'none',
    fontSize: '13px',
    padding: '6px 4px',
    transition: 'all 0.2s ease',
  },
  authBtn: {
    padding: '8px 20px',
    borderRadius: '20px',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};