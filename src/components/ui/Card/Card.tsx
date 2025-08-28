// ================================
// src/components/ui/Card/Card.tsx
// ================================

'use client';

import React from 'react';
import { CardProps, CardConfig } from './Card.types';

// Simple clsx implementation
const clsx = (...classes: (string | undefined | null | false | boolean)[]): string => {
  return classes.filter((cls) => cls && typeof cls === 'string').join(' ');
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'medium',
  hover = false,
  onClick,
  animationType = 'fade',
  duration = 300,
  delay = 0,
  as: Component = 'div',
  ...props
}) => {
  const config: CardConfig = {
    baseClasses: 'rounded-xl transition-all duration-300',
    variantClasses: {
      default: 'bg-gray-800/30 border border-gray-700 backdrop-blur-sm',
      glass: 'bg-white/5 backdrop-blur-xl border border-white/10',
      elevated: 'bg-gray-800 shadow-2xl shadow-cyan-500/10 border border-gray-600',
      outlined: 'bg-transparent border-2 border-gray-600',
      filled: 'bg-gray-800 border border-gray-700'
    },
    paddingClasses: {
      none: '',
      small: 'p-4',
      medium: 'p-6',
      large: 'p-8'
    },
    animationClasses: {
      fade: 'animate-fade-in',
      slide: 'animate-slide-up',
      scale: 'animate-scale-in',
      bounce: 'animate-bounce-in',
      rotate: 'animate-spin',
      flip: 'animate-pulse'
    }
  };

  const isInteractive = !!onClick;

  const classes = clsx(
    config.baseClasses,
    config.variantClasses[variant],
    config.paddingClasses[padding],
    config.animationClasses[animationType],
    hover ? 'hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10' : '',
    isInteractive ? 'cursor-pointer hover:scale-105' : '',
    className
  );

  const style: React.CSSProperties = {
    animationDuration: `${duration}ms`,
    animationDelay: `${delay}ms`,
    animationFillMode: 'both'
  };

  return (
    <Component 
      className={classes}
      style={style}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};
