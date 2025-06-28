// ================================
// src/hooks/index.ts
// ================================

// Export all hooks
export { useMousePosition } from './useMousePosition';
export { useIntersectionObserver } from './useIntersectionObserver';
export { useResponsive } from './useResponsive';
export { useDebounce } from './useDebounce';
export { useScrollPosition } from './useScrollPosition';
export { useLocalStorage } from './useLocalStorage';
export { useActiveSection } from './useActiveSection';
export { usePortfolio } from './usePortfolio';

// Export types
export type { MousePosition } from './useMousePosition';
export type { 
  UseIntersectionObserverOptions, 
  UseIntersectionObserverReturn 
} from './useIntersectionObserver';
export type { ScreenSize } from './useResponsive';
export type { ScrollPosition } from './useScrollPosition';
export type { UsePortfolioReturn } from './usePortfolio';