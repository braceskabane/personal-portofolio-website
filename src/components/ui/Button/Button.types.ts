// ================================
// src/components/ui/Button/Button.types.ts
// ================================

import React from 'react';

// Define types locally to avoid import issues
export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'danger' 
  | 'ghost' 
  | 'outline';

export type ButtonSize = 
  | 'small' 
  | 'medium' 
  | 'large' 
  | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode; // ← MADE OPTIONAL for icon-only buttons
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
  // Interactive properties
  onHover?: () => void;
  onFocus?: () => void;
}

export interface ButtonConfig {
  baseClasses: string;
  variantClasses: Record<ButtonVariant, string>;
  sizeClasses: Record<ButtonSize, string>;
}
