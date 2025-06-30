// ================================
// src/app/test-chatbot/page.tsx (FIXED VERSION)
// ================================

'use client';

import React, { useState } from 'react';
import { Card, Button, Input } from '@/components/ui';
// FIXED: Import the correct component
import MultilingualChatBot from '@/components/common/ChatBot/ChatBot';
import { Bot, Settings, Key, FileText, MessageCircle, Zap, Shield, Globe } from 'lucide-react';
import type { ChatContextData } from '@/components/common/ChatBot/ChatBot.types';

export default function ChatBotTestPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  // Portfolio context for the chatbot
  const portfolioContext: ChatContextData = {
    name: "Muhammad Daffa Fisabilillah",
    title: "Senior Full Stack Developer & UI/UX Designer",
    experience: "5+ years of experience in full-stack development, specializing in React, Next.js, TypeScript, and modern web technologies. Led teams of 6+ developers and architected scalable solutions for high-traffic applications handling 1M+ daily users.",
    skills: [
      "React.js", "Next.js", "TypeScript", "Node.js", 
      "Python", "AWS", "Docker", "PostgreSQL", 
      "MongoDB", "GraphQL", "REST APIs", "Jest",
      "Kubernetes", "Redis", "Express.js", "Vue.js"
    ],
    projects: [
      "E-Commerce Platform: Full-stack solution serving 10K+ users with real-time inventory, payment processing via Stripe, and comprehensive admin dashboard",
      "AI Analytics Dashboard: Real-time platform with ML insights processing 1M+ data points daily, featuring advanced data visualization with D3.js",
      "Mobile Banking App: Secure application with 50K+ downloads, 4.8★ rating, biometric authentication, and international transfer capabilities",
      "Task Management API: RESTful service handling 1M+ daily requests with 99.8% uptime, supporting team collaboration and real-time notifications",
      "Component Library: Reusable React components with TypeScript, Storybook documentation, and 95% test coverage used across multiple projects"
    ],
    contact: "Email: daffa.fisabilillah@example.com, Phone: +62 812-3456-7890, Location: Jakarta, Indonesia, LinkedIn: linkedin.com/in/daffafisabilillah",
    background: "Started as a Junior Developer and progressed to Senior Full Stack Developer through dedication to learning and excellence. Passionate about mentoring teams, contributing to open source projects, and staying at the forefront of technology trends. Believes in writing clean, maintainable code and creating solutions that make a real impact on users' lives."
  };

  const handleSetApiKey = () => {
    if (apiKey.trim()) {
      setIsApiKeySet(true);
      setShowApiKeyInput(false);
      // Store in localStorage for this session
      localStorage.setItem('test_gemini_api_key', apiKey);
      console.log('✅ API Key configured for Gemini Pro');
    }
  };

  const handleResetApiKey = () => {
    setIsApiKeySet(false);
    setApiKey('');
    setShowApiKeyInput(false);
    localStorage.removeItem('test_gemini_api_key');
    console.log('🔄 API Key reset - switching to mock mode');
  };

  // Load API key from localStorage on component mount
  React.useEffect(() => {
    const savedApiKey = localStorage.getItem('test_gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsApiKeySet(true);
    }
  }, []);

  const sampleQuestions = [
    "Ceritakan pengalaman kerja Daffa",
    "Apa keahlian teknis utama Daffa?",
    "Tunjukkan proyek-proyek terbaik Daffa",
    "Bagaimana cara menghubungi Daffa?",
    "Teknologi apa saja yang dikuasai Daffa?",
    "Cerita latar belakang profesional Daffa",
    "Apakah Daffa punya pengalaman memimpin tim?",
    "Apa yang membuat Daffa menonjol sebagai developer?"
  ];

  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI-Powered Responses",
      description: "Intelligent context-aware answers using Google Gemini Pro"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Chat",
      description: "Fast responses with typing indicators and smooth UX"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "No data storage, encrypted communications, rate limiting"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multilingual Support",
      description: "Support for 8 languages with auto-detection"
    }
  ];

  // Get the current API key to pass to the chatbot
  const getCurrentApiKey = () => {
    return isApiKeySet ? apiKey : process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              AI ChatBot Testing Lab
            </h1>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                isApiKeySet || process.env.NEXT_PUBLIC_GEMINI_API_KEY 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isApiKeySet || process.env.NEXT_PUBLIC_GEMINI_API_KEY 
                    ? 'bg-green-400' 
                    : 'bg-yellow-400'
                }`}></div>
                <span>
                  {isApiKeySet || process.env.NEXT_PUBLIC_GEMINI_API_KEY 
                    ? 'Gemini Pro' 
                    : 'Mock Mode'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 space-y-12">
          
          {/* Hero Section */}
          <section>
            <Card variant="default" padding="large">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Bot size={40} className="text-white" />
                </div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Portfolio AI ChatBot
                </h2>
                <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
                  Intelligent chatbot powered by Google Gemini Pro that provides personalized responses about Daffa's 
                  professional experience, technical skills, and project portfolio. Experience the future of portfolio interaction!
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                {features.map((feature, index) => (
                  <Card key={index} variant="glass" padding="medium" hover>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </section>

          {/* API Configuration */}
          <section>
            <Card variant="default" padding="large">
              <h2 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
                <Key size={24} className="mr-2" />
                Google Gemini API Configuration
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <Card variant="glass" padding="medium">
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">Current Status</h3>
                  
                  {!isApiKeySet && !process.env.NEXT_PUBLIC_GEMINI_API_KEY ? (
                    <div className="space-y-4">
                      <div className="flex items-center text-yellow-400">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                        <span>Using Mock Responses (Demo Mode)</span>
                      </div>
                      <p className="text-gray-400 text-sm">
                        The chatbot is currently using pre-programmed responses. To enable real AI interactions, 
                        configure your Google Gemini API key.
                      </p>
                      <Button 
                        variant="primary" 
                        onClick={() => setShowApiKeyInput(true)}
                        disabled={showApiKeyInput}
                      >
                        Configure API Key
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-green-400">
                          <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                          <span>Google Gemini Pro Active</span>
                        </div>
                        {isApiKeySet && (
                          <Button 
                            variant="ghost" 
                            size="small"
                            onClick={handleResetApiKey}
                          >
                            Reset
                          </Button>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">
                        ✅ API key configured successfully. The chatbot will now use real Google Gemini Pro for intelligent responses.
                      </p>
                      <div className="text-xs text-gray-500">
                        Source: {isApiKeySet ? 'Manual Configuration' : 'Environment Variable'}
                      </div>
                    </div>
                  )}

                  {showApiKeyInput && (
                    <div className="mt-4 space-y-3">
                      <Input
                        type="password"
                        placeholder="Enter your Google Gemini API key..."
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full"
                      />
                      <div className="flex space-x-2">
                        <Button onClick={handleSetApiKey} disabled={!apiKey.trim()}>
                          Set API Key
                        </Button>
                        <Button variant="ghost" onClick={() => setShowApiKeyInput(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>

                <Card variant="glass" padding="medium">
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">How to Get API Key</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                      <div>
                        <div className="font-medium text-white">Visit Google AI Studio</div>
                        <div className="text-gray-400">Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">aistudio.google.com/app/apikey</a></div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                      <div>
                        <div className="font-medium text-white">Create API Key</div>
                        <div className="text-gray-400">Sign in and create a new API key (free tier available)</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                      <div>
                        <div className="font-medium text-white">Configure Here</div>
                        <div className="text-gray-400">Copy and paste the key above to enable real AI responses</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-cyan-900/20 border border-cyan-500/30 rounded">
                    <p className="text-cyan-300 text-xs">
                      💡 <strong>Free Tier:</strong> 15 requests per minute at no cost. Perfect for portfolio testing!
                    </p>
                  </div>
                </Card>
              </div>
            </Card>
          </section>

          {/* Sample Questions */}
          <section>
            <Card variant="default" padding="large">
              <h2 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
                <MessageCircle size={24} className="mr-2" />
                Contoh Pertanyaan (Bahasa Indonesia)
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {sampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setIsChatOpen(true)}
                    className="text-left p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-300 text-sm text-gray-300 hover:text-white hover:border-cyan-400/30 border border-transparent group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium mb-1">"{question}"</div>
                        <div className="text-xs text-gray-500">Klik untuk test pertanyaan ini</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <p className="text-blue-300 text-sm">
                  💡 <strong>Tips:</strong> Chatbot mendukung deteksi bahasa otomatis. Anda bisa bertanya dalam bahasa Indonesia, Inggris, atau bahasa lainnya!
                </p>
              </div>
            </Card>
          </section>

          {/* Portfolio Context Preview */}
          <section>
            <Card variant="default" padding="large">
              <h2 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
                <FileText size={24} className="mr-2" />
                Data Konteks Portfolio
              </h2>
              
              <div className="grid lg:grid-cols-3 gap-6">
                <Card variant="glass" padding="medium">
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">Informasi Personal</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-400">Nama:</span> <span className="text-cyan-400">{portfolioContext.name}</span></div>
                    <div><span className="text-gray-400">Posisi:</span> <span className="text-cyan-400">{portfolioContext.title}</span></div>
                    <div><span className="text-gray-400">Pengalaman:</span> <span className="text-cyan-400">5+ tahun</span></div>
                    <div><span className="text-gray-400">Lokasi:</span> <span className="text-cyan-400">Jakarta, Indonesia</span></div>
                  </div>
                </Card>

                <Card variant="glass" padding="medium">
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">Keahlian Teknis</h3>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400 mb-2">Teknologi Utama:</div>
                    <div className="flex flex-wrap gap-1">
                      {portfolioContext.skills.slice(0, 8).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      + {portfolioContext.skills.length - 8} keahlian lainnya
                    </div>
                  </div>
                </Card>

                <Card variant="glass" padding="medium">
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">Proyek</h3>
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-400 mb-2">Proyek Unggulan:</div>
                    {portfolioContext.projects.slice(0, 3).map((project, index) => (
                      <div key={index} className="text-xs text-gray-300">
                        • {project.split(':')[0]}
                      </div>
                    ))}
                    <div className="text-xs text-gray-500 mt-2">
                      + {portfolioContext.projects.length - 3} proyek lainnya
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </section>

          {/* Call to Action */}
          <section>
            <Card variant="elevated" padding="large">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Siap untuk Test ChatBot!
                </h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Klik tombol di bawah untuk memulai percakapan dengan AI assistant Daffa. 
                  Tanyakan tentang pengalaman, keahlian, proyek, atau apapun yang ingin Anda ketahui!
                </p>
                <Button
                  variant="primary"
                  size="large"
                  fullWidth
                  onClick={() => setIsChatOpen(true)}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transform hover:scale-105 transition-all duration-300"
                >
                  <Bot size={24} className="mr-2" />
                  Mulai Percakapan ChatBot
                </Button>
                <p className="text-gray-400 text-sm mt-4">
                  Jendela chat akan muncul di pojok kanan bawah
                </p>
              </div>
            </Card>
          </section>
        </div>
      </div>

      {/* FIXED: AI ChatBot Component with proper props */}
      <MultilingualChatBot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        context={portfolioContext}
        apiKey={getCurrentApiKey()} // Use the function to get current API key
        defaultLanguage="id" // Set bahasa default
        enableLanguageSwitch={true}
        enableAutoLanguageDetection={true}
        className="z-50"
      />
    </div>
  );
}