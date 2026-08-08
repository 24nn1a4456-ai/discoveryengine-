import React, { useState } from 'react';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hi! I'm your AI shopping assistant. Tell me what you're looking for, your budget, and any features that matter to you.",
    },
  ]);
  const [inputText, setInputText] = useState('');

  const recommendations = [
    {
      id: 1,
      name: 'Acer Nitro V Gaming Laptop',
      specs: 'RTX 4050 • 16GB RAM • 512GB SSD',
      match: '96%',
      price: '$899',
      rating: 4.6,
      why: 'Strong gaming performance, RTX graphics, and excellent value under your budget.',
      icon: '💻',
    },
    {
      id: 2,
      name: 'Lenovo LOQ Gaming Laptop',
      specs: 'RTX 4050 • 16GB RAM • 512GB SSD',
      match: '93%',
      price: '$949',
      rating: 4.5,
      why: 'Balanced performance and cooling with a strong price-to-performance ratio.',
      icon: '💻',
    },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: inputText }];
    setMessages(newMessages);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'I updated your recommendations based on your preferences! Check out the products on the right panel.',
        },
      ]);
    }, 1000);
  };

  return (
    <div style={styles.pageWrapper}>
      <main style={styles.container}>
        
        {/* PAGE HEADER */}
        <header style={styles.header}>
          <div style={styles.headerTitleRow}>
            <span style={{ fontSize: '24px' }}>🤖</span>
            <div>
              <span style={styles.headerTag}>AI SHOPPING ASSISTANT</span>
              <h1 style={styles.title}>Your personal product advisor</h1>
            </div>
          </div>
          <p style={styles.subtitle}>
            Describe what you need in natural language. The AI assistant helps you understand your requirements, find relevant products, and explain why they match.
          </p>
        </header>

        {/* MAIN TWO-COLUMN WORKSPACE */}
        <div style={styles.workspaceGrid}>
          
          {/* LEFT CHAT INTERFACE */}
          <section style={styles.chatSection}>
            
            {/* CHAT HEADER */}
            <div style={styles.chatHeader}>
              <div style={styles.aiBrand}>
                <span style={{ fontSize: '18px' }}>✨</span>
                <div>
                  <div style={styles.aiName}>Discovery AI</div>
                  <div style={styles.aiStatus}>● Ready to help</div>
                </div>
              </div>
              <span style={styles.badgeTag}>AI Assistant</span>
            </div>

            {/* CHAT MESSAGES AREA */}
            <div style={styles.messagesBox}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.messageBubble,
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    backgroundColor: msg.sender === 'user' ? '#06b6d4' : '#0f172a',
                    color: msg.sender === 'user' ? '#020617' : '#f8fafc',
                    border: msg.sender === 'user' ? 'none' : '1px solid #1e293b',
                  }}
                >
                  {msg.text}
                </div>
              ))}

              {/* AI ANALYSIS BAR */}
              <div style={styles.analysisBox}>
                <div style={styles.analysisTitle}>🧠 AI Analysis</div>
                <div style={styles.analysisRow}>
                  <div>
                    <span style={styles.analysisLabel}>BUDGET</span>
                    <span style={styles.analysisValue}>Under $1,000</span>
                  </div>
                  <div>
                    <span style={styles.analysisLabel}>CATEGORY</span>
                    <span style={styles.analysisValue}>Gaming laptop</span>
                  </div>
                  <div>
                    <span style={styles.analysisLabel}>PRIORITY</span>
                    <span style={styles.analysisValue}>Performance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CHAT INPUT FORM */}
            <form onSubmit={handleSendMessage} style={styles.inputContainer}>
              <input
                type="text"
                placeholder="Type your message or shopping needs here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={styles.chatInput}
              />
              <button type="submit" style={styles.sendBtn}>
                Send Message →
              </button>
            </form>
          </section>

          {/* RIGHT SIDEBAR: AI RECOMMENDATIONS */}
          <aside style={styles.sidebarSection}>
            <div style={styles.sidebarHeader}>
              <span style={styles.sidebarTag}>AI RECOMMENDATIONS</span>
              <h2 style={styles.sidebarTitle}>Top matches</h2>
              <p style={styles.sidebarSub}>Products ranked according to your requirements and preferences.</p>
            </div>

            {/* RECOMMENDATION CARDS */}
            <div style={styles.recList}>
              {recommendations.map((item) => (
                <div key={item.id} style={styles.recCard}>
                  <div style={styles.recCardHeader}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={styles.productIcon}>{item.icon}</span>
                      <div>
                        <h3 style={styles.productName}>{item.name}</h3>
                        <span style={styles.productSpecs}>{item.specs}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={styles.matchScore}>{item.match}</span>
                      <span style={styles.matchLabel}>Match</span>
                    </div>
                  </div>

                  <div style={styles.priceRow}>
                    <span style={styles.ratingText}>★ {item.rating}</span>
                    <span style={styles.priceText}>{item.price}</span>
                  </div>

                  <div style={styles.whyBox}>
                    <strong style={{ color: '#94a3b8' }}>Why it matches: </strong>
                    {item.why}
                  </div>

                  <button style={styles.viewBtn}>View recommendation</button>
                </div>
              ))}
            </div>

            {/* WHAT AI CAN DO BOX */}
            <div style={styles.infoBox}>
              <div style={styles.infoTitle}>WHAT AI CAN DO</div>
              <ul style={styles.infoList}>
                <li>🔍 Understand natural language</li>
                <li>🎯 Match products to requirements</li>
                <li>⚖️ Compare products</li>
                <li>💡 Explain recommendations</li>
              </ul>
            </div>
          </aside>

        </div>

      </main>
    </div>
  );
}

