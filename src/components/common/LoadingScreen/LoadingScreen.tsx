// ================================
// src/components/common/LoadingScreen/LoadingScreen.tsx
// ================================

"use client";

import React, { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  const loadingSteps = [
    "Initializing...",
    "Loading portfolio data...",
    "Preparing animations...",
    "Setting up particle system...",
    "Finalizing experience...",
    "Welcome!",
  ];

  useEffect(() => {
    const duration = 2000; // 3 seconds
    const interval = 50; // Update every 50ms
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + increment, 100);

        // Update loading text based on progress
        const stepIndex = Math.floor(
          (newProgress / 100) * (loadingSteps.length - 1),
        );
        setLoadingText(loadingSteps[stepIndex]);

        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Small delay before calling onComplete
        }

        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Background Animation */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Loading Content */}
      <div className="text-center z-10">
        {/* Logo Animation */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            Hi !
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm mx-auto mb-6">
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>0%</span>
            <span className="text-cyan-400 font-semibold">
              {Math.round(progress)}%
            </span>
            <span>100%</span>
          </div>
        </div>

        {/* Loading Text */}
        {/* <p className="text-lg text-gray-300 animate-pulse">{loadingText}</p> */}

        {/* Loading Spinner */}
        {/* <div className="mt-6">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
        </div> */}
      </div>
    </div>
  );
};
