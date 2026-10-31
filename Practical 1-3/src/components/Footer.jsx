import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            Portfolio<span>.</span>
          </div>
          <button className="back-to-top" onClick={handleScrollToTop} aria-label="Back to top">
            Back to Top ↑
          </button>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p className="footer-copy">
            <center>&copy; {currentYear} Student Portfolio. Built with React & Vite. All Rights Reserved.</center>
          </p>
          <div className="footer-meta">
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
