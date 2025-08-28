// ================================
// src/components/sections/SkillsSection/SkillsSection.tsx - CLEAN VERSION
// ================================

'use client';

import React, { useState, useEffect } from 'react';
import { Code, TrendingUp, Award, Filter } from 'lucide-react';
import { Card } from '@/components/ui';
import type { SkillsSectionProps, SkillCardProps } from './SkillsSection.types';

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  const getSkillColor = (projectCount: number) => {
    if (projectCount >= 3) return 'from-green-400 to-emerald-500';
    if (projectCount >= 2) return 'from-blue-400 to-cyan-500';
    if (projectCount >= 1) return 'from-yellow-400 to-orange-500';
    return 'from-gray-400 to-gray-500';
  };

  const getSkillIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return '🎨';
      case 'Backend': return '⚙️';
      case 'Language': return '💬';
      case 'Database': return '🗄️';
      case 'Cloud': return '☁️';
      case 'DevOps': return '🚀';
      case 'Testing': return '🧪';
      case 'API': return '🔌';
      case 'Mobile': return '📱';
      case 'Design': return '✨';
      default: return '🛠️';
    }
  };

  const maxProjects = 4; // Based on total projects
  const progressPercentage = (skill.projectCount / maxProjects) * 100;

  return (
    <Card
      variant="elevated"
      padding="medium"
      hover
      className={`group transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getSkillIcon(skill.category)}</span>
          <div>
            <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
              {skill.name}
            </h3>
            <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
              {skill.category}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-cyan-400">{skill.projectCount}</div>
          <div className="text-xs text-gray-400">
            {skill.projectCount === 1 ? 'project' : 'projects'}
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getSkillColor(skill.projectCount)} rounded-full transition-all duration-2000 ease-out`}
          style={{
            width: isVisible ? `${Math.max(progressPercentage, 10)}%` : '0%',
            transitionDelay: `${index * 100}ms`
          } as React.CSSProperties}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      </div>
      
      {/* Skill Description */}
      {skill.description && (
        <p className="text-xs text-gray-400 mt-3 leading-relaxed">
          {skill.description}
        </p>
      )}
    </Card>
  );
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  loading = false,
  error
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['all', ...Array.from(new Set(skills.map(s => s.category)))];
  const filteredSkills = filter === 'all' 
    ? skills 
    : skills.filter(s => s.category === filter);

  // Group skills by category for better organization
  const skillsByCategory = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Helper function for skill icons
  const getSkillIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return '🎨';
      case 'Backend': return '⚙️';
      case 'Language': return '💬';
      case 'Database': return '🗄️';
      case 'Cloud': return '☁️';
      case 'DevOps': return '🚀';
      case 'Testing': return '🧪';
      case 'API': return '🔌';
      case 'Mobile': return '📱';
      case 'Design': return '✨';
      default: return '🛠️';
    }
  };

  if (loading) {
    return (
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading skills...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <Card variant="elevated" padding="large">
            <p className="text-red-400">Error loading skills: {error}</p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Filter className="text-gray-400" size={20} />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {category === 'all' ? 'All Skills' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        {filter === 'all' ? (
          // Show by categories when showing all
          <div className="space-y-12">
            {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
              <div key={category} className={`transition-all duration-1000 delay-${(categoryIndex + 1) * 200} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-3xl">{getSkillIcon(category)}</span>
                  {category}
                  <span className="text-sm text-gray-400 font-normal">({categorySkills.length})</span>
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categorySkills
                    .sort((a, b) => b.projectCount - a.projectCount)
                    .map((skill, index) => (
                      <SkillCard key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Show filtered skills in grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSkills
              .sort((a, b) => b.projectCount - a.projectCount)
              .map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
          </div>
        )}

        {/* Skills Summary */}
        <div className={`mt-16 transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="glass" padding="large" className="text-center">
              <Code className="text-cyan-400 mb-4 mx-auto" size={32} />
              <h3 className="text-2xl font-bold text-white mb-2">{skills.length}+</h3>
              <p className="text-gray-400">Technologies</p>
            </Card>
            
            <Card variant="glass" padding="large" className="text-center">
              <TrendingUp className="text-purple-400 mb-4 mx-auto" size={32} />
              <h3 className="text-2xl font-bold text-white mb-2">
                {Math.round(skills.reduce((acc, skill) => acc + skill.projectCount, 0) / skills.length * 10) / 10}
              </h3>
              <p className="text-gray-400">Average Projects per Skill</p>
            </Card>
            
            <Card variant="glass" padding="large" className="text-center">
              <Award className="text-yellow-400 mb-4 mx-auto" size={32} />
              <h3 className="text-2xl font-bold text-white mb-2">
                {skills.filter(s => s.projectCount >= 2).length}
              </h3>
              <p className="text-gray-400">Multi-Project Skills</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};