import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-copy">
          © {new Date().getFullYear()} Satyam Anilkumar Mishra. All rights reserved.
        </div>

        <div style={{ display: 'flex', gap: '1.25rem', color: 'var(--text-secondary)' }}>
          <a 
            href="https://github.com/SatyamAnilkumarMishra" 
            target="_blank" 
            rel="noopener noreferrer"
            title="GitHub"
            style={{ transition: 'color 0.2s' }}
          >
            <Github size={18} />
          </a>
          <a 
            href="https://linkedin.com/in/satyam-mishra-56b636287" 
            target="_blank" 
            rel="noopener noreferrer"
            title="LinkedIn"
            style={{ transition: 'color 0.2s' }}
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
