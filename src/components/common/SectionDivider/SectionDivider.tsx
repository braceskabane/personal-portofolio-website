// ================================
// src/components/common/SectionDivider/SectionDivider.tsx
// ================================

'use client';

import React from 'react';

interface SectionDividerProps {
  type?: 'wave' | 'zigzag' | 'curve';
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ 
  type = 'wave', 
  className = '' 
}) => {
  const renderWave = () => (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-16 ${className}`}>
      <path 
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
        fill="currentColor"
      />
    </svg>
  );

  const renderZigzag = () => (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-16 ${className}`}>
      <polygon 
        points="0,0 0,120 600,60 1200,120 1200,0" 
        fill="currentColor"
      />
    </svg>
  );

  const renderCurve = () => (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-16 ${className}`}>
      <path 
        d="M0,0V120C0,120,365.34,0,600,0S1200,120,1200,120V0Z" 
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div className="relative w-full overflow-hidden">
      <div className="text-gray-800">
        {type === 'wave' && renderWave()}
        {type === 'zigzag' && renderZigzag()}
        {type === 'curve' && renderCurve()}
      </div>
    </div>
  );
};