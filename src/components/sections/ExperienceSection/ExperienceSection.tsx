// ================================
// src/components/sections/ExperienceSection/ExperienceSection.tsx
// ================================

'use client';

import React from 'react';
import { Briefcase, MapPin, Calendar, Star } from 'lucide-react';
import { Card } from '@/components/ui';
import { useIntersectionObserver } from '@/hooks';
import type { ExperienceSectionProps } from './ExperienceSection.types';

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  loading = false,
  error
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    freezeOnceVisible: true
  });

  if (loading) {
    return (
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading experience...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <Card variant="elevated" padding="large">
            <p className="text-red-400">Error loading experience: {error}</p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="experience" 
      className="py-20 relative"
    >
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        className="container mx-auto px-6"
      >
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            My professional journey and key achievements
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-500 hidden lg:block" />
          
          {experience.map((exp, index) => (
            <div 
              key={exp.id}
              className={`flex items-center mb-12 lg:mb-16 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } transition-all duration-1000 delay-${(index + 1) * 200} ${
                isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              {/* Content */}
              <div className={`w-full lg:w-1/2 ${
                index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'
              }`}>
                <Card 
                  variant="elevated" 
                  padding="large"
                  hover
                  className="group hover:scale-105 transition-all duration-300"
                >
                  {/* Company & Position */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {exp.position}
                    </h3>
                    <h4 className="text-xl text-cyan-400 mb-2 flex items-center gap-2">
                      <Briefcase size={20} />
                      {exp.company}
                    </h4>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {exp.duration}
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          {exp.location}
                        </div>
                      )}
                      {exp.type && (
                        <span className="px-2 py-1 bg-gray-700 rounded-full text-xs capitalize">
                          {exp.type}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-4">
                    <h5 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Star className="text-yellow-400" size={18} />
                      Key Achievements
                    </h5>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-cyan-400 mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-400 mb-2">Technologies Used:</h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-xs font-medium hover:bg-cyan-400/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyan-400 rounded-full border-4 border-black z-10 hidden lg:block group-hover:scale-125 transition-transform" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
          isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Card variant="glass" padding="large" className="inline-block">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready for the Next Challenge
            </h3>
            <p className="text-gray-300 max-w-md">
              I'm always excited to work on innovative projects and collaborate with talented teams.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
