// ================================
// src/types/document.types.ts
// ================================

export interface DocumentData {
    id: string;
    name: string;
    type: 'pdf' | 'docx' | 'txt';
    size: number;
    uploadDate: Date;
    content: string;
    chunks: DocumentChunk[];
    metadata?: DocumentMetadata;
  }
  
  export interface DocumentChunk {
    id: string;
    content: string;
    pageNumber?: number;
    startIndex: number;
    endIndex: number;
    keywords: string[];
  }
  
  export interface DocumentMetadata {
    title?: string;
    author?: string;
    subject?: string;
    creator?: string;
    producer?: string;
    creationDate?: Date;
    modificationDate?: Date;
    pageCount?: number;
  }
  
  export interface DocumentProcessingResult {
    success: boolean;
    document?: DocumentData;
    error?: string;
    processingTime: number;
  }
  
  export interface DocumentSearchResult {
    chunk: DocumentChunk;
    relevanceScore: number;
    documentName: string;
  }