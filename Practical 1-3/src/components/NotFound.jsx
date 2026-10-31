import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-glow"></div>
      <div className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-text">
          Oops! The page you are looking for does not exist, has been removed, or is temporarily unavailable.
        </p>
        <Link to="/" className="notfound-home-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
