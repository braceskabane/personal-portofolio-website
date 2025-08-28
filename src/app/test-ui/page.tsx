// ================================
// src/app/page.tsx
// ================================

'use client';

import React from 'react';
import { Button, Card, Input } from '@/components/ui';

export default function HomePage() {
  const handleButtonClick = (variant: string) => {
    console.log(`${variant} button clicked!`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        
        <div className="container mx-auto px-6 text-center z-10 max-w-6xl">
          <div className="space-y-8">
            {/* Welcome Message */}
            <Card variant="glass" padding="large" className="inline-block">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Advanced Portfolio
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Testing Core Components with SOLID Architecture
              </p>
            </Card>

            {/* Components Demo */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {/* Button Demo */}
              <Card variant="default" padding="large">
                <h2 className="text-2xl font-bold mb-6 text-cyan-400">Button Components</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="primary" 
                      size="medium"
                      onClick={() => handleButtonClick('Primary')}
                    >
                      Primary
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="medium"
                      onClick={() => handleButtonClick('Secondary')}
                    >
                      Secondary
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="danger" 
                      size="small"
                      onClick={() => handleButtonClick('Danger')}
                    >
                      Danger
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="small"
                      onClick={() => handleButtonClick('Ghost')}
                    >
                      Ghost
                    </Button>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    size="large"
                    loading={false}
                    fullWidth
                    onClick={() => handleButtonClick('Full Width')}
                  >
                    Full Width Button
                  </Button>
                  
                  <Button 
                    variant="primary" 
                    loading={true}
                    disabled
                  >
                    Loading State
                  </Button>
                </div>
              </Card>

              {/* Input Demo */}
              <Card variant="default" padding="large">
                <h2 className="text-2xl font-bold mb-6 text-cyan-400">Input Components</h2>
                <div className="space-y-4">
                  <Input 
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    variant="default"
                  />
                  
                  <Input 
                    label="Full Name"
                    type="text"
                    placeholder="Enter your name"
                    variant="outlined"
                    helperText="This will be displayed on your profile"
                  />
                  
                  <Input 
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    variant="filled"
                  />
                  
                  <Input 
                    placeholder="Search something..."
                    variant="underlined"
                    error="This field is required"
                  />
                </div>
              </Card>
            </div>

            {/* Card Demo */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-8 text-center">Card Variants</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card variant="glass" padding="medium" hover>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">Glass Card</h3>
                  <p className="text-gray-300">
                    Beautiful glassmorphism effect with backdrop blur.
                  </p>
                </Card>
                
                <Card variant="elevated" padding="medium" hover>
                  <h3 className="text-xl font-semibold mb-2 text-purple-400">Elevated Card</h3>
                  <p className="text-gray-300">
                    Enhanced depth with custom shadows and glow.
                  </p>
                </Card>
                
                <Card variant="outlined" padding="medium" hover>
                  <h3 className="text-xl font-semibold mb-2 text-pink-400">Outlined Card</h3>
                  <p className="text-gray-300">
                    Clean border design with transparent background.
                  </p>
                </Card>
              </div>
            </div>

            {/* Animation Demo */}
            <div className="mt-12">
              <Card variant="default" padding="large">
                <h2 className="text-2xl font-bold mb-6 text-cyan-400">Animation Examples</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card 
                    variant="glass" 
                    padding="small" 
                    animationType="fade"
                    duration={600}
                    delay={0}
                  >
                    <p className="text-center">Fade In</p>
                  </Card>
                  
                  <Card 
                    variant="glass" 
                    padding="small" 
                    animationType="slide"
                    duration={600}
                    delay={200}
                  >
                    <p className="text-center">Slide Up</p>
                  </Card>
                  
                  <Card 
                    variant="glass" 
                    padding="small" 
                    animationType="scale"
                    duration={600}
                    delay={400}
                  >
                    <p className="text-center">Scale In</p>
                  </Card>
                  
                  <Card 
                    variant="glass" 
                    padding="small" 
                    animationType="bounce"
                    duration={600}
                    delay={600}
                  >
                    <p className="text-center">Bounce In</p>
                  </Card>
                </div>
              </Card>
            </div>

            {/* Status Message */}
            <Card variant="elevated" padding="medium" className="mt-12">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-green-400 font-semibold">
                  ✅ Core Components Successfully Loaded!
                </p>
              </div>
              <p className="text-gray-400 mt-2">
                All components are working with SOLID principles and TypeScript
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}