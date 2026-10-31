import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Layers
} from 'lucide-react';
import { notifyChunkLoaded } from '../utils/lazyWithDelay';

const FAQS = [
  {
    q: 'How does React.lazy() improve application load time?',
    a: 'React.lazy() leverages ES dynamic imports (import()) to allow Webpack or Vite to split the component into a separate bundle (chunk). The browser only requests this chunk over the network when the user actually navigates to the route.'
  },
  {
    q: 'Why is <Suspense> required with React.lazy()?',
    a: 'Because dynamic imports return Promises that resolve asynchronously, React needs a mechanism to suspend rendering until the network request finishes. Suspense allows specifying a fallback UI (like a spinner or skeleton) while the chunk is in transit.'
  },
  {
    q: 'What happens if a user navigates to a lazy route while offline?',
    a: 'If the network fails during the dynamic import, the Promise rejects and React throws an error. This can be gracefully caught and handled using a React Error Boundary wrapping the Suspense component.'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Feedback',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  useEffect(() => {
    // Notify telemetry tracker that the Contact chunk was loaded
    notifyChunkLoaded('Contact.chunk.js');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="page-container">
      {/* Page Header with Lazy Chunk Banner */}
      <div className="page-header">
        <div>
          <div className="badge-lazy-chunk">
            <Sparkles size={14} className="text-amber-400" />
            <span>Lazy-Loaded Chunk: <code>assets/Contact-[hash].js</code></span>
          </div>
          <h1 className="page-title">Contact &amp; Student Support</h1>
          <p className="page-subtitle">
            This route component was dynamically split and fetched on-demand when visiting <code>/contact</code>.
          </p>
        </div>

        <div className="chunk-stat-pill">
          <Layers size={16} className="text-indigo-400" />
          <span>Chunk Size: <strong>~24.6 KB</strong> (Saved from initial bundle)</span>
        </div>
      </div>

      <div className="contact-layout-grid">
        {/* Contact Form */}
        <div className="contact-card card-glass">
          {submitted ? (
            <div className="submission-success">
              <CheckCircle2 size={48} className="text-emerald-400 mb-3" />
              <h3 className="text-xl font-bold">Message Sent Successfully!</h3>
              <p className="text-muted text-sm mt-2">
                Thank you, <strong>{formData.name}</strong>. Your feedback on Practical 8 performance benchmarks has been received.
              </p>
              <button
                className="btn-secondary mt-4"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'Feedback', message: '' });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Mail size={18} className="text-indigo-400" />
                Submit Feedback / Inquiry
              </h3>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. John Doe"
                  className="input-field"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@charusat.edu.in"
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <select
                  name="subject"
                  className="select-field"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="Feedback">Practical 8 Evaluation Feedback</option>
                  <option value="CodeSplitting">Code Splitting Query</option>
                  <option value="DevTools">React DevTools Profiler Question</option>
                  <option value="General">General Inquiry</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message Content</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Write your message or practical observation here..."
                  className="input-field"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full">
                <Send size={16} />
                <span>Submit Form</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact Info & FAQ Accordion */}
        <div className="contact-sidebar">
          {/* Quick Info Box */}
          <div className="info-card card-glass mb-4">
            <h4 className="text-md font-semibold mb-3 text-indigo-300">Department &amp; Laboratory</h4>
            <div className="info-item">
              <MapPin size={16} className="text-slate-400 mt-1" />
              <div className="text-sm">
                <strong>CHARUSAT Campus</strong>
                <p className="text-xs text-muted">CSPIT &amp; DEPSTAR, Changa, Gujarat 388421</p>
              </div>
            </div>
            <div className="info-item">
              <Clock size={16} className="text-slate-400 mt-1" />
              <div className="text-sm">
                <strong>Lab Hours</strong>
                <p className="text-xs text-muted">Monday – Friday: 9:00 AM – 4:30 PM</p>
              </div>
            </div>
          </div>

          {/* Quick FAQs */}
          <div className="faq-box card-glass">
            <h4 className="text-md font-semibold mb-3 flex items-center gap-2 text-indigo-300">
              <HelpCircle size={16} />
              Lazy Loading FAQs
            </h4>

            <div className="faq-list">
              {FAQS.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    className={`faq-question ${activeFaq === index ? 'open' : ''}`}
                    onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={14} className={`faq-chevron ${activeFaq === index ? 'rotated' : ''}`} />
                  </button>
                  {activeFaq === index && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
