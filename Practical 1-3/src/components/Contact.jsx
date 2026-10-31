import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  // Controlled inputs state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // Tooltip visibility toggle state (2nd useState)
  const [showTooltip, setShowTooltip] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    
    // Simulate form submission API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setName('');
      setEmail('');
      setMessage('');

      // Clear success notification after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactDetails = [
    { label: 'Email', value: 'riyakalariya2022@gmail.com', link: 'mailto:riyakalariya2022@gmail.com', icon: '✉️' },
    { label: 'GitHub', value: 'riya038', link: 'https://github.com/riya038', icon: '🐙' },
    { label: 'LinkedIn', value: 'Riya Kalariya', link: 'https://www.linkedin.com/in/riya-kalariya-749463330?utm_source=share_via&utm_content=profile&utm_medium=member_android', icon: '💼' }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="section-header">
        <h2 className="section-title">Get In Touch</h2>
        <div className="title-underline"></div>
      </div>
      <p className="contact-subtitle">
        Have an interesting project or collaboration proposal? Drop me a message!
      </p>

      <div className="contact-container">
        <div className="contact-info">
          <h3 className="info-title">Let's Connect</h3>
          <p className="info-desc">
            Feel free to reach out through the form or my social channels. As a B.Tech student and aspiring developer, I'm always eager to learn, collaborate, and connect with people who share an interest in technology and web development.
          </p>
          <div className="info-list">
            {contactDetails.map((detail, idx) => (
              <a href={detail.link} key={idx} className="info-item" target="_blank" rel="noopener noreferrer">
                <span className="info-icon">{detail.icon}</span>
                <div>
                  <span className="info-label">{detail.label}</span>
                  <span className="info-value">{detail.value}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="form-name">Name</label>
              <input
                type="text"
                id="form-name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <div className="label-with-tooltip">
                <label htmlFor="form-email">Email</label>
                <button
                  type="button"
                  className="tooltip-trigger"
                  onClick={() => setShowTooltip(!showTooltip)}
                  title="Click to view info"
                  aria-label="Toggle help tooltip"
                >
                  ℹ️ Help
                </button>
              </div>
              
              {showTooltip && (
                <div className="help-tooltip-bubble">
                  🔒 We only use your email to reply back to your queries. It is never shared.
                </div>
              )}
              
              <input
                type="email"
                id="form-email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="form-message">Message</label>
              <textarea
                id="form-message"
                name="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here"
                required
                disabled={isSubmitting}
              />
              <div className="character-counter">
                <span>{message.length} characters</span>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {submitStatus === 'success' && (
              <div className="submit-alert success">
                🎉 Your message has been sent successfully!
              </div>
            )}
          </form>

          {/* Real-time controlled input display */}
          {(name || email || message) && (
            <div className="live-preview-box">
              <h4 className="live-preview-title">Live Message Draft Preview</h4>
              <div className="live-preview-content">
                <p><strong>From:</strong> {name || <span className="preview-placeholder">Enter your name</span>}</p>
                <p><strong>Email:</strong> {email || <span className="preview-placeholder">Enter your email</span>}</p>
                <p className="preview-msg-paragraph">
                  <strong>Message:</strong> {message || <span className="preview-placeholder">Start typing your message...</span>}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
