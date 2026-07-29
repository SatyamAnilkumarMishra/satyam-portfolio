import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork, Users, Code } from 'lucide-react';

const GitHubStats = () => {
  const username = "SatyamAnilkumarMishra";
  const [stats, setStats] = useState({
    name: "Satyam Mishra",
    avatar: "/avatar.jpg",
    publicRepos: 12,
    totalStars: 15,
    followers: 18,
    topLanguage: "Python"
  });

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(userData => {
        if (userData && userData.public_repos !== undefined) {
          setStats(prev => ({
            ...prev,
            name: userData.name || prev.name,
            avatar: userData.avatar_url || prev.avatar,
            publicRepos: userData.public_repos,
            followers: userData.followers
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section" id="github">
      <div className="container">
        <h2 className="section-title">Live <span>GitHub Activity</span></h2>
        <div className="glass-card github-card">
          <div className="github-profile-side">
            <img src={stats.avatar} alt="GitHub Avatar" className="github-avatar" />
            <h3 className="github-user-name">{stats.name}</h3>
            <span className="github-user-handle">@{username}</span>
            <a 
              href={`https://github.com/${username}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
              style={{ padding: '0.45rem 0.95rem', fontSize: '0.8rem', gap: '0.4rem' }}
            >
              <span>View GitHub Profile</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="github-stats-side">
            <div className="github-stat-box">
              <span className="github-stat-num">{stats.publicRepos}</span>
              <span className="github-stat-label">Public Repos</span>
            </div>
            <div className="github-stat-box">
              <span className="github-stat-num">{stats.totalStars}</span>
              <span className="github-stat-label">Stars Accrued</span>
            </div>
            <div className="github-stat-box">
              <span className="github-stat-num">{stats.followers}</span>
              <span className="github-stat-label">Followers</span>
            </div>
            <div className="github-stat-box">
              <span className="github-stat-num">{stats.topLanguage}</span>
              <span className="github-stat-label">Primary Stack</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
