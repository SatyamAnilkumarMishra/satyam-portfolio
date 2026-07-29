import React, { useState, useEffect } from 'react';
import { X, Mail, RefreshCw, Calendar, User } from 'lucide-react';

const AdminDrawer = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100vh',
          maxHeight: '100vh',
          borderRadius: 0,
          borderLeft: '1px solid var(--card-hover-border)',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800 }}>
              MongoDB Message Inbox
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Submissions received via Contact Form
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button onClick={fetchMessages} style={{ color: 'var(--text-muted)', padding: '0.4rem' }}>
              <RefreshCw size={16} className={loading ? 'spin' : ''} />
            </button>
            <button onClick={onClose} style={{ color: 'var(--text-muted)', padding: '0.4rem' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <Mail size={32} style={{ marginBottom: '0.75rem', opacity: 0.4 }} />
              <p>No messages received yet.</p>
              <span style={{ fontSize: '0.8rem' }}>Submissions from the Contact section will show here.</span>
            </div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg._id} 
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '12px',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <User size={14} />
                    {msg.name}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={12} />
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', marginBottom: '0.75rem' }}>
                  {msg.email}
                </div>
                {msg.subject && (
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    Subject: {msg.subject}
                  </div>
                )}
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                  {msg.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDrawer;
