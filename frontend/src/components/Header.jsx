import React, { useState, useEffect, useRef } from 'react';
import { Search, Code2, ShieldAlert } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'github', label: 'GitHub' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' }
];

const Header = ({ onOpenPalette, onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef(null);
  const itemRefs = useRef({});

  // 1. Scrolled Header Background Trigger
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. High-Performance IntersectionObserver Scroll Spy
  useEffect(() => {
    const sectionElements = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (sectionElements.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0.1, 0.3, 0.6]
    };

    const visibleSections = {};

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections[entry.target.id] = entry.intersectionRatio;
        } else {
          delete visibleSections[entry.target.id];
        }
      });

      // Find section with highest visibility ratio in viewport
      let maxRatio = 0;
      let mostVisibleId = activeSection;

      Object.keys(visibleSections).forEach((id) => {
        if (visibleSections[id] > maxRatio) {
          maxRatio = visibleSections[id];
          mostVisibleId = id;
        }
      });

      if (mostVisibleId && mostVisibleId !== activeSection) {
        setActiveSection(mostVisibleId);
      }
    }, observerOptions);

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el));
    };
  }, [activeSection]);

  // 3. Liquid Energy Underline Indicator Calculation
  useEffect(() => {
    const activeEl = itemRefs.current[activeSection];
    const navEl = navRef.current;

    if (activeEl && navEl) {
      const activeRect = activeEl.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();

      setUnderlineStyle({
        left: activeRect.left - navRect.left,
        width: activeRect.width,
        opacity: 1
      });
    }
  }, [activeSection]);

  // 4. Smooth Nav Link Click Handler
  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container">
        <a href="#hero" className="logo" onClick={(e) => handleNavClick(e, 'hero')}>
          <Code2 size={24} />
          <span>SAM</span>
        </a>

        {/* Scroll Spy Nav with Liquid Underline */}
        <nav ref={navRef} style={{ position: 'relative', display: 'flex', gap: '1.8rem', alignItems: 'center' }}>
          {/* Sliding Liquid Energy Underline Indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '-6px',
              left: `${underlineStyle.left}px`,
              width: `${underlineStyle.width}px`,
              height: '2px',
              background: 'linear-gradient(90deg, #4F8CFF 0%, #4FD1FF 100%)',
              borderRadius: '9999px',
              boxShadow: '0 0 10px #4FD1FF, 0 0 18px rgba(79, 209, 255, 0.6)',
              opacity: underlineStyle.opacity,
              transition: 'left 0.38s cubic-bezier(0.16, 1, 0.3, 1), width 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
              pointerEvents: 'none',
              zIndex: 2
            }}
          />

          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                ref={(el) => (itemRefs.current[item.id] = el)}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`scroll-spy-item ${isActive ? 'active' : ''}`}
                style={{
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#FFFFFF' : '#9CA3AF',
                  textShadow: isActive ? '0 0 12px rgba(79, 209, 255, 0.65)' : 'none',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  display: 'inline-block',
                  cursor: 'pointer',
                  padding: '0.2rem 0'
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="nav-actions">
          <button className="palette-trigger" onClick={onOpenPalette}>
            <Search size={14} />
            <span>Search</span>
            <kbd>Ctrl+K</kbd>
          </button>
          
          <button 
            className="btn btn-secondary" 
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', gap: '0.35rem' }}
            onClick={onOpenAdmin}
            title="Admin Inbox Drawer"
          >
            <ShieldAlert size={14} />
            <span>Inbox</span>
          </button>
        </div>
      </div>

      {/* Hover & Active Micro-Animations */}
      <style>{`
        .scroll-spy-item:hover {
          color: #F5F7FF !important;
          transform: translateY(-3px) scale(1.02) !important;
        }
        .scroll-spy-item.active {
          animation: activeGlowPulse 3.5s infinite alternate ease-in-out;
        }
        @keyframes activeGlowPulse {
          0% { text-shadow: 0 0 10px rgba(79, 209, 255, 0.5); }
          100% { text-shadow: 0 0 16px rgba(79, 209, 255, 0.85); }
        }
      `}</style>
    </header>
  );
};

export default Header;
