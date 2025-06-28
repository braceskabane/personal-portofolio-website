// ================================
// src/types/events.types.ts
// ================================

// Custom event types for portfolio
export interface PortfolioEvent {
    type: PortfolioEventType;
    payload?: any;
    timestamp: Date;
  }
  
  export type PortfolioEventType = 
    | 'SECTION_VIEWED'
    | 'PROJECT_CLICKED'
    | 'CONTACT_SUBMITTED'
    | 'SKILL_HOVERED'
    | 'DOWNLOAD_RESUME'
    | 'SOCIAL_LINK_CLICKED'
    | 'SCROLL_PROGRESS'
    | 'THEME_CHANGED';
  
  // Event handlers
  export type EventHandler<T = any> = (payload: T) => void;
  
  export interface EventEmitter {
    on<T>(event: PortfolioEventType, handler: EventHandler<T>): void;
    off<T>(event: PortfolioEventType, handler: EventHandler<T>): void;
    emit<T>(event: PortfolioEventType, payload?: T): void;
  }
  