import React from 'react';
import { Calendar } from 'lucide-react';

const experiences = [
  {
    role: "Software Development Intern",
    company: "ApexaiQ Technologies Pvt. Ltd.",
    period: "Feb 2026 - Mar 2026",
    description: "Worked on asynchronous programming in JavaScript and Python to handle concurrent operations and improve application performance. Implemented third-party API integrations using FastAPI for efficient data communication and backend service enhancement, alongside building a foundational understanding of DevOps tools including CI/CD pipelines and containerization.",
    tags: ["JavaScript", "Python", "FastAPI", "CI/CD", "Docker"]
  },
  {
    role: "B.E. Information Technology (CGPA: 8.925 / 10)",
    company: "Shri Sant Gajanan Maharaj College of Engineering, Shegaon",
    period: "2023 - 2027",
    description: "Information Technology undergraduate building strong fundamentals across programming, data structures, databases, and applied AI/ML — supplemented by 7 MongoDB University certifications and SQL/Git certifications from GeeksforGeeks Skill-Up.",
    tags: ["Java", "Python", "C++", "SQL", "Data Structures"]
  }
];

const Experience = () => {
  return (
    <section className="section" id="experience">
      <div className="container">
        <h2 className="section-title">My <span>Experience</span></h2>
        <div className="timeline-container">
          {experiences.map((exp, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-dot"></div>
              <div className="glass-card timeline-card tilt-card">
                <div className="timeline-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 className="timeline-title">{exp.role}</h3>
                    <span className="timeline-company">{exp.company}</span>
                  </div>
                  {/* Clean Period Date Badge Beside Role Title preventing vertical line overlap */}
                  <div 
                    className="badge badge-accent" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.4rem', 
                      fontSize: '0.8rem', 
                      fontFamily: 'var(--font-mono)',
                      padding: '0.35rem 0.85rem',
                      background: 'rgba(79, 209, 255, 0.08)',
                      borderColor: 'rgba(79, 209, 255, 0.25)',
                      color: '#4FD1FF',
                      margin: 0
                    }}
                  >
                    <Calendar size={13} />
                    <span>{exp.period}</span>
                  </div>
                </div>
                <p className="timeline-description">{exp.description}</p>
                <div className="tag-container">
                  {exp.tags.map((t, i) => (
                    <span className="tag" key={i}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
