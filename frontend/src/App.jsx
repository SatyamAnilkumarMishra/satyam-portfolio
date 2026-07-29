import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Preloader from './components/Preloader';
import ParticleCanvas from './components/ParticleCanvas';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import GitHubStats from './components/GitHubStats';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ProjectModal from './components/ProjectModal';
import CommandPalette from './components/CommandPalette';
import AdminDrawer from './components/AdminDrawer';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <ThemeProvider>
      <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
        {loading && <Preloader onFinish={() => setLoading(false)} />}

        <ParticleCanvas />
        
        <Header 
          onOpenPalette={() => setIsPaletteOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
        
        <main>
          <Hero />
          <Experience />
          <Projects onSelectProject={(proj) => setSelectedProject(proj)} />
          <Skills />
          <GitHubStats />
          <Certifications />
          <Contact />
        </main>

        <Footer />

        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />

        <CommandPalette 
          isOpen={isPaletteOpen} 
          onClose={() => setIsPaletteOpen(false)} 
        />

        <AdminDrawer 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)} 
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
