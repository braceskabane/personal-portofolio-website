// ================================
// src/hooks/useScrollPosition.ts
// ================================

'use client';

import { useState, useEffect } from 'react';

export interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right' | null;
}

export const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null
  });

  useEffect(() => {
    let prevScrollX = window.scrollX;
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollX = window.scrollX;
      const currentScrollY = window.scrollY;

      let direction: 'up' | 'down' | 'left' | 'right' | null = null;

      if (currentScrollY > prevScrollY) {
        direction = 'down';
      } else if (currentScrollY < prevScrollY) {
        direction = 'up';
      } else if (currentScrollX > prevScrollX) {
        direction = 'right';
      } else if (currentScrollX < prevScrollX) {
        direction = 'left';
      }

      setScrollPosition({
        x: currentScrollX,
        y: currentScrollY,
        direction
      });

      prevScrollX = currentScrollX;
      prevScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};