// ================================
// src/components/sections/HeroSection/HeroSection.tsx
// ================================

"use client";

import React from "react";
import { ChevronDown, Mail, Download, Github, Linkedin } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { useIntersectionObserver } from "@/hooks";
import type { HeroSectionProps } from "./HeroSection.types";
import {
  MinimalAICTA,
  ModernChipCTA,
  IconButtonCTA,
} from "@/components/common/MinimalAICTA/MinimalAICTA";

export const HeroSection: React.FC<HeroSectionProps> = ({
  personalInfo,
  loading = false,
  onContactClick,
  onDownloadCV,
  onOpenChat,
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    freezeOnceVisible: true,
  });

  if (loading) {
    return (
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading portfolio...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      style={{ minHeight: "calc(100vh - 0px)" }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="container mx-auto px-6 text-center z-10 relative"
      >
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div
            className={`mb-8 transition-all duration-1000 ${
              isIntersecting
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-1 mb-6 relative shadow-2xl">
              {personalInfo?.profileImage ? (
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name || "Profile"}
                  className="w-full h-full rounded-full object-cover object-center bg-gray-800"
                  onError={(e) => {
                    // Fallback untuk debugging
                    console.log(
                      "Image failed to load:",
                      personalInfo.profileImage,
                    );
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";
                  }}
                  onLoad={() => {
                    console.log(
                      "Image loaded successfully:",
                      personalInfo.profileImage,
                    );
                  }}
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-4xl text-gray-400">👤</span>
                </div>
              )}
              {/* Online Status */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center border-4 border-black">
                <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Name & Title - Ukuran Diperkecil */}
          <div
            className={`mb-8 transition-all duration-1000 delay-200 ${
              isIntersecting
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {personalInfo?.name || "Muhammad Daffa' Fisabilillah"}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-2 font-light">
              {personalInfo?.title || "Senior Full Stack Developer"}
              {personalInfo?.subtitle && (
                <span className="text-cyan-400 block md:inline md:ml-2">
                  {personalInfo.subtitle}
                </span>
              )}
            </p>

            {personalInfo?.location && (
              <p className="text-base text-gray-400 flex items-center justify-center gap-2 mt-2">
                <span>📍</span>
                {personalInfo.location}
              </p>
            )}
          </div>

          {/* Description */}
          {/* <div className={`mb-12 transition-all duration-1000 delay-400 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {personalInfo?.description || 
                'Passionate about creating scalable solutions that make a difference. Specialized in modern web technologies and user experience design.'
              }
            </p>
          </div> */}

          {/* Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-600 ${
              isIntersecting
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <Button
              variant="primary"
              size="large"
              icon={<Mail size={20} />}
              onClick={onContactClick}
              className="group"
            >
              <span className="group-hover:scale-110 transition-transform">
                Get In Touch
              </span>
            </Button>

            <Button
              variant="secondary"
              size="large"
              icon={<Download size={20} />}
              onClick={onDownloadCV}
              className="group"
            >
              <span className="group-hover:scale-110 transition-transform">
                Download CV
              </span>
            </Button>
          </div>

          {/* {onOpenChat && (
            <div className={`mb-16 transition-all duration-1000 delay-800 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <MinimalAICTA onOpenChat={onOpenChat} />
            </div>
          )} */}

          {/* Social Links */}
          {personalInfo?.social && (
            <div
              className={`flex justify-center gap-4 mb-16 transition-all duration-1000 delay-700 ${
                isIntersecting
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {personalInfo.social.github && (
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800/50 rounded-full hover:bg-cyan-500 transition-all duration-300 hover:scale-110 group"
                >
                  <Github
                    className="text-gray-400 group-hover:text-white"
                    size={20}
                  />
                </a>
              )}
              {personalInfo.social.linkedin && (
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800/50 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110 group"
                >
                  <Linkedin
                    className="text-gray-400 group-hover:text-white"
                    size={20}
                  />
                </a>
              )}
            </div>
          )}

          {/* Scroll Indicator */}
          <div
            className={`animate-bounce transition-all duration-1000 delay-900 ${
              isIntersecting
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <ChevronDown size={32} className="mx-auto text-cyan-400" />
            <p className="text-sm text-gray-500 mt-2">Scroll to explore</p>
          </div>
        </div>
      </div>
    </section>
  );
};