// INLINE STYLES ENSURING PERFECT ALIGNMENT & NO BOTTOM CLUTTER
const styles = {
  pageWrapper: {
    backgroundColor: '#060b13',
    color: '#f8fafc',
    minHeight: '100vh',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    paddingBottom: '40px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  headerTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  headerTag: {
    color: '#22d3ee',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.8px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    margin: 0,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '13px',
    margin: 0,
    maxWidth: '750px',
  },
  workspaceGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '20px',
    alignItems: 'start',
  },
  chatSection: {
    backgroundColor: '#0b1322',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    height: '620px',
    overflow: 'hidden',
  },
  chatHeader: {
    padding: '16px 20px',
    borderBottom: '1px solid #1e293b',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
  },
  aiBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  aiName: {
    fontWeight: '700',
    fontSize: '14px',
  },
  aiStatus: {
    fontSize: '11px',
    color: '#34d399',
  },
  badgeTag: {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: '600',
  },
  messagesBox: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  messageBubble: {
    padding: '12px 16px',
    borderRadius: '12px',
    maxWidth: '80%',
    fontSize: '13px',
    lineHeight: '1.5',
    fontWeight: '500',
  },
  analysisBox: {
    backgroundColor: '#060b13',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    padding: '14px 16px',
    marginTop: '10px',
  },
  analysisTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#22d3ee',
    marginBottom: '10px',
  },
  analysisRow: {
    display: 'flex',
    gap: '24px',
  },
  analysisLabel: {
    display: 'block',
    fontSize: '10px',
    color: '#64748b',
    fontWeight: '700',
  },
  analysisValue: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#f8fafc',
  },
  inputContainer: {
    padding: '14px 16px',
    borderTop: '1px solid #1e293b',
    display: 'flex',
    gap: '10px',
    backgroundColor: '#0b1322',
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#060b13',
    border: '1px solid #334155',
    borderRadius: '10px',
    padding: '10px 14px',
    color: '#f8fafc',
    fontSize: '13px',
    outline: 'none',
  },
  sendBtn: {
    backgroundColor: '#06b6d4',
    color: '#020617',
    border: 'none',
    padding: '0 18px',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '12px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  sidebarSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sidebarHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  sidebarTag: {
    color: '#22d3ee',
    fontSize: '11px',
    fontWeight: '700',
  },
  sidebarTitle: {
    fontSize: '20px',
    fontWeight: '700',
    margin: 0,
  },
  sidebarSub: {
    color: '#64748b',
    fontSize: '12px',
    margin: 0,
  },
  recList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  recCard: {
    backgroundColor: '#0b1322',
    border: '1px solid #1e293b',
    borderRadius: '14px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  recCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productIcon: {
    fontSize: '20px',
    backgroundColor: '#060b13',
    padding: '6px',
    borderRadius: '8px',
  },
  productName: {
    fontSize: '14px',
    fontWeight: '700',
    margin: 0,
  },
  productSpecs: {
    fontSize: '11px',
    color: '#64748b',
    display: 'block',
  },
  matchScore: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#22d3ee',
    display: 'block',
  },
  matchLabel: {
    fontSize: '10px',
    color: '#64748b',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingText: {
    color: '#facc15',
    fontSize: '12px',
    fontWeight: '700',
  },
  priceText: {
    fontSize: '16px',
    fontWeight: '800',
  },
  whyBox: {
    fontSize: '11px',
    color: '#94a3b8',
    backgroundColor: '#060b13',
    padding: '8px 10px',
    borderRadius: '8px',
    lineHeight: '1.4',
  },
  viewBtn: {
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    color: '#22d3ee',
    border: '1px solid rgba(34, 211, 238, 0.3)',
    padding: '8px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
  },
  infoBox: {
    backgroundColor: '#0b1322',
    border: '1px solid #1e293b',
    borderRadius: '14px',
    padding: '16px',
  },
  infoTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#64748b',
    marginBottom: '8px',
  },
  infoList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    fontSize: '12px',
    color: '#94a3b8',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
};