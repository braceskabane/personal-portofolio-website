// ================================
// src/services/ai/documentService.ts
// ================================

'use client';

import { PersonalDocument, PERSONAL_DOCUMENTS } from '@/data/portfolio.data';
import { SupportedLanguage } from '@/types/language.types';

export class DocumentService {
  private documents: PersonalDocument[] = PERSONAL_DOCUMENTS;
  private debug: boolean = true;

  constructor() {
    if (this.debug) {
      console.log('📚 DocumentService initialized with', this.documents.length, 'documents');
      const stats = this.getDocumentStats();
      console.log('📚 Document stats:', stats);
    }
  }

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

    if (this.debug) {
      console.log('🔍 Extracted keywords:', keywords);
    }

    // Search for each keyword with exact language match
    keywords.forEach(keyword => {
      const docs = this.searchDocuments(keyword, language);
      relevantDocs = [...relevantDocs, ...docs];
    });

    if (this.debug) {
      console.log('📄 Found docs with language match:', relevantDocs.length);
    }

    // If not enough docs found, also search across all languages for matching content
    if (relevantDocs.length < 3) {
      keywords.forEach(keyword => {
        const docs = this.searchDocuments(keyword); // No language filter
        relevantDocs = [...relevantDocs, ...docs];
      });
      if (this.debug) {
        console.log('📄 After cross-language search:', relevantDocs.length);
      }
    }

    // Remove duplicates by id
    const seenIds = new Set<string>();
    const uniqueDocs = relevantDocs.filter(doc => {
      if (seenIds.has(doc.id)) return false;
      seenIds.add(doc.id);
      return true;
    });

    // Always include the main biography for this language if available
    const bioDoc = this.documents.find(doc => 
      doc.id.startsWith('bio-') && doc.language === language
    );
    if (bioDoc && !seenIds.has(bioDoc.id)) {
      uniqueDocs.unshift(bioDoc); // Add at beginning
    }

    // Sort by relevance: featured first, then by priority
    uniqueDocs.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.priority || 0) - (a.priority || 0);
    });
    
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

    if (this.debug) {
      console.log('📄 Final context length:', context.length, 'chars');
      console.log('📄 Documents included:', uniqueDocs.length);
    }

    return context;
  }

  // Extract keywords from user message
  private extractKeywords(message: string): string[] {
    const commonWords = [
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
      'will', 'would', 'could', 'should', 'may', 'might', 'can', 'shall',
      'what', 'how', 'when', 'where', 'who', 'which', 'why',
      'this', 'that', 'these', 'those', 'it', 'its',
      'you', 'your', 'yours', 'i', 'me', 'my', 'we', 'our', 'they', 'them', 'their',
      'about', 'tell', 'know', 'more', 'some', 'any', 'all', 'each', 'every',
      'from', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
      'not', 'no', 'nor', 'so', 'too', 'very', 'just', 'also', 'than', 'then',
      'bagaimana', 'mengapa', 'kapan', 'dimana', 'siapa', 'apa', 'bisa', 'tidak',
      'saya', 'anda', 'adalah', 'dengan', 'untuk', 'dari', 'yang', 'atau', 'dan', 'ini', 'itu',
      'como', 'que', 'cuando', 'donde', 'quien', 'cual', 'cuanto',
      'comment', 'quoi', 'quand', 'ou', 'qui', 'quel', 'combien',
      'wie', 'was', 'wann', 'wo', 'wer', 'welch', 'wieviel'
    ];
    
    const words = message
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(' ')
      .filter(word => word.length > 2 && !commonWords.includes(word));
    
    // Prioritize longer, more specific words
    const uniqueWords = Array.from(new Set(words));
    uniqueWords.sort((a, b) => b.length - a.length);
    
    return uniqueWords.slice(0, 8); // Get up to 8 keywords for better matching
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