import React from 'react';
import { X, ExternalLink, Github, Cpu, Layers } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <span className="badge badge-accent" style={{ marginBottom: '0.75rem' }}>Project Deep-Dive</span>
        
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>
          {project.title}
        </h2>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          {project.longDescription || project.description}
        </p>

        {project.architecture && (
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
              <Layers size={16} />
              <span>System Architecture & Stack</span>
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              {project.architecture}
            </p>
          </div>
        )}

        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            Technologies & Frameworks
          </h4>
          <div className="tag-container">
            {project.tags?.map((t, idx) => (
              <span className="tag" key={idx}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <a 
            href={project.codeUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
            style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
          >
            <Github size={16} />
            <span>GitHub Repository</span>
          </a>
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
          >
            <ExternalLink size={16} />
            <span>Live Demonstration</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
