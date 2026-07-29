import React, { useState, useEffect } from 'react';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import QuantumGlassCore from './QuantumGlassCore';

const Hero = ({ statusText = "Open to Software Development Roles" }) => {
  const [localTime, setLocalTime] = useState('--:--:--');

  useEffect(() => {
    const updateTime = () => {
      try {
        const options = {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        };
        setLocalTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
      } catch (e) {
        setLocalTime(new Date().toLocaleTimeString());
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section" id="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ultra-Premium 3D Quantum Glass Core Centerpiece */}
      <QuantumGlassCore />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid">
          <div className="hero-content">
            <div className="status-pill">
              <span className="status-dot"></span>
              <span>{statusText}</span>
            </div>

            <h1 className="hero-title">
              <div style={{ whiteSpace: 'nowrap' }}>Satyam Anilkumar Mishra</div>
              <span style={{ display: 'block', marginTop: '0.25rem' }}>Software Developer</span>
            </h1>

            <p className="hero-subtitle">
              Software Development Engineer with strong fundamentals in Java, Python, C++, SQL, and MongoDB — passionate about full-stack development, data analysis, and applied AI/ML.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                <span>Let's Connect</span>
                <ArrowRight size={16} />
              </a>
              <a href="#projects" className="btn btn-secondary">
                <span>View Featured Work</span>
              </a>
            </div>

            <div className="hero-meta">
              <div className="hero-meta-item">
                <MapPin size={14} />
                <span>Wardha, Maharashtra, India</span>
              </div>
              <div className="hero-meta-item">
                <Clock size={14} />
                <span>IST: {localTime}</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="avatar-wrapper">
              <img src="/avatar.jpg" alt="Satyam Mishra" className="avatar-image" />
              <div className="avatar-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
