import React, { useState, useEffect } from 'react';
import { Code, ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const fallbackProjects = [
  {
    _id: '1',
    title: "Agentic RAG – Career Path Advisor",
    description: "Developed an Agentic Retrieval-Augmented Generation system for personalized career recommendations, implementing multi-step reasoning with tool-based interactions.",
    longDescription: "An end-to-end intelligent career advising platform leveraging state-of-the-art Agentic RAG architecture. Features autonomous multi-step reasoning, dynamic tool selection for resume parsing and job trend analysis, and personalized career roadmapping.",
    architecture: "Python (LangChain / LlamaIndex), FastAPI, Vector DB (MongoDB Atlas Vector Search), OpenAI / Llama 3.",
    tags: ["Python", "RAG", "LLMs", "Agentic AI", "FastAPI"],
    demoUrl: "https://github.com/SatyamAnilkumarMishra",
    codeUrl: "https://github.com/SatyamAnilkumarMishra"
  },
  {
    _id: '2',
    title: "Image Similarity Search",
    description: "Built an image similarity system using ResNet-50 and cosine similarity, with the backend integrated into a React frontend for real-time search results.",
    longDescription: "Deep learning-backed visually similar image search engine. Extracts 2048-dimensional feature vectors using pre-trained ResNet-50 and evaluates vector similarity in high-dimensional space.",
    architecture: "Python, PyTorch (ResNet-50), Flask REST API, React.js frontend.",
    tags: ["Python", "Flask", "React", "ResNet-50", "PyTorch"],
    demoUrl: "https://github.com/SatyamAnilkumarMishra",
    codeUrl: "https://github.com/SatyamAnilkumarMishra"
  },
  {
    _id: '3',
    title: "Fitness & Wellness Tracker App",
    description: "Contributed to and expanded a full-stack fitness application to demonstrate React component architecture, state management, and API integration.",
    longDescription: "A comprehensive workout and wellness tracking web app featuring exercise library exploration, custom workout logging, and progress visualization.",
    architecture: "React.js, Node.js, Express, RapidAPI ExerciseDB, Tailwind CSS.",
    tags: ["ReactJS", "Express.js", "Node.js", "REST APIs"],
    demoUrl: "https://github.com/SatyamAnilkumarMishra",
    codeUrl: "https://github.com/SatyamAnilkumarMishra"
  }
];

const Projects = ({ onSelectProject }) => {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setProjects(data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section-title">Featured <span>Projects</span></h2>
        <div className="projects-grid">
          {projects.map((proj) => (
            <div 
              className="glass-card project-card tilt-card" 
              key={proj._id || proj.title}
              onClick={() => onSelectProject(proj)}
            >
              <div className="project-card-header">
                <div className="project-icon">
                  <Code size={26} />
                </div>
                <div className="project-links" onClick={(e) => e.stopPropagation()}>
                  <a href={proj.codeUrl} target="_blank" rel="noopener noreferrer" className="project-link" title="Code Repository">
                    <Github size={18} />
                  </a>
                  <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link" title="Live Demo">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
              <h3 className="project-title">{proj.title}</h3>
              <p className="project-description">{proj.description}</p>
              <div className="tag-container">
                {proj.tags.map((t, idx) => (
                  <span className="tag" key={idx}>{t}</span>
                ))}
              </div>
              <div className="project-view-more">
                <span>View Architecture & Specs</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
