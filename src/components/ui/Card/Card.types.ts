// ================================
// src/components/ui/Card/Card.types.ts
// ================================

import React from 'react';

export type CardVariant = 
  | 'default' 
  | 'glass' 
  | 'elevated' 
  | 'outlined' 
  | 'filled';

export type CardPadding = 'none' | 'small' | 'medium' | 'large';

export type AnimationType = 
  | 'fade' 
  | 'slide' 
  | 'scale' 
  | 'bounce' 
  | 'rotate' 
  | 'flip';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  onClick?: () => void;
  as?: React.ElementType;
  // Animation properties
  animationType?: AnimationType;
  duration?: number;
  delay?: number;
}

export interface CardConfig {
  baseClasses: string;
  variantClasses: Record<CardVariant, string>;
  paddingClasses: Record<CardPadding, string>;
  animationClasses: Record<AnimationType, string>;
}