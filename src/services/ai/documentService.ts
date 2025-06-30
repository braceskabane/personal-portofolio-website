// ================================
// src/services/ai/documentService.ts
// ================================

'use client';

import { PersonalDocument, PERSONAL_DOCUMENTS } from '@/data/portfolio.data';
import { SupportedLanguage } from '@/types/language.types';

export class DocumentService {
  private documents: PersonalDocument[] = PERSONAL_DOCUMENTS;

  // Search documents by keywords
  searchDocuments(
    query: string, 
    language: SupportedLanguage = 'en',
    categories?: string[]
  ): PersonalDocument[] {
    const queryLower = query.toLowerCase();
    
    return this.documents.filter(doc => {
      // Language match
      if (doc.language !== language) return false;
      
      // Category filter
      if (categories && !categories.includes(doc.category)) return false;
      
      // Content search
      const contentMatch = doc.content.toLowerCase().includes(queryLower) ||
                          doc.title.toLowerCase().includes(queryLower) ||
                          doc.tags.some(tag => tag.toLowerCase().includes(queryLower));
      
      return contentMatch;
    });
  }

  // Get documents by category
  getDocumentsByCategory(
    category: string,
    language: SupportedLanguage = 'en'
  ): PersonalDocument[] {
    return this.documents.filter(doc => 
      doc.category === category && doc.language === language
    );
  }

  // Get relevant context for AI prompts
  getRelevantContext(
    userMessage: string,
    language: SupportedLanguage = 'en',
    maxLength: number = 2000
  ): string {
    const keywords = this.extractKeywords(userMessage);
    let relevantDocs: PersonalDocument[] = [];

    // Search for each keyword
    keywords.forEach(keyword => {
      const docs = this.searchDocuments(keyword, language);
      relevantDocs = [...relevantDocs, ...docs];
    });

    // Remove duplicates and prioritize by relevance
    const uniqueDocs = Array.from(new Set(relevantDocs));
    
    // Build context string
    let context = '';
    let currentLength = 0;

    for (const doc of uniqueDocs) {
      const docContent = `[${doc.title}]\n${doc.content}\n\n`;
      
      if (currentLength + docContent.length <= maxLength) {
        context += docContent;
        currentLength += docContent.length;
      } else {
        // Add partial content if space allows
        const remainingSpace = maxLength - currentLength;
        if (remainingSpace > 100) {
          context += `[${doc.title}]\n${doc.content.substring(0, remainingSpace - 50)}...\n\n`;
        }
        break;
      }
    }

    return context;
  }

  // Extract keywords from user message
  private extractKeywords(message: string): string[] {
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    
    return message
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(' ')
      .filter(word => word.length > 2 && !commonWords.includes(word))
      .slice(0, 5); // Limit to 5 keywords
  }

  // Add new document (for future PDF upload feature)
  addDocument(document: Omit<PersonalDocument, 'id' | 'lastUpdated'>): void {
    const newDoc: PersonalDocument = {
      ...document,
      id: `doc-${Date.now()}`,
      lastUpdated: new Date()
    };
    
    this.documents.push(newDoc);
  }

  // Get all documents for a language
  getAllDocuments(language: SupportedLanguage = 'en'): PersonalDocument[] {
    return this.documents.filter(doc => doc.language === language);
  }

  // Get document statistics
  getDocumentStats(): {
    totalDocs: number;
    byLanguage: Record<string, number>;
    byCategory: Record<string, number>;
  } {
    const stats = {
      totalDocs: this.documents.length,
      byLanguage: {} as Record<string, number>,
      byCategory: {} as Record<string, number>
    };

    this.documents.forEach(doc => {
      stats.byLanguage[doc.language] = (stats.byLanguage[doc.language] || 0) + 1;
      stats.byCategory[doc.category] = (stats.byCategory[doc.category] || 0) + 1;
    });

    return stats;
  }
}