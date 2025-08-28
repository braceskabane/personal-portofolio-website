// ================================
// src/components/common/ProjectDetailModal/ProjectDetailModal.tsx
// ================================

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Calendar, Code, Target, Award, User, Download, 
  Github, ExternalLink, FileText, ChevronLeft, ChevronRight,
  Maximize2, Image as ImageIcon
} from 'lucide-react';
import { Button, Card } from '@/components/ui';
import type { ProjectDetailModalProps } from './ProjectDetailModal.types';

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  isOpen,
  onClose,
  data,
  loading = false
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  
  // Close modal with ESC key and handle gallery navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isGalleryOpen) {
          setIsGalleryOpen(false);
        } else {
          onClose();
        }
      } else if (isGalleryOpen && data?.gallery && data.gallery.length > 1) {
        if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        }
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isGalleryOpen, onClose, data?.gallery]);

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % data.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + data.gallery.length) % data.gallery.length);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && data?.gallery.length > 1) {
      nextImage();
    }
    if (isRightSwipe && data?.gallery.length > 1) {
      prevImage();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-start justify-center p-2 md:p-6 pt-20 md:pt-24 pb-6 md:pb-12 overflow-y-auto animate-in fade-in duration-300">
        <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-6xl h-[calc(100vh-104px)] md:h-[calc(100vh-144px)] max-h-[calc(100vh-104px)] md:max-h-[calc(100vh-144px)] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800 flex-shrink-0">
            <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                data.category === 'project' ? 'bg-cyan-400' : 'bg-purple-400'
              }`} />
              <div className="min-w-0 flex-1">
                <h2 className="text-lg md:text-2xl font-bold text-white truncate">{data.title}</h2>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar size={14} className="flex-shrink-0" />
                  <span>{data.year}</span>
                  <span className="px-2 py-1 bg-gray-700 rounded text-xs capitalize">
                    {data.category}
                  </span>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="small"
              icon={<X size={20} />}
              onClick={onClose}
              className="hover:bg-gray-700"
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6 lg:p-8 pb-6 md:pb-8 lg:pb-12 space-y-4 md:space-y-6 min-h-full">{/* Menggunakan min-h-full untuk stretch penuh */}
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                {data.githubUrl && (
                  <Button
                    variant="ghost"
                    size="small"
                    icon={<Github size={16} />}
                    onClick={() => window.open(data.githubUrl, '_blank')}
                  >
                    Source Code
                  </Button>
                )}
                {data.demoUrl && (
                  <Button
                    variant="primary"
                    size="small"
                    icon={<ExternalLink size={16} />}
                    onClick={() => window.open(data.demoUrl, '_blank')}
                  >
                    Live Demo
                  </Button>
                )}
                {data.documentationUrl && (
                  <Button
                    variant="ghost"
                    size="small"
                    icon={<FileText size={16} />}
                    onClick={() => window.open(data.documentationUrl, '_blank')}
                  >
                    Documentation
                  </Button>
                )}
              </div>

              {/* Problem & Solution */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card variant="elevated" padding="large">
                  <h3 className="text-xl font-bold mb-4 text-red-400 flex items-center gap-2">
                    <Target size={20} />
                    Problem/Challenge
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{data.problem}</p>
                </Card>

                <Card variant="elevated" padding="large">
                  <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center gap-2">
                    <Code size={20} />
                    Solution
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{data.solution}</p>
                </Card>
              </div>

              {/* Role & Impact */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card variant="elevated" padding="large">
                  <h3 className="text-xl font-bold mb-4 text-purple-400 flex items-center gap-2">
                    <User size={20} />
                    My Role
                  </h3>
                  <p className="text-gray-300 mb-4">{data.role}</p>
                  
                  <h4 className="font-semibold text-white mb-3">Key Contributions:</h4>
                  <ul className="space-y-2">
                    {data.contributions.map((contribution, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-purple-400 mt-1">•</span>
                        {contribution}
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card variant="elevated" padding="large">
                  <h3 className="text-xl font-bold mb-4 text-yellow-400 flex items-center gap-2">
                    <Award size={20} />
                    Impact & Results
                  </h3>
                  <ul className="space-y-3">
                    {data.impact.map((impact, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-yellow-400 mt-1">✓</span>
                        {impact}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Tech Stack */}
              <Card variant="elevated" padding="large">
                <h3 className="text-xl font-bold mb-6 text-cyan-400 flex items-center gap-2">
                  <Code size={20} />
                  Technology Stack
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.techStack.frontend && (
                    <div>
                      <h4 className="font-semibold text-white mb-3">Frontend</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.techStack.frontend.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.techStack.backend && (
                    <div>
                      <h4 className="font-semibold text-white mb-3">Backend</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.techStack.backend.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-green-400/10 text-green-400 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.techStack.mobile && (
                    <div>
                      <h4 className="font-semibold text-white mb-3">Mobile Development</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.techStack.mobile.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.techStack.architecture && (
                    <div>
                      <h4 className="font-semibold text-white mb-3">Architecture & Patterns</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.techStack.architecture.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-indigo-400/10 text-indigo-400 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.techStack.networking && (
                    <div>
                      <h4 className="font-semibold text-white mb-3">API & Networking</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.techStack.networking.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-teal-400/10 text-teal-400 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.techStack.data && (
                    <div>
                      <h4 className="font-semibold text-white mb-3">Data & Storage</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.techStack.data.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-purple-400/10 text-purple-400 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.techStack.database && (
                    <div>
                      <h4 className="font-semibold text-white mb-3">Database</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.techStack.database.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-purple-400/10 text-purple-400 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.techStack.concepts && (
                    <div>
                      <h4 className="font-semibold text-white mb-3">Concepts & Methodologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.techStack.concepts.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-pink-400/10 text-pink-400 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.techStack.tools && (
                    <div>
                      <h4 className="font-semibold text-white mb-3">Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.techStack.tools.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.techStack.deployment && (
                    <div>
                      <h4 className="font-semibold text-white mb-3">Deployment</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.techStack.deployment.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-orange-400/10 text-orange-400 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Gallery */}
              {data.gallery.length > 0 && (
                <Card variant="elevated" padding="large">
                  <h3 className="text-xl font-bold mb-6 text-pink-400 flex items-center gap-2">
                    <ImageIcon size={20} />
                    Project Gallery
                  </h3>
                  
                  {/* Main Image/Video */}
                  <div className="relative mb-4 md:mb-6">
                    <div 
                      className="relative"
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      {data.gallery[currentImageIndex].type === 'video' ? (
                        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                          <iframe
                            src={data.gallery[currentImageIndex].videoUrl}
                            title={data.gallery[currentImageIndex].caption}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <img
                          src={data.gallery[currentImageIndex].url}
                          alt={data.gallery[currentImageIndex].caption}
                          className="w-full h-64 md:h-96 object-cover rounded-lg cursor-pointer"
                          onClick={() => setIsGalleryOpen(true)}
                        />
                      )}
                      
                      {/* Mobile Swipe Indicator */}
                      {data.gallery.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-xs sm:hidden">
                          Geser untuk navigasi
                        </div>
                      )}
                    </div>
                    
                    {/* Navigation - Desktop Only */}
                    {data.gallery.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors items-center justify-center"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors items-center justify-center"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                    
                    {/* Expand Button */}
                    <button
                      onClick={() => setIsGalleryOpen(true)}
                      className="absolute top-3 md:top-4 right-3 md:right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <Maximize2 size={14} className="md:w-4 md:h-4" />
                    </button>
                  </div>
                  
                  {/* Caption */}
                  <p className="text-gray-400 text-sm mb-4">
                    {data.gallery[currentImageIndex].caption}
                  </p>
                  
                  {/* Thumbnails */}
                  {data.gallery.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {data.gallery.map((image, index) => (
                        <button
                          key={image.id}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-colors relative ${
                            index === currentImageIndex
                              ? 'border-cyan-400'
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                        >
                          {image.type === 'video' ? (
                            <div className="w-full h-full bg-red-600 flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8 5v10l8-5-8-5z"/>
                              </svg>
                            </div>
                          ) : (
                            <img
                              src={image.url}
                              alt={image.caption}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Mobile Navigation Dots */}
                  {data.gallery.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4 sm:hidden">
                      {data.gallery.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === currentImageIndex
                              ? 'bg-cyan-400'
                              : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </Card>
              )}

              {/* Downloads */}
              {data.reports && data.reports.length > 0 && (
                <Card variant="elevated" padding="large" className="mb-4">
                  <h3 className="text-xl font-bold mb-6 text-blue-400 flex items-center gap-2">
                    <Download size={20} />
                    Project Documents
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {data.reports.map((report, index) => (
                      <Card key={index} variant="glass" padding="medium" hover className="min-h-[80px]">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="w-10 h-10 bg-blue-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText size={20} className="text-blue-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-white text-sm md:text-base leading-tight mb-1 break-words">{report.title}</h4>
                              <p className="text-xs md:text-sm text-gray-400">{report.type.toUpperCase()} • {report.size}</p>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="small"
                            icon={<Download size={16} />}
                            onClick={() => window.open(report.url, '_blank')}
                            className="flex-shrink-0"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              )}

              {/* Course Certificates */}
              {data.courseCertificates && data.courseCertificates.length > 0 && (
                <Card variant="elevated" padding="large" className="mb-4">
                  <h3 className="text-xl font-bold mb-6 text-green-400 flex items-center gap-2">
                    <Award size={20} />
                    Course Certificates
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                    {data.courseCertificates.map((certificate, index) => (
                      <Card key={index} variant="glass" padding="medium" hover className="min-h-[80px]">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="w-10 h-10 bg-green-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Award size={20} className="text-green-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-white text-sm leading-tight mb-1 break-words">{certificate.title}</h4>
                              <p className="text-xs text-gray-400">{certificate.type.toUpperCase()} • {certificate.size}</p>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="small"
                            icon={<Download size={14} />}
                            onClick={() => window.open(certificate.url, '_blank')}
                            className="flex-shrink-0"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Lightbox */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black/95 z-[110] flex items-center justify-center">
          
          {/* Mobile-Optimized Top Control Bar */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-[111]">
            <div className="flex items-center justify-between">
              {/* Back to Detail Button - Mobile Optimized */}
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="bg-black/70 backdrop-blur-sm text-white px-3 py-2 sm:px-4 sm:py-3 hover:bg-black/90 rounded-lg transition-all duration-200 border border-gray-600 flex items-center gap-2 text-sm sm:text-base"
              >
                <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                <span className="font-medium">Kembali</span>
              </button>

              {/* Image Counter - Mobile Optimized */}
              <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-gray-600">
                <span className="text-sm font-medium">
                  {currentImageIndex + 1} / {data.gallery.length}
                </span>
              </div>

              {/* Close Modal Button - Mobile Optimized */}
              <button
                onClick={onClose}
                className="bg-red-600/80 backdrop-blur-sm text-white p-2 sm:p-3 hover:bg-red-600 rounded-lg transition-all duration-200 border border-red-500 flex items-center gap-1 sm:gap-2"
                title="Tutup Modal"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline text-sm font-medium">Tutup</span>
              </button>
            </div>
          </div>
          
          {/* Main Image/Video with Touch Gestures */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-4 pt-20 pb-20"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {data.gallery[currentImageIndex].type === 'video' ? (
              <div className="w-full max-w-4xl aspect-video">
                <iframe
                  src={data.gallery[currentImageIndex].videoUrl}
                  title={data.gallery[currentImageIndex].caption}
                  className="w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={data.gallery[currentImageIndex].url}
                alt={data.gallery[currentImageIndex].caption}
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
          
          {/* Mobile-Optimized Caption at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-[111]">
            <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-gray-600 text-center">
              <p className="text-sm font-medium">{data.gallery[currentImageIndex].caption}</p>
              
              {/* Mobile Swipe Hint */}
              {data.gallery.length > 1 && (
                <p className="text-xs text-gray-400 mt-2 sm:hidden">
                  Geser kiri/kanan untuk navigasi gambar
                </p>
              )}
            </div>
          </div>
          
          {/* Desktop Navigation Arrows - Hidden on Mobile */}
          {data.gallery.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-sm text-white p-4 hover:bg-black/90 rounded-full transition-all duration-200 border border-gray-600 items-center justify-center"
                title="Gambar Sebelumnya"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-sm text-white p-4 hover:bg-black/90 rounded-full transition-all duration-200 border border-gray-600 items-center justify-center"
                title="Gambar Selanjutnya"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Mobile Navigation Dots */}
          {data.gallery.length > 1 && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 sm:hidden">
              {data.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex
                      ? 'bg-white'
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Keyboard Shortcuts Info - Desktop Only */}
          <div className="hidden sm:block absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-gray-600">
            <p className="text-xs text-gray-300">
              ESC: Kembali • ← →: Navigasi
            </p>
          </div>
        </div>
      )}
    </>
  );
};
