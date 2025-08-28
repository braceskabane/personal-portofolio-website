// ================================
// src/components/sections/AboutSection/AboutSection.tsx
// ================================

'use client';

import React from 'react';
import { MapPin, Calendar, Award, Coffee, Code, Users } from 'lucide-react';
import { Card } from '@/components/ui';
import { useIntersectionObserver } from '@/hooks';
import type { AboutSectionProps } from './AboutSection.types';

export const AboutSection: React.FC<AboutSectionProps> = ({
  personalInfo,
  loading = false
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true
  });

  const quickFacts = [
    { icon: <Code className="text-cyan-400" size={20} />, label: 'Projects Completed', value: '4+' },
    { icon: <Users className="text-purple-400" size={20} />, label: 'Happy Clients', value: '1+' },
    { icon: <Award className="text-yellow-400" size={20} />, label: 'Years Experience', value: '1+' },
    { icon: <Coffee className="text-orange-400" size={20} />, label: 'Coffee Cups', value: '∞' }
  ];

  return (
    <section 
      id="about" 
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
            About Me
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get to know more about my background, experience, and what drives me
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${
            isIntersecting ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="space-y-4">
              <p className="text-lg text-gray-300 leading-relaxed text-justify">
                {personalInfo?.description || 
                  `Fresh graduate Mobile Application Developer with hands-on experience in Android development 
                  and machine learning integration. Specialized in building scalable mobile applications using 
                  Kotlin, MVVM architecture, and modern Android technologies.`
                }
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed text-justify">
                Passionate about continuous learning and staying current with mobile development trends. 
                Recently completed industry-level training programs and contributed to cross-functional 
                teams developing innovative mobile solutions with AI/ML capabilities.
              </p>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {personalInfo?.location && (
                <Card variant="glass" padding="small">
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-cyan-400" size={20} />
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-semibold">{personalInfo.location}</p>
                    </div>
                  </div>
                </Card>
              )}
              
              <Card variant="glass" padding="small">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-cyan-400" size={20} />
                  <div>
                    <p className="text-gray-400 text-sm">Experience</p>
                    <p className="text-white font-semibold">1+ Year</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Quick Facts */}
          <div className={`transition-all duration-1000 delay-400 ${
            isIntersecting ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <Card variant="elevated" padding="large">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Quick Facts
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                {quickFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="text-center group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-gray-800 rounded-full group-hover:bg-gray-700 transition-colors">
                        {fact.icon}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-cyan-400 mb-1">
                      {fact.value}
                    </div>
                    <div className="text-sm text-gray-400">
                      {fact.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills Summary */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4 text-center">
                  Core Expertise
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Kotlin', 'Android SDK', 'ML Kit', 'Firebase', 'Python', 'TensorFlow Lite'].map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-sm font-medium hover:bg-cyan-400/20 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
