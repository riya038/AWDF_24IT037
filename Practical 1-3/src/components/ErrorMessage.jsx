import React from 'react';
import './ErrorMessage.css';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-card" role="alert">
      <div className="error-icon-wrapper">
        <span className="error-icon">⚠️</span>
      </div>
      <div className="error-content">
        <h3 className="error-title">Failed to Load Repositories</h3>
        <p className="error-description">
          {message || 'An error occurred while fetching data from GitHub API.'}
        </p>
        {onRetry && (
          <button className="error-retry-btn" onClick={onRetry}>
            🔄 Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;
