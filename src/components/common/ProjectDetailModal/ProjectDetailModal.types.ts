// ================================
// src/components/common/ProjectDetailModal/ProjectDetailModal.types.ts
// ================================

export interface ProjectDetailData {
  // Basic Info
  id: string;
  title: string;
  year: string;
  category: 'project' | 'experience';
  
  // Core Content
  problem: string;
  solution: string;
  impact: string[];
  role: string;
  contributions: string[];
  
  // Technical
  techStack: {
    frontend?: string[];
    mobile?: string[];
    architecture?: string[];
    networking?: string[];
    data?: string[];
    backend?: string[];
    database?: string[];
    tools?: string[];
    deployment?: string[];
    concepts?: string[];
    ai?: string[];
    integrations?: string[];
  };
  
  // Media
  gallery: {
    id: string;
    url?: string;
    videoUrl?: string;
    caption: string;
    type: 'screenshot' | 'diagram' | 'demo' | 'video';
  }[];
  
  // Downloads
  reports?: {
    title: string;
    url: string;
    type: 'pdf' | 'doc';
    size: string;
  }[];
  
  // Course Certificates (for educational experiences)
  courseCertificates?: {
    title: string;
    url: string;
    type: 'pdf' | 'doc';
    size: string;
  }[];
  
  // Links
  githubUrl?: string;
  githubUrlFrontend?: string;
  demoUrl?: string;
  documentationUrl?: string;
}

export interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ProjectDetailData | null;
  loading?: boolean;
}
