// ================================
// src/components/ui/Input/Input.types.ts
// ================================

import React from 'react';

export type InputVariant = 
  | 'default' 
  | 'outlined' 
  | 'filled' 
  | 'underlined';

export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export interface InputConfig {
  baseClasses: string;
  variantClasses: Record<InputVariant, string>;
  sizeClasses: Record<InputSize, string>;
}