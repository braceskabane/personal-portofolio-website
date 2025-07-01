// ================================
// UPDATE: SmartFloatingActions Component
// File: src/components/common/SmartFloatingActions/SmartFloatingActions.tsx
// ================================

'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp, MessageCircle } from 'lucide-react';
import ChatBot from '@/components/common/ChatBot/ChatBot';
import { PortfolioChatUtils } from '@/utils/portfolioChatUtils';

interface SmartFloatingActionsProps {
  portfolioData: {
    personalInfo?: any;
    skills?: any[];
    projects?: any[];
    experience?: any[];
  };
  isChatOpen: boolean;
  onChatToggle: () => void;
}

export const SmartFloatingActions: React.FC<SmartFloatingActionsProps> = ({ 
  portfolioData, 
  isChatOpen, 
  onChatToggle 
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const chatContext = React.useMemo(() => {
    return PortfolioChatUtils.buildChatContext(portfolioData);
  }, [portfolioData]);

  return (
    <>
      {/* Floating Actions Container */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end space-y-3">
        {/* ChatBot Toggle - SELALU TERLIHAT */}
        {!isChatOpen && (
          <button
            onClick={onChatToggle}
            className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white rounded-full shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-110 group relative"
            aria-label="Open AI Chat"
          >
            <MessageCircle className="w-6 h-6 mx-auto" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-gray-600">
                💬 AI Assistant
                <div className="absolute top-full right-2 border-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          </button>
        )}

        {/* Back to Top - HANYA MUNCUL SETELAH SCROLL */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="w-14 h-14 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white rounded-full shadow-lg hover:scale-110 transform transition-all duration-300 group"
            aria-label="Back to top"
          >
            <ChevronUp size={20} className="mx-auto group-hover:animate-bounce" />
          </button>
        )}
      </div>

      {/* ChatBot Window - ← FIX: showFloatingButton={false} */}
      <ChatBot
        isOpen={isChatOpen}
        onToggle={onChatToggle}
        context={chatContext}
        apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY}
        defaultLanguage="id"
        enableLanguageSwitch={true}
        enableAutoLanguageDetection={true}
        showFloatingButton={false} // ← FIX: Disable floating button dari ChatBot
        className="z-50"
      />
    </>
  );
};