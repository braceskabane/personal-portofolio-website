// ================================
// src/types/portfolio.types.ts
// ================================

// Base interface for all portfolio items
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
}

// Project interface
export interface Project extends PortfolioItem {
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  stats: ProjectStats;
  featured?: boolean;
  category?: ProjectCategory;
}

export interface ProjectStats {
  users?: string;
  performance?: string;
  uptime?: string;
  downloads?: string;
  rating?: string;
  speed?: string;
  accuracy?: string;
  dataPoints?: string;
  security?: string;
}

export type ProjectCategory = 
  | 'web-app' 
  | 'mobile-app' 
  | 'desktop-app' 
  | 'api' 
  | 'library' 
  | 'tool';

// Experience interface
export interface Experience extends PortfolioItem {
  company: string;
  position: string;
  duration: string;
  achievements: string[];
  technologies: string[];
  location?: string;
  type?: EmploymentType;
}

export type EmploymentType = 
  | 'full-time' 
  | 'part-time' 
  | 'contract' 
  | 'freelance' 
  | 'internship';

// Skill interface
export interface Skill {
  name: string;
  projectCount: number; // Number of projects using this skill
  category: SkillCategory;
  icon?: string;
  description?: string;
}

export type SkillCategory = 
  | 'Frontend' 
  | 'Backend' 
  | 'DevOps' 
  | 'Design' 
  | 'Language' 
  | 'Cloud' 
  | 'API' 
  | 'Database' 
  | 'Mobile' 
  | 'Testing';

// Contact form interface
export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  company?: string;
  country?: string; 
}

// Country interface for contact validation
export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  phonePattern: RegExp;
  phoneExample: string;
  maxLength: number;
}

// Personal information interface
export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  profileImage: string;
  email: string;
  phone?: string;
  location: string;
  website?: string;
  resume?: string;
  social: SocialLinks;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  behance?: string;
  dribbble?: string;
}

// Navigation interface
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
  icon?: string;
}
