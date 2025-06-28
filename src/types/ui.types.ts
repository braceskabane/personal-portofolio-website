// ================================
// src/types/ui.types.ts
// ================================

import React from 'react';

// Animation interfaces
export interface AnimationBehavior {
  animationType?: AnimationType;
  duration?: number;
  delay?: number;
  ease?: AnimationEase;
}

export type AnimationType = 
  | 'fade' 
  | 'slide' 
  | 'scale' 
  | 'bounce' 
  | 'rotate' 
  | 'flip';

export type AnimationEase = 
  | 'linear' 
  | 'ease' 
  | 'ease-in' 
  | 'ease-out' 
  | 'ease-in-out' 
  | 'spring';

// Navigation behavior interface
export interface NavigationBehavior {
  isActive: boolean;
  onClick: () => void;
  onHover?: () => void;
}

// Interactive component interface
export interface InteractiveComponent {
  onClick?: () => void;
  onHover?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

// Component variants
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

export type CardVariant = 
  | 'default' 
  | 'glass' 
  | 'elevated' 
  | 'outlined' 
  | 'filled';

export type InputVariant = 
  | 'default' 
  | 'outlined' 
  | 'filled' 
  | 'underlined';

// Theme and styling
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export type ColorScheme = 'light' | 'dark' | 'auto';

// Responsive breakpoints
export interface ScreenSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLarge: boolean;
}

// Mouse and scroll tracking
export interface MousePosition {
  x: number;
  y: number;
}

export interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right' | null;
}

// Particle system
export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life?: number;
  maxLife?: number;
}

export interface ParticleSystemConfig {
  particleCount: number;
  colors: string[];
  minSize: number;
  maxSize: number;
  speed: number;
  opacity: number;
  enableMouse: boolean;
  mouseRadius: number;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  progress?: number;
  message?: string;
}

// Error handling
export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string;
  details?: any;
}

// Form validation
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FormField {
  name: string;
  value: any;
  rules: ValidationRule[];
  error?: string;
  touched?: boolean;
}

// Component props with children
export interface WithChildren {
  children: React.ReactNode;
}

// Component props with className
export interface WithClassName {
  className?: string;
}

// Component props with style
export interface WithStyle {
  style?: React.CSSProperties;
}

// Common component props
export interface CommonComponentProps extends WithChildren, WithClassName, WithStyle {
  id?: string;
  'data-testid'?: string;
}
