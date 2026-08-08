import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate successful login and redirect to home
    if (identifier && password) {
      navigate('/');
    }
  };

  return (
    <div style={styles.pageWrapper}>
      
      {/* BACK BUTTON */}
      <div style={styles.topBar}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {/* CENTERED LOGIN CARD */}
      <div style={styles.loginCard}>
        
        {/* LOGO & TITLE */}
        <div style={styles.brandHeader}>
          <div style={styles.logoBadge}>✨</div>
          <h1 style={styles.title}>Discovery Engine</h1>
          <p style={styles.subtitle}>Sign in to access personalized AI shopping recommendations</p>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} style={styles.form}>
          
          {/* IDENTIFIER FIELD */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Identifier (Email, Phone or ID)</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>✉️</span>
              <input
                type="text"
                placeholder="e.g. user@company.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                style={styles.input}
                required
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button type="submit" style={styles.submitBtn}>
            Login Portal →
          </button>
        </form>

        {/* DEFAULT HINT FOOTER */}
        <p style={styles.hintText}>Default password for demo accounts is 123456</p>

      </div>
    </div>
  );
}

// STYLES matching the Employee Portal screenshot & Discovery Engine Theme
const styles = {
  pageWrapper: {
    backgroundColor: '#060b13',
    color: '#f8fafc',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '20px',
    position: 'relative',
  },
  topBar: {
    position: 'absolute',
    top: '24px',
    left: '24px',
  },
  backBtn: {
    backgroundColor: '#0b1322',
    border: '1px solid #1e293b',
    color: '#22d3ee',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  loginCard: {
    backgroundColor: '#0b1322',
    border: '1px solid #1e293b',
    borderRadius: '20px',
    padding: '40px 36px',
    maxWidth: '520px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
  },
  brandHeader: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  logoBadge: {
    fontSize: '28px',
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    border: '1px solid rgba(34, 211, 238, 0.3)',
    borderRadius: '16px',
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px auto',
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    margin: '0 0 6px 0',
    color: '#f8fafc',
  },
  subtitle: {
    fontSize: '13px',
    color: '#64748b',
    margin: 0,
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#94a3b8',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#060b13',
    border: '1px solid #1e293b',
    borderRadius: '10px',
    padding: '10px 14px',
    gap: '10px',
  },
  inputIcon: {
    fontSize: '14px',
    opacity: 0.7,
  },
  input: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#f8fafc',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
  },
  submitBtn: {
    backgroundColor: '#06b6d4',
    color: '#020617',
    border: 'none',
    padding: '12px',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'all 0.2s ease',
  },
  hintText: {
    fontSize: '11px',
    color: '#475569',
    marginTop: '20px',
    textAlign: 'center',
  },
};