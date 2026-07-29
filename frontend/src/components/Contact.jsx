import React, { useState } from 'react';
import { Send, Copy, Check, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Portfolio Inquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(false);

  const directEmail = "satyamsam2612@gmail.com";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setToast({ type: 'success', text: 'Message saved to MongoDB! Satyam will review it shortly.' });
        setFormData({ name: '', email: '', subject: 'Portfolio Inquiry', message: '' });
      } else {
        setToast({ type: 'error', text: data.error || 'Failed to send message.' });
      }
    } catch (err) {
      setToast({ type: 'error', text: 'Network connection error. Please try emailing directly.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="glass-card contact-card">
          <div className="contact-header">
            <h2 className="contact-title">Let's Build <span>Something Incredible</span></h2>
            <p className="contact-desc">
              Have a software role, project inquiry, or technical discussion? Send a message directly to Satyam's MongoDB inbox or email directly.
            </p>
          </div>

          {toast && (
            <div className={`toast toast-${toast.type}`}>
              {toast.text}
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="form-input"
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="form-input"
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input 
                type="text" 
                name="subject"
                placeholder="Subject of your message"
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Share project details or internship/role context..."
                className="form-textarea"
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                <Send size={16} />
                <span>{loading ? 'Submitting to MongoDB...' : 'Send Message'}</span>
              </button>

              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleCopyEmail}
              >
                {copied ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
                <span>{copied ? 'Address Copied!' : 'Copy Email Address'}</span>
              </button>
              
              <a 
                href={`mailto:${directEmail}`}
                className="btn btn-secondary"
              >
                <Mail size={16} />
                <span>Direct Email</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
