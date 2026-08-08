import React from 'react';

export default function About() {
  const capabilities = [
    { icon: '🔍', title: 'Natural Language Processing', desc: 'Processes long-form user queries directly without rigid parameter filters.' },
    { icon: '🎯', title: 'Intent Matching', desc: 'Understands budget constraints, product categories, and contextual usage.' },
    { icon: '⚖️', title: 'Multi-Product Compare', desc: 'Analyzes differences in pricing, specs, user ratings, and long-term value.' },
    { icon: '🤖', title: 'Conversational Guidance', desc: 'Real-time assistant answering specific questions before you buy.' }
  ];

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        
        {/* ABOUT HERO */}
        <section style={styles.heroSection}>
          <span style={styles.tag}>OUR MISSION</span>
          <h1 style={styles.title}>About Discovery Engine</h1>
          <p style={styles.desc}>
            We are redefining how shoppers search, compare, and decide on products online using modern AI model architectures.
          </p>
        </section>

        {/* PROBLEM VS SOLUTION GRID */}
        <section style={styles.gridTwo}>
          <div style={{ ...styles.card, borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <span style={{ color: '#f87171', fontSize: '12px', fontWeight: 'bold' }}>🔴 THE PROBLEM</span>
            <h2 style={styles.cardTitle}>Fragmented E-Commerce Search</h2>
            <p style={styles.cardDesc}>
              Traditional shopping search forces users to open 20+ browser tabs, struggle with rigid keyword filters, and manually parse hundreds of conflicting reviews.
            </p>
          </div>

          <div style={{ ...styles.card, borderColor: 'rgba(34, 211, 238, 0.3)' }}>
            <span style={{ color: '#22d3ee', fontSize: '12px', fontWeight: 'bold' }}>⚡ OUR SOLUTION</span>
            <h2 style={styles.cardTitle}>One Unified AI Experience</h2>
            <p style={styles.cardDesc}>
              Discovery Engine analyzes product specs and user intent simultaneously, turning hours of tedious product research into a simple 10-second conversation.
            </p>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={styles.tag}>CORE SYSTEM ARCHITECTURE</span>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0' }}>Engineered for Smarter Discovery</h2>
          </div>

          <div style={styles.gridFour}>
            {capabilities.map((cap, idx) => (
              <div key={idx} style={styles.capCard}>
                <span style={{ fontSize: '24px' }}>{cap.icon}</span>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '8px 0 4px 0' }}>{cap.title}</h3>
                <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.5', margin: 0 }}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* VISION CARD */}
        <section style={styles.visionCard}>
          <span style={styles.tag}>OUR VISION</span>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Making decision-making effortless for everyone.</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', maxWidth: '600px', margin: 0 }}>
            We believe search tools should understand human language natively. Discovery Engine brings discovery, comparison, and assistance under one seamless interface.
          </p>
        </section>

      </main>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#060b13', color: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' },
  main: { maxWidth: '1050px', margin: '0 auto', padding: '60px 24px', display: 'flex', flexDirection: 'column', gap: '80px' },
  heroSection: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' },
  tag: { color: '#22d3ee', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' },
  title: { fontSize: '42px', fontWeight: '800', margin: 0 },
  desc: { color: '#94a3b8', maxWidth: '600px', fontSize: '16px', lineHeight: '1.6', margin: 0 },
  gridTwo: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' },
  card: { backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px' },
  cardTitle: { fontSize: '20px', fontWeight: 'bold', margin: 0 },
  cardDesc: { color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', margin: 0 },
  gridFour: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' },
  capCard: { backgroundColor: 'rgba(15, 23, 42, 0.4)', border: '1px solid #1e293b', borderRadius: '14px', padding: '20px', textAlign: 'left' },
  visionCard: { backgroundColor: 'rgba(15, 23, 42, 0.8)', border: '1px solid #1e293b', borderRadius: '20px', padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }
};