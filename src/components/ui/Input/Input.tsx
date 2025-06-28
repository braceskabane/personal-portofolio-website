// ================================
// src/components/ui/Input/Input.tsx
// ================================

'use client';

import React, { forwardRef } from 'react';
import { InputProps, InputConfig } from './Input.types';

// Simple clsx implementation
const clsx = (...classes: (string | undefined | null | false | boolean)[]): string => {
  return classes.filter((cls) => cls && typeof cls === 'string').join(' ');
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  size = 'medium',
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}, ref) => {
  const config: InputConfig = {
    baseClasses: 'transition-all duration-300 focus:outline-none rounded-lg',
    variantClasses: {
      default: 'bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20',
      outlined: 'bg-transparent border-2 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400',
      filled: 'bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400',
      underlined: 'bg-transparent border-0 border-b-2 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 rounded-none'
    },
    sizeClasses: {
      small: 'px-3 py-2 text-sm',
      medium: 'px-4 py-3 text-base',
      large: 'px-5 py-4 text-lg'
    }
  };

  const hasError = !!error;

  const inputClasses = clsx(
    config.baseClasses,
    config.variantClasses[variant],
    config.sizeClasses[size],
    fullWidth ? 'w-full' : '',
    hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    leftIcon ? 'pl-10' : '',
    rightIcon ? 'pr-10' : '',
    className
  );

  const wrapperClasses = clsx(
    'relative',
    fullWidth ? 'w-full' : ''
  );

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={inputClasses}
          disabled={disabled}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';