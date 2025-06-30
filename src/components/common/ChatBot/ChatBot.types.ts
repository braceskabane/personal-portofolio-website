// ================================
// src/components/common/ChatBot/ChatBot.types.ts
// ================================

export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
    isLoading?: boolean;
  }
  
  export interface ChatBotProps {
    isOpen: boolean;
    onToggle: () => void;
    className?: string;
  }
  
  export interface ChatContextData {
    name: string;
    title: string;
    experience: string;
    skills: string[];
    projects: string[];
    contact: string;
    background: string;
  }