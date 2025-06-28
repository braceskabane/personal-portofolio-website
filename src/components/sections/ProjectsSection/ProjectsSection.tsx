// ================================
// src/components/sections/ProjectsSection/ProjectsSection.tsx
// ================================

'use client';

import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Filter, Grid, List } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { useIntersectionObserver } from '@/hooks';
import type { ProjectsSectionProps, ProjectCardProps } from './ProjectsSection.types';

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Use useEffect untuk intersection observer manual
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Card
      className={`group overflow-hidden transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      variant="elevated"
      padding="none"
      hover
    >
      {/* Project Image */}
      <div className="relative overflow-hidden h-48 sm:h-56">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action Buttons */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            {project.githubUrl && (
              <Button
                variant="ghost"
                size="small"
                icon={<Github size={16} />}
                onClick={() => window.open(project.githubUrl, '_blank')}
                className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
              >
                Code
              </Button>
            )}
            {project.demoUrl && (
              <Button
                variant="primary"
                size="small"
                icon={<ExternalLink size={16} />}
                onClick={() => window.open(project.demoUrl, '_blank')}
                className="ml-auto"
              >
                Live Demo
              </Button>
            )}
          </div>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-bold rounded-full">
              ⭐ Featured
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full capitalize">
            {project.category?.replace('-', ' ') || 'Project'}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-cyan-400/10 text-cyan-400 rounded text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-3 gap-4 text-center border-t border-gray-700 pt-4">
          {Object.entries(project.stats).slice(0, 3).map(([key, value], i) => (
            <div key={i}>
              <div className="text-cyan-400 font-bold text-sm">{value}</div>
              <div className="text-gray-500 text-xs capitalize">{key}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  loading = false,
  error
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    freezeOnceVisible: true
  });

  const [filter, setFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  // Handle category filter change
  const handleFilterChange = React.useCallback((newCategory: string) => {
    setFilter(newCategory);
  }, []);

  // Handle view mode change
  const handleViewModeChange = React.useCallback((mode: 'grid' | 'list') => {
    setViewMode(mode);
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <Card variant="elevated" padding="large">
            <p className="text-red-400">Error loading projects: {error}</p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </div>

        {/* Filter & View Controls */}
        <div className={`flex flex-col sm:flex-row justify-between items-center mb-12 gap-4 transition-all duration-1000 delay-200 ${
          isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" size={20} />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`capitalize px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                All Projects
              </button>
              
              {categories.slice(1).map((category) => (
                <button
                  key={category}
                  data-category={category}
                  onClick={(e) => {
                    const cat = e.currentTarget.getAttribute('data-category');
                    if (cat) setFilter(cat);
                  }}
                  className={`capitalize px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {(category || '').replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="small"
              icon={<Grid size={16} />}
              onClick={() => handleViewModeChange('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="small"
              icon={<List size={16} />}
              onClick={() => handleViewModeChange('list')}
            >
              List
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Card variant="glass" padding="large" className="inline-block">
              <p className="text-gray-400 text-lg">
                No projects found for "{filter}" category.
              </p>
            </Card>
          </div>
        )}

        {/* View More Projects */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
          isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Card variant="glass" padding="large" className="inline-block">
            <h3 className="text-2xl font-bold text-white mb-4">
              Interested in More?
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Check out my GitHub for more projects and open source contributions.
            </p>
            <Button
              variant="primary"
              icon={<Github size={20} />}
              onClick={() => window.open('https://github.com/johndoe', '_blank')}
            >
              View All Projects
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};