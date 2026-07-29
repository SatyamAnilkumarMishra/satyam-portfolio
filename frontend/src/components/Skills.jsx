import React, { useState, useEffect } from 'react';
import { Terminal, Database, Cpu } from 'lucide-react';

const fallbackSkills = [
  {
    categoryName: "Languages & Core",
    icon: Terminal,
    items: [
      { name: "Python", level: 90 },
      { name: "Java", level: 80 },
      { name: "C++", level: 75 },
      { name: "Data Structures & Algorithms", level: 85 }
    ]
  },
  {
    categoryName: "Frontend & Backend",
    icon: Cpu,
    items: [
      { name: "React / JavaScript / Node.js", level: 85 },
      { name: "Express.js / REST APIs", level: 85 },
      { name: "FastAPI / Flask", level: 82 },
      { name: "Tailwind CSS & CSS Grid/Flex", level: 80 }
    ]
  },
  {
    categoryName: "AI/ML & Databases",
    icon: Database,
    items: [
      { name: "MongoDB & Vector Search", level: 88 },
      { name: "MySQL / SQL Queries", level: 82 },
      { name: "NumPy / Pandas / Matplotlib", level: 85 },
      { name: "TensorFlow & PyTorch", level: 75 }
    ]
  }
];

const Skills = () => {
  const [skills, setSkills] = useState(fallbackSkills);

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          const mapped = data.data.map((cat, idx) => ({
            ...cat,
            icon: idx === 0 ? Terminal : idx === 1 ? Cpu : Database
          }));
          setSkills(mapped);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section" id="skills">
      <div className="container">
        <h2 className="section-title">Technical <span>Expertise</span></h2>
        <div className="skills-grid">
          {skills.map((cat, idx) => {
            const IconComp = cat.icon || Terminal;
            return (
              <div className="glass-card skills-card" key={idx}>
                <h3 className="skills-category-title">
                  <IconComp size={20} />
                  <span>{cat.categoryName}</span>
                </h3>
                <div className="skills-list">
                  {cat.items.map((s, i) => (
                    <div className="skill-item" key={i}>
                      <div className="skill-info">
                        <span className="skill-name">{s.name}</span>
                        <span className="skill-percentage">{s.level}%</span>
                      </div>
                      <div className="skill-bar-bg">
                        <div 
                          className="skill-bar-fill" 
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
