// ================================
// src/components/ui/Button/Button.tsx
// ================================

'use client';

import React from 'react';
import { ButtonProps, ButtonConfig } from './Button.types';

// Simple clsx implementation with conditional support
const clsx = (...classes: (string | undefined | null | false | boolean)[]): string => {
  return classes.filter((cls) => cls && typeof cls === 'string').join(' ');
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  disabled,
  className = '',
  onHover,
  onFocus,
  ...props
}) => {
  const config: ButtonConfig = {
    baseClasses: 'font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black flex items-center justify-center gap-2 border-0',
    variantClasses: {
      primary: 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:scale-105 focus:ring-cyan-500 shadow-lg shadow-cyan-500/25',
      secondary: 'border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black focus:ring-cyan-400',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-lg shadow-red-500/25',
      ghost: 'text-gray-400 hover:text-white hover:bg-gray-800 focus:ring-gray-400',
      outline: 'border-2 border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white focus:ring-gray-400'
    },
    sizeClasses: {
      small: 'px-3 py-2 text-sm',
      medium: 'px-6 py-3 text-base',
      large: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl'
    }
  };

  const isDisabled = disabled || loading;

  const classes = clsx(
    config.baseClasses,
    config.variantClasses[variant],
    config.sizeClasses[size],
    fullWidth ? 'w-full' : '',
    isDisabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : '',
    className
  );

  const LoadingSpinner = () => (
    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  );

  const renderIcon = () => {
    if (loading) return <LoadingSpinner />;
    if (!icon) return null;
    return icon;
  };

  const renderContent = () => {
    if (iconPosition === 'right') {
      return (
        <>
          {children}
          {renderIcon()}
        </>
      );
    }
    
    return (
      <>
        {renderIcon()}
        {children}
      </>
    );
  };

  const handleMouseEnter = () => {
    if (onHover && !isDisabled) onHover();
  };

  const handleFocus = () => {
    if (onFocus && !isDisabled) onFocus();
  };

  return (
    <button 
      className={classes} 
      disabled={isDisabled}
      onMouseEnter={onHover ? handleMouseEnter : undefined}
      onFocus={onFocus ? handleFocus : undefined}
      {...props}
    >
      {renderContent()}
    </button>
  );
};
