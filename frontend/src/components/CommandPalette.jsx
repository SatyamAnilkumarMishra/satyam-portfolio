import React, { useState, useEffect, useContext } from 'react';
import { Search, Navigation, Palette, Copy, FileText, Github, X } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const CommandPalette = ({ isOpen, onClose }) => {
  const { setTheme } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = [
    { title: "Go to About / Bio", category: "Navigation", icon: Navigation, action: () => scrollTo('#hero') },
    { title: "Go to Experience", category: "Navigation", icon: Navigation, action: () => scrollTo('#experience') },
    { title: "Go to Projects", category: "Navigation", icon: Navigation, action: () => scrollTo('#projects') },
    { title: "Go to Technical Skills", category: "Navigation", icon: Navigation, action: () => scrollTo('#skills') },
    { title: "Go to Certifications", category: "Navigation", icon: Navigation, action: () => scrollTo('#certifications') },
    { title: "Go to Contact Form", category: "Navigation", icon: Navigation, action: () => scrollTo('#contact') },
    
    { title: "Theme: Aurora Indigo (Default)", category: "Appearance", icon: Palette, action: () => handleTheme('default') },
    { title: "Theme: Emerald Mint", category: "Appearance", icon: Palette, action: () => handleTheme('emerald') },
    { title: "Theme: Rose Gold Amber", category: "Appearance", icon: Palette, action: () => handleTheme('rose') },
    { title: "Theme: Monochrome Slate", category: "Appearance", icon: Palette, action: () => handleTheme('slate') },
    
    { title: "Copy Email Address", category: "Utility", icon: Copy, action: () => copyEmail() },
    { title: "Open GitHub Profile", category: "External", icon: Github, action: () => window.open('https://github.com/SatyamAnilkumarMishra', '_blank') }
  ];

  const scrollTo = (id) => {
    onClose();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTheme = (themeName) => {
    setTheme(themeName);
    onClose();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("satyamsam2612@gmail.com");
    alert("Email address copied to clipboard!");
    onClose();
  };

  const filtered = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (!isOpen) return;

      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      }
      if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ alignItems: 'flex-start', paddingTop: '15vh' }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ padding: 0, overflow: 'hidden', maxWidth: '580px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: '1px solid var(--card-border)', gap: '0.75rem' }}>
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search navigation, themes, actions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '1rem', width: '100%', fontFamily: 'inherit' }}
            autoFocus
          />
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ maxHeight: '350px', overflowY: 'auto', padding: '0.75rem' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No matching commands
            </div>
          ) : (
            filtered.map((item, idx) => {
              const IconComp = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div 
                  key={idx}
                  onClick={item.action}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(255,255,255,0.06)' : 'transparent',
                    color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                    transition: 'all 0.2s ease',
                    marginBottom: '0.25rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexGrow: 1 }}>
                    <IconComp size={16} color={isSelected ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                    <span>{item.title}</span>
                  </div>
                  <span className="badge" style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--card-border)', background: 'rgba(3,7,18,0.5)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span><kbd style={{ background: 'rgba(255,255,255,0.06)', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>↑↓</kbd> navigate</span>
          <span><kbd style={{ background: 'rgba(255,255,255,0.06)', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>Enter</kbd> select</span>
          <span><kbd style={{ background: 'rgba(255,255,255,0.06)', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>Esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
