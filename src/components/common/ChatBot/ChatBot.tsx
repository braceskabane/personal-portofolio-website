// ================================
// SOLUTION: Fix ChatBot Component Conflict
// ================================

// ================================
// OPTION 1: Update ChatBot Component (Recommended)
// File: src/components/common/ChatBot/ChatBot.tsx
// ================================

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Input } from '@/components/ui';
import { Send, Bot, User, X, MessageCircle } from 'lucide-react';
import { ChatBotProps, ChatContextData } from './ChatBot.types';
import { SupportedLanguage, LanguageConfig } from '@/types/language.types';
import { SUPPORTED_LANGUAGES, getLanguageConfig } from '@/utils/languages';
import { getTranslation } from '@/utils/translations';
import { useMultilingualChatBot } from '@/hooks/useChatBot';

interface MultilingualChatBotProps extends ChatBotProps {
  context: ChatContextData;
  apiKey?: string;
  defaultLanguage?: SupportedLanguage;
  enableLanguageSwitch?: boolean;
  enableAutoLanguageDetection?: boolean;
  showFloatingButton?: boolean; // ← TAMBAH PROP INI
}

const MultilingualChatBot: React.FC<MultilingualChatBotProps> = ({ 
  isOpen, 
  onToggle, 
  className = '',
  context,
  apiKey,
  defaultLanguage = 'en',
  enableLanguageSwitch = true,
  enableAutoLanguageDetection = true,
  showFloatingButton = true // ← DEFAULT TRUE untuk backward compatibility
}) => {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use the chatbot hook
  const {
    messages,
    isLoading,
    currentLanguage,
    sendMessage,
    changeLanguage
  } = useMultilingualChatBot({
    context,
    apiKey,
    defaultLanguage,
    enableAutoLanguageDetection,
    config: {
      debug: process.env.NODE_ENV === 'development',
      model: 'gemini-1.5-flash',
      temperature: 0.7,
      maxTokens: 1000
    }
  });

  // Quick actions based on current language
  const getQuickActions = () => [
    { 
      label: getTranslation('quickActions.experience', currentLanguage), 
      query: getTranslation('quickActions.experience', currentLanguage)
    },
    { 
      label: getTranslation('quickActions.skills', currentLanguage), 
      query: getTranslation('quickActions.skills', currentLanguage)
    },
    { 
      label: getTranslation('quickActions.projects', currentLanguage), 
      query: getTranslation('quickActions.projects', currentLanguage)
    },
    { 
      label: getTranslation('quickActions.contact', currentLanguage), 
      query: getTranslation('quickActions.contact', currentLanguage)
    }
  ];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    const messageToSend = inputMessage.trim();
    setInputMessage('');
    
    await sendMessage(messageToSend);
  };

  const handleLanguageChange = (language: SupportedLanguage) => {
    changeLanguage(language);
    setShowLanguageMenu(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ← FIX: Hanya render floating button jika showFloatingButton = true
  if (!isOpen && showFloatingButton) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <Button
          variant="primary"
          size="large"
          onClick={onToggle}
          className="rounded-full w-16 h-16 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
        >
          <MessageCircle size={24} />
        </Button>
      </div>
    );
  }

  // ← FIX: Jika closed dan showFloatingButton = false, return null
  if (!isOpen && !showFloatingButton) {
    return null;
  }

  const currentLangConfig = getLanguageConfig(currentLanguage);

  return (
    <div className={`fixed inset-0 md:bottom-6 md:right-6 md:inset-auto z-[60] ${className}`}>
      <Card 
        variant="default" 
        padding="none"
        className="w-full h-full md:w-96 md:h-[600px] md:max-h-[80vh] flex flex-col shadow-2xl shadow-cyan-500/10 border-cyan-400/20 md:rounded-lg rounded-none"
      >
        {/* Header with Language Selector */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-700 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
              <Bot size={16} className="md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm md:text-base">{getTranslation('ui.title', currentLanguage)}</h3>
              <p className="text-xs text-gray-400 hidden md:block">{getTranslation('ui.subtitle', currentLanguage)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {enableLanguageSwitch && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="w-8 h-8 p-0 flex items-center justify-center"
                >
                  <span className="text-lg">{currentLangConfig.flag}</span>
                </Button>
                
                {showLanguageMenu && (
                  <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl min-w-[200px] z-10">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg ${
                          currentLanguage === lang.code ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <div className="text-left">
                          <div className="font-medium">{lang.nativeName}</div>
                          <div className="text-xs text-gray-400">{lang.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <Button
              variant="ghost"
              size="small"
              onClick={onToggle}
              className="w-8 h-8 p-0"
            >
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gray-900/50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[85%] md:max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-cyan-500' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                  {message.role === 'user' ? <User size={12} className="md:w-4 md:h-4" /> : <Bot size={12} className="md:w-4 md:h-4" />}
                </div>

                <div className={`rounded-2xl p-2 md:p-3 ${
                  message.role === 'user'
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}>
                  {message.isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs md:text-sm">{getTranslation('ui.thinking', currentLanguage)}</span>
                    </div>
                  ) : (
                    <p className="text-xs md:text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                  )}
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="p-3 border-t border-gray-700 bg-gray-800/50">
            <p className="text-xs text-gray-400 mb-2">
              {currentLanguage === 'id' ? 'Pertanyaan cepat:' : 'Quick questions:'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {getQuickActions().map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(action.query)}
                  className="w-full text-left text-xs text-cyan-400 hover:text-cyan-300 p-2 rounded hover:bg-gray-700/50 transition-colors border border-gray-600/50 hover:border-cyan-400/50"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-3 md:p-4 border-t border-gray-700 bg-gray-800/30">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                placeholder={getTranslation('ui.placeholder', currentLanguage)}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="text-sm h-10"
              />
            </div>
            <Button
              variant="primary"
              size="medium"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              icon={<Send size={16} />}
              className="px-3 h-10 min-w-[2.5rem] flex items-center justify-center shrink-0"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MultilingualChatBot;