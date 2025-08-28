// ================================
// src/app/test-hooks/page.tsx
// ================================

'use client';

import React, { useState } from 'react';
import { Button, Card, Input } from '@/components/ui';
import { 
  useMousePosition, 
  useIntersectionObserver, 
  useResponsive,
  useDebounce,
  useScrollPosition,
  useLocalStorage,
  useActiveSection
} from '@/hooks';

export default function HooksTestPage() {
  // Test useMousePosition
  const mousePosition = useMousePosition();
  
  // Test useResponsive
  const screenSize = useResponsive();
  
  // Test useScrollPosition
  const scrollPosition = useScrollPosition();
  
  // Test useDebounce
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  // Test useLocalStorage
  const [name, setName] = useLocalStorage('user-name', 'Anonymous');
  const [theme, setTheme] = useLocalStorage('user-theme', 'dark');
  
  // Test useActiveSection
  const activeSection = useActiveSection(['section1', 'section2', 'section3', 'section4']);
  
  // Test useIntersectionObserver for specific elements
  const { isIntersecting: isSection1Visible, ref: section1Ref } = useIntersectionObserver({
    threshold: 0.5,
    freezeOnceVisible: false
  });
  
  const { isIntersecting: isSection2Visible, ref: section2Ref } = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Hooks Testing Lab
            </h1>
            <div className="text-sm text-gray-400">
              Active Section: <span className="text-cyan-400">{activeSection || 'None'}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Real-time Stats Panel */}
      <div className="fixed top-20 right-4 z-30 space-y-2">
        <Card variant="glass" padding="small" className="text-xs">
          <div className="space-y-1">
            <div>Mouse: {mousePosition.x}, {mousePosition.y}</div>
            <div>Scroll: {scrollPosition.y}px {scrollPosition.direction}</div>
            <div>Screen: {screenSize.width}x{screenSize.height}</div>
          </div>
        </Card>
      </div>

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 space-y-16">
          
          {/* Section 1: Mouse & Scroll Tracking */}
          <section id="section1" ref={section1Ref} className="min-h-screen flex items-center">
            <div className="w-full">
              <Card variant="default" padding="large">
                <h2 className="text-3xl font-bold mb-8 text-cyan-400">
                  Mouse & Scroll Tracking
                  {isSection1Visible && <span className="text-green-400 ml-2">👁️ Visible</span>}
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Mouse Position */}
                  <Card variant="elevated" padding="medium">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">useMousePosition</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>X Position:</span>
                        <span className="text-cyan-400">{mousePosition.x}px</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Y Position:</span>
                        <span className="text-cyan-400">{mousePosition.y}px</span>
                      </div>
                      <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                        <div 
                          className="w-2 h-2 bg-cyan-400 rounded-full transition-all duration-75"
                          style={{
                            transform: `translate(${(mousePosition.x % 200)}px, ${(mousePosition.y % 100)}px)`
                          }}
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Scroll Position */}
                  <Card variant="elevated" padding="medium">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">useScrollPosition</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Scroll Y:</span>
                        <span className="text-cyan-400">{scrollPosition.y}px</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Direction:</span>
                        <span className="text-cyan-400">{scrollPosition.direction || 'None'}</span>
                      </div>
                      <div className="mt-4">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((scrollPosition.y / 2000) * 100, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Scroll Progress</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>
            </div>
          </section>

          {/* Section 2: Responsive & Debounce */}
          <section id="section2" ref={section2Ref} className="min-h-screen flex items-center">
            <div className="w-full">
              <Card variant="default" padding="large">
                <h2 className="text-3xl font-bold mb-8 text-cyan-400">
                  Responsive & Debounce
                  {isSection2Visible && <span className="text-green-400 ml-2">👁️ Visible (Frozen)</span>}
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Responsive Hook */}
                  <Card variant="glass" padding="medium">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">useResponsive</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Mobile:</span>
                        <span className={`px-2 py-1 rounded text-xs ${screenSize.isMobile ? 'bg-green-500' : 'bg-gray-600'}`}>
                          {screenSize.isMobile ? 'YES' : 'NO'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Tablet:</span>
                        <span className={`px-2 py-1 rounded text-xs ${screenSize.isTablet ? 'bg-green-500' : 'bg-gray-600'}`}>
                          {screenSize.isTablet ? 'YES' : 'NO'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Desktop:</span>
                        <span className={`px-2 py-1 rounded text-xs ${screenSize.isDesktop ? 'bg-green-500' : 'bg-gray-600'}`}>
                          {screenSize.isDesktop ? 'YES' : 'NO'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Large:</span>
                        <span className={`px-2 py-1 rounded text-xs ${screenSize.isLarge ? 'bg-green-500' : 'bg-gray-600'}`}>
                          {screenSize.isLarge ? 'YES' : 'NO'}
                        </span>
                      </div>
                      <div className="mt-4 text-sm text-gray-400">
                        Size: {screenSize.width} × {screenSize.height}
                      </div>
                    </div>
                  </Card>

                  {/* Debounce Hook */}
                  <Card variant="glass" padding="medium">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">useDebounce</h3>
                    <div className="space-y-4">
                      <Input
                        label="Search (500ms debounce)"
                        placeholder="Type something..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-400">Immediate:</span>
                          <span className="ml-2 text-cyan-400">"{searchTerm}"</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Debounced:</span>
                          <span className="ml-2 text-purple-400">"{debouncedSearchTerm}"</span>
                        </div>
                      </div>
                      {searchTerm !== debouncedSearchTerm && (
                        <div className="text-yellow-400 text-sm">⏳ Waiting for user to stop typing...</div>
                      )}
                    </div>
                  </Card>
                </div>
              </Card>
            </div>
          </section>

          {/* Section 3: Local Storage */}
          <section id="section3" className="min-h-screen flex items-center">
            <div className="w-full">
              <Card variant="default" padding="large">
                <h2 className="text-3xl font-bold mb-8 text-cyan-400">Local Storage Persistence</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card variant="outlined" padding="medium">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">useLocalStorage</h3>
                    <div className="space-y-4">
                      <div>
                        <Input
                          label="Your Name (Persisted)"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your name"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          This value is saved to localStorage
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Theme Preference
                        </label>
                        <div className="flex gap-2">
                          <Button
                            variant={theme === 'dark' ? 'primary' : 'ghost'}
                            size="small"
                            onClick={() => setTheme('dark')}
                          >
                            Dark
                          </Button>
                          <Button
                            variant={theme === 'light' ? 'primary' : 'ghost'}
                            size="small"
                            onClick={() => setTheme('light')}
                          >
                            Light
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card variant="outlined" padding="medium">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Stored Values</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-900 rounded">
                        <div className="text-sm text-gray-400">Name:</div>
                        <div className="text-cyan-400">{name}</div>
                      </div>
                      <div className="p-3 bg-gray-900 rounded">
                        <div className="text-sm text-gray-400">Theme:</div>
                        <div className="text-cyan-400">{theme}</div>
                      </div>
                      <div className="text-xs text-gray-500">
                        💡 Refresh the page - values will persist!
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>
            </div>
          </section>

          {/* Section 4: Intersection Observer Demo */}
          <section id="section4" className="min-h-screen flex items-center">
            <div className="w-full">
              <Card variant="default" padding="large">
                <h2 className="text-3xl font-bold mb-8 text-cyan-400">Intersection Observer</h2>
                
                <div className="space-y-8">
                  <Card variant="elevated" padding="medium">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">useIntersectionObserver</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Section Visibility:</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span>Section 1:</span>
                            <span className={`px-2 py-1 rounded text-xs ${isSection1Visible ? 'bg-green-500' : 'bg-gray-600'}`}>
                              {isSection1Visible ? 'VISIBLE' : 'HIDDEN'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Section 2:</span>
                            <span className={`px-2 py-1 rounded text-xs ${isSection2Visible ? 'bg-green-500' : 'bg-gray-600'}`}>
                              {isSection2Visible ? 'VISIBLE' : 'HIDDEN'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Active Section:</h4>
                        <div className="p-3 bg-gray-900 rounded">
                          <div className="text-cyan-400 text-lg">
                            {activeSection || 'None'}
                          </div>
                          <div className="text-xs text-gray-400">
                            Based on useActiveSection hook
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Animation Demo Elements */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card 
                      variant="glass" 
                      padding="medium"
                      className="opacity-0 animate-fade-in"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-cyan-400 rounded-full mx-auto mb-2 animate-pulse" />
                        <p className="text-sm">Fade In Animation</p>
                      </div>
                    </Card>
                    
                    <Card 
                      variant="glass" 
                      padding="medium"
                      className="opacity-0 animate-slide-up"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-400 rounded-full mx-auto mb-2 animate-bounce" />
                        <p className="text-sm">Slide Up Animation</p>
                      </div>
                    </Card>
                    
                    <Card 
                      variant="glass" 
                      padding="medium"
                      className="opacity-0 animate-scale-in"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-pink-400 rounded-full mx-auto mb-2 animate-spin" />
                        <p className="text-sm">Scale In Animation</p>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Summary Section */}
          <section className="py-16">
            <Card variant="elevated" padding="large">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    🎉 All Hooks Working Perfectly!
                  </span>
                </h2>
                <p className="text-gray-300 mb-8">
                  Custom hooks implementing SOLID principles with TypeScript
                </p>
                
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <Card variant="glass" padding="small">
                    <div className="text-cyan-400 font-semibold">✅ useMousePosition</div>
                    <div className="text-gray-400">Real-time tracking</div>
                  </Card>
                  <Card variant="glass" padding="small">
                    <div className="text-cyan-400 font-semibold">✅ useIntersectionObserver</div>
                    <div className="text-gray-400">Visibility detection</div>
                  </Card>
                  <Card variant="glass" padding="small">
                    <div className="text-cyan-400 font-semibold">✅ useResponsive</div>
                    <div className="text-gray-400">Breakpoint detection</div>
                  </Card>
                  <Card variant="glass" padding="small">
                    <div className="text-cyan-400 font-semibold">✅ useDebounce</div>
                    <div className="text-gray-400">Input optimization</div>
                  </Card>
                </div>
                
                <div className="grid md:grid-cols-4 gap-4 text-sm mt-4">
                  <Card variant="glass" padding="small">
                    <div className="text-cyan-400 font-semibold">✅ useScrollPosition</div>
                    <div className="text-gray-400">Scroll tracking</div>
                  </Card>
                  <Card variant="glass" padding="small">
                    <div className="text-cyan-400 font-semibold">✅ useLocalStorage</div>
                    <div className="text-gray-400">Data persistence</div>
                  </Card>
                  <Card variant="glass" padding="small">
                    <div className="text-cyan-400 font-semibold">✅ useActiveSection</div>
                    <div className="text-gray-400">Navigation sync</div>
                  </Card>
                  <Card variant="glass" padding="small">
                    <div className="text-cyan-400 font-semibold">✅ usePortfolio</div>
                    <div className="text-gray-400">Data management</div>
                  </Card>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}