// ================================
// src/app/page.tsx - MAIN PORTFOLIO PAGE WITH INTEGRATED ANIMATIONS
// ================================

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePortfolio, useActiveSection } from '@/hooks';
import { MockPortfolioService, ParticleService } from '@/services';
import {
  HeroSection,
  AboutSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  ContactSection
} from '@/components/sections';
import { BackToTop, LoadingScreen, SectionDivider } from '@/components/common';

// Navigation Component
const Navigation: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  const navigationItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
          >
            Portfolio
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-all duration-300 hover:text-cyan-400 ${
                  activeSection === item.id 
                    ? 'text-cyan-400 font-semibold' 
                    : 'text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

// Custom Cursor Component
const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX - 10}px`;
      cursor.style.top = `${e.clientY - 10}px`;
    };

    const handleMouseDown = () => {
      cursor.style.transform = 'scale(0.8)';
    };

    const handleMouseUp = () => {
      cursor.style.transform = 'scale(1)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 mix-blend-difference hidden md:block"
      style={{ width: '20px', height: '20px' }}
    >
      <div className="w-5 h-5 bg-white rounded-full opacity-80" />
      <div className="absolute inset-0 w-8 h-8 border border-white rounded-full animate-ping opacity-50" />
    </div>
  );
};

// Particle Background Component
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleServiceRef = useRef<ParticleService | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particleServiceRef.current = new ParticleService({
      particleCount: 80,
      colors: ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981'],
      speed: 0.3,
      enableMouse: true,
      mouseRadius: 150
    });

    particleServiceRef.current.init(canvas);

    const handleResize = () => {
      particleServiceRef.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      particleServiceRef.current?.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

// Scroll Progress Indicator
const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-900 z-50">
      <div 
        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

// Main Portfolio Component with Loading Screen and Section Dividers
export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize portfolio service
  const mockPortfolioService = new MockPortfolioService();
  
  const {
    projects,
    experience,
    skills,
    personalInfo,
    loading,
    error,
    loadProjects,
    loadExperience,
    loadSkills,
    loadPersonalInfo,
    submitContact
  } = usePortfolio(mockPortfolioService);

  // Track active section
  const activeSection = useActiveSection(['hero', 'about', 'experience', 'projects', 'skills', 'contact']);

  // Load all data on mount
  useEffect(() => {
    loadPersonalInfo();
    loadProjects();
    loadExperience();
    loadSkills();
  }, []);

  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Show loading screen initially
  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  // Handle contact form submission
  const handleContactSubmit = async (contactData: any) => {
    try {
      return await submitContact(contactData);
    } catch (error) {
      console.error('Contact submission error:', error);
      return false;
    }
  };

  // Handle download CV
  const handleDownloadCV = () => {
    if (personalInfo?.resume) {
      window.open(personalInfo.resume, '_blank');
    } else {
      // Create a download link for demo
      const link = document.createElement('a');
      link.href = '/resume-john-doe.pdf';
      link.download = `${personalInfo?.name || 'john-doe'}-resume.pdf`;
      link.click();
    }
  };

  // Handle contact button click (scroll to contact)
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Scroll Progress */}
      <ScrollProgress />
      
      {/* Navigation */}
      <Navigation activeSection={activeSection} />

      {/* Main Content with Section Dividers */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          personalInfo={personalInfo}
          loading={loading.personalInfo}
          onContactClick={handleContactClick}
          onDownloadCV={handleDownloadCV}
        />
        
        {/* Section Divider - Wave */}
        <SectionDivider type="wave" className="text-gray-900" />

        {/* About Section */}
        <AboutSection
          personalInfo={personalInfo}
          loading={loading.personalInfo}
        />

        {/* Section Divider - Curve */}
        <SectionDivider type="curve" className="text-gray-900" />

        {/* Experience Section */}
        <ExperienceSection
          experience={experience}
          loading={loading.experience}
          error={error.experience}
        />

        {/* Section Divider - Zigzag */}
        <SectionDivider type="zigzag" className="text-gray-900" />

        {/* Projects Section */}
        <ProjectsSection
          projects={projects}
          loading={loading.projects}
          error={error.projects}
        />

        {/* Section Divider - Wave */}
        <SectionDivider type="wave" className="text-gray-900" />

        {/* Skills Section */}
        <SkillsSection
          skills={skills}
          loading={loading.skills}
          error={error.skills}
        />

        {/* Section Divider - Curve */}
        <SectionDivider type="curve" className="text-gray-900" />

        {/* Contact Section */}
        <ContactSection
          personalInfo={personalInfo}
          onSubmitContact={handleContactSubmit}
          loading={loading.contact}
        />
      </main>

      {/* Back to Top Button */}
      <BackToTop />

      {/* Footer */}
      <footer className="relative z-10 py-12 bg-gray-900/80 backdrop-blur-xl border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400">
                © 2025 {personalInfo?.name || 'John Doe'}. All rights reserved.
              </p>
              <p className="text-sm text-gray-500">
                Built with Next.js, TypeScript, Tailwind CSS & ❤️
              </p>
            </div>
            
            <div className="flex space-x-6">
              {personalInfo?.social?.github && (
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-300"
                >
                  GitHub
                </a>
              )}
              {personalInfo?.social?.linkedin && (
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-300"
                >
                  LinkedIn
                </a>
              )}
              {personalInfo?.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-300"
                >
                  Email
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Loading Overlay */}
      {Object.values(loading).some(l => l) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">Loading portfolio...</p>
            <p className="text-gray-400 text-sm">Preparing an amazing experience</p>
          </div>
        </div>
      )}

      {/* Development Debug Panel */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 z-50 bg-black/80 backdrop-blur-xl border border-gray-700 rounded-lg p-4 text-xs max-w-xs">
          <h4 className="text-cyan-400 font-semibold mb-2">🚀 Portfolio Debug</h4>
          <div className="space-y-1 text-gray-400">
            <div>Active: <span className="text-cyan-400">{activeSection}</span></div>
            <div>Personal Info: {personalInfo ? '✅' : '❌'}</div>
            <div>Projects: <span className="text-cyan-400">{projects.length}</span></div>
            <div>Experience: <span className="text-cyan-400">{experience.length}</span></div>
            <div>Skills: <span className="text-cyan-400">{skills.length}</span></div>
            <div>Loading: {Object.values(loading).some(l => l) ? '⏳' : '✅'}</div>
            <div>Errors: {Object.values(error).some(e => e) ? '❌' : '✅'}</div>
          </div>
        </div>
      )}
    </div>
  );
}