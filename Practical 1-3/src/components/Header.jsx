import React from 'react';
import './Header.css';

function Header({ name, themeColor }) {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="header-section">
      <div className="header-bg-glow"></div>
      <div className="header-content">
        <h5 className="header-subtitle">WELCOME TO MY PORTFOLIO</h5>
        <h1 className="header-title">
          Hi, I am <span style={{ color: themeColor || 'var(--accent-color)', textShadow: `0 0 20px ${themeColor}4D` }}>{name}</span>
        </h1>
        <h2 className="header-tagline">Learning, Building & Exploring Modern Web Development</h2>
        <p className="header-description">
          I'm a B.Tech IT student passionate about web development and technology. Currently, I'm learning and building responsive web applications using modern tools like React, JavaScript, and Node.js while continuously improving my development skills.
        </p>
        <div className="header-cta">
          <button 
            className="cta-button" 
            onClick={handleScrollToContact}
            style={{ 
              backgroundColor: themeColor || 'var(--accent-color)',
              boxShadow: `0 4px 20px ${themeColor || 'var(--accent-color)'}66`
            }}
          >
            Get In Touch
          </button>
          <a href="#projects" className="cta-link">View My Work</a>
        </div>
      </div>
    </section>
  );
}

export default Header;
