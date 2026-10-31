import React from 'react';
import './Spinner.css';

function Spinner({ message = 'Loading repositories...' }) {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="spinner-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="spinner-message">{message}</p>
    </div>
  );
}

export default Spinner;
