// ================================
// STEP 1: Buat Component Terpisah
// File: src/components/common/MinimalAICTA/MinimalAICTA.tsx
// ================================

'use client';

import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

interface MinimalAICTAProps {
  onOpenChat: () => void;
}

// VERSION 1: Inline Link (Default - Paling Minimalis)
export const MinimalAICTA: React.FC<MinimalAICTAProps> = ({ onOpenChat }) => {
  return (
    <div className="text-center">
      <p className="text-gray-400 text-sm">
        Ada pertanyaan tentang portfolio saya?{' '}
        <button
          onClick={onOpenChat}
          className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-all duration-300 hover:scale-105"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Chat dengan AI
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
        </button>
      </p>
    </div>
  );
};

// VERSION 2: Modern Chip Style
export const ModernChipCTA: React.FC<MinimalAICTAProps> = ({ onOpenChat }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onOpenChat}
        className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 text-white rounded-full px-4 py-2 text-sm transition-all duration-300 hover:bg-black/30 group"
      >
        <div className="w-5 h-5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
        <span>AI Assistant</span>
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
      </button>
    </div>
  );
};

// VERSION 3: Icon Button Only
export const IconButtonCTA: React.FC<MinimalAICTAProps> = ({ onOpenChat }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onOpenChat}
        className="relative w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg shadow-cyan-500/25 group"
        title="Chat dengan AI Assistant"
      >
        <MessageCircle className="w-5 h-5 mx-auto mt-3.5" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-gray-600">
            💬 Chat dengan AI
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      </button>
    </div>
  );
};

// VERSION 4: Simple Button
export const SimpleButtonCTA: React.FC<MinimalAICTAProps> = ({ onOpenChat }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onOpenChat}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Chat dengan AI</span>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </button>
    </div>
  );
};

// Default export untuk kemudahan import
export default MinimalAICTA;