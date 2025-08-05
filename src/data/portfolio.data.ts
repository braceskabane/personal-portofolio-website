// ================================
// src/data/portfolio.data.ts (Enhanced with Personal Documents)
// ================================

export interface PersonalDocument {
    id: string;
    title: string;
    content: string;
    category: 'experience' | 'skills' | 'projects' | 'education' | 'achievements' | 'personal';
    language: 'en' | 'id' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'zh';
    lastUpdated: Date;
    tags: string[];
  }
  
  // Detailed personal information in multiple languages
  export const PERSONAL_DOCUMENTS: PersonalDocument[] = [
    {
      id: 'bio-en',
      title: 'Professional Biography',
      category: 'personal',
      language: 'en',
      lastUpdated: new Date('2024-12-01'),
      tags: ['biography', 'background', 'story'],
      content: `
  Muhammad Daffa' Fisabilillah adalah seorang Senior Full Stack Developer dengan passion yang mendalam untuk menciptakan solusi teknologi yang meaningful. 
    
      `
    }
  ];