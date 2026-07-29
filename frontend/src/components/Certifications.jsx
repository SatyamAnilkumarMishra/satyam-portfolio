import React from 'react';
import { Award, CheckCircle2, Code2 } from 'lucide-react';

const certs = [
  {
    issuer: "MongoDB University",
    title: "7 MongoDB Certifications",
    description: "Completed 7 certifications covering MongoDB Schema Design, Aggregation Framework, Atlas Vector Search, and Retrieval-Augmented Generation (RAG).",
    icon: Award
  },
  {
    issuer: "GeeksforGeeks Skill-Up",
    title: "SQL, Git & GitHub Certified",
    description: "Certified in database querying fundamentals, relational schemas, complex joins, and industry-standard version control workflows.",
    icon: CheckCircle2
  },
  {
    issuer: "LeetCode Practice",
    title: "100+ DSA Problems Solved",
    description: "Solved 100+ algorithmic challenges on LeetCode covering dynamic programming, graph algorithms, trees, and hash maps.",
    icon: Code2
  }
];

const Certifications = () => {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <h2 className="section-title">Certifications <span>& Practice</span></h2>
        <div className="cert-grid">
          {certs.map((c, idx) => {
            const IconComp = c.icon;
            return (
              <div className="glass-card cert-card tilt-card" key={idx}>
                <div className="cert-icon">
                  <IconComp size={24} />
                </div>
                <span className="cert-issuer">{c.issuer}</span>
                <h3 className="cert-title">{c.title}</h3>
                <p className="cert-desc">{c.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
