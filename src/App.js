import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  // ===== Chat state =====
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "👋 Hi! I'm the QAAS AI assistant. Ask me anything about our services or how we can help transform your business with AI.", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ===== Send message to backend =====
  const sendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    // Add user message
    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setInputValue('');
    setIsLoading(true);

    // --- REPLACE WITH YOUR BACKEND URL ---
    const API_URL = 'https://your-backend-url.com/chat';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) throw new Error('Network error');

      const data = await response.json();
      const reply = data.reply || data.response || data.message || 'Sorry, I didn\'t understand that.';
      
      setMessages(prev => [...prev, { text: reply, sender: 'ai' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        text: '⚠️ Sorry, I\'m having trouble connecting. Please try again later.', 
        sender: 'ai' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // ===== Handle Enter key =====
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="app">
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">QAAS<span>Lab</span></div>
          <nav>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact" className="nav-cta">Contact</a>
          </nav>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <h1>AI Integration &amp; <span>Business Transformation</span></h1>
          <p>
            We embed AI into your workflows — turning potential into measurable performance.
            From custom agents to team enablement, we make AI work for <em>your</em> business.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">Let's Talk</a>
            <a href="#services" className="btn-secondary">Explore Services</a>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services" id="services">
        <div className="container">
          <h2>What We Deliver</h2>
          <div className="service-grid">
            <div className="service-card">
              <i className="fas fa-robot"></i>
              <h3>AI Strategy &amp; Consultation</h3>
              <p>Identify high-impact opportunities to integrate AI across your operations.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-cogs"></i>
              <h3>Custom AI Automation</h3>
              <p>Design and deploy tailored AI agents that automate workflows and reduce costs.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-users"></i>
              <h3>Team Enablement</h3>
              <p>Train your teams to use AI confidently and strategically for lasting impact.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-sync-alt"></i>
              <h3>Ongoing AI Management</h3>
              <p>Continuous tuning and knowledge capture to keep your AI systems effective.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT + CONTACT ===== */}
      <section className="about-contact" id="about">
        <div className="container">
          <div className="grid">
            <div>
              <h2>About QAAS Lab</h2>
              <p>
                We're an AI transformation agency helping businesses move beyond AI experiments
                to real, measurable outcomes. We partner with you to encode judgment, automate
                processes, and build AI into your firm's infrastructure.
              </p>
              <p>
                Our mission: make AI accessible, actionable, and valuable — without the hype.
              </p>
            </div>
            <div id="contact">
              <h2>Let's Talk</h2>
              <p>Ready to transform your business with AI? Reach out — we'd love to chat.</p>
              <div className="contact-details">
                <p><i className="fas fa-envelope"></i> hello@qaaslab.com</p>
                <p><i className="fas fa-phone"></i> +1 (555) 000-0000</p>
                <p><i className="fas fa-map-marker-alt"></i> Remote / Global</p>
              </div>
              <p style={{ marginTop: '18px', fontSize: '0.9rem', color: '#888' }}>
                Or just click the chat button below — our AI assistant is ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container footer-content">
          <span>&copy; 2026 QAAS Lab. All rights reserved.</span>
          <div>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </footer>

      {/* ===== CHAT BUTTON ===== */}
      <button 
        className="chat-button" 
        onClick={() => setIsChatOpen(true)}
      >
        <i className="fas fa-comment-dots"></i> AI Assistant
      </button>

      {/* ===== CHAT FRAME ===== */}
      {isChatOpen && (
        <div className="chat-frame">
          <div className="chat-header">
            <h4><i className="fas fa-robot"></i> QAAS AI Assistant</h4>
            <button 
              className="close-chat" 
              onClick={() => setIsChatOpen(false)}
            >
              &times;
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="msg ai typing">⏳ Thinking...</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button onClick={sendMessage} disabled={isLoading}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;