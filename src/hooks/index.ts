// ================================
// src/hooks/index.ts (Updated)
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
export { useMultilingualChatBot } from './useChatBot';

// Export types
export type { MousePosition } from './useMousePosition';
export type { 
  UseIntersectionObserverOptions, 
  UseIntersectionObserverReturn 
} from './useIntersectionObserver';
export type { ScreenSize } from './useResponsive';
export type { ScrollPosition } from './useScrollPosition';
export type { UsePortfolioReturn } from './usePortfolio';
export type { UseMultilingualChatBotProps, UseMultilingualChatBotReturn } from './useChatBot';