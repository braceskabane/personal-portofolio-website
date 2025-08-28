// ================================
// src/hooks/usePortfolio.ts
// ================================

'use client';

import { useState, useEffect } from 'react';

// Import types
import type { 
  Project, 
  Experience, 
  Skill, 
  PersonalInfo,
  ContactForm 
} from '@/types';

// Simple repository interface for this hook
interface PortfolioRepository {
  getProjects(): Promise<Project[]>;
  getExperience(): Promise<Experience[]>;
  getSkills(): Promise<Skill[]>;
  getPersonalInfo(): Promise<PersonalInfo>;
  submitContact(data: ContactForm): Promise<void>;
}

export interface UsePortfolioReturn {
  // Data
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
  personalInfo: PersonalInfo | null;
  
  // Loading states
  loading: {
    projects: boolean;
    experience: boolean;
    skills: boolean;
    personalInfo: boolean;
    contact: boolean;
  };
  
  // Error states
  error: {
    projects: string | null;
    experience: string | null;
    skills: string | null;
    personalInfo: string | null;
    contact: string | null;
  };
  
  // Actions
  loadProjects: () => Promise<void>;
  loadExperience: () => Promise<void>;
  loadSkills: () => Promise<void>;
  loadPersonalInfo: () => Promise<void>;
  submitContact: (data: ContactForm) => Promise<boolean>;
  refreshAll: () => Promise<void>;
}

export const usePortfolio = (repository: PortfolioRepository): UsePortfolioReturn => {
  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

  // Loading states
  const [loading, setLoading] = useState({
    projects: false,
    experience: false,
    skills: false,
    personalInfo: false,
    contact: false
  });

  // Error states
  const [error, setError] = useState({
    projects: null as string | null,
    experience: null as string | null,
    skills: null as string | null,
    personalInfo: null as string | null,
    contact: null as string | null
  });

  // Helper function to update loading state
  const updateLoading = (key: keyof typeof loading, value: boolean) => {
    setLoading(prev => ({ ...prev, [key]: value }));
  };

  // Helper function to update error state
  const updateError = (key: keyof typeof error, value: string | null) => {
    setError(prev => ({ ...prev, [key]: value }));
  };

  // Load projects
  const loadProjects = async () => {
    updateLoading('projects', true);
    updateError('projects', null);
    
    try {
      const data = await repository.getProjects();
      setProjects(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load projects';
      updateError('projects', errorMessage);
      console.error('Load projects error:', err);
    } finally {
      updateLoading('projects', false);
    }
  };

  // Load experience
  const loadExperience = async () => {
    updateLoading('experience', true);
    updateError('experience', null);
    
    try {
      const data = await repository.getExperience();
      setExperience(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load experience';
      updateError('experience', errorMessage);
      console.error('Load experience error:', err);
    } finally {
      updateLoading('experience', false);
    }
  };

  // Load skills
  const loadSkills = async () => {
    updateLoading('skills', true);
    updateError('skills', null);
    
    try {
      const data = await repository.getSkills();
      setSkills(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load skills';
      updateError('skills', errorMessage);
      console.error('Load skills error:', err);
    } finally {
      updateLoading('skills', false);
    }
  };

  // Load personal info
  const loadPersonalInfo = async () => {
    updateLoading('personalInfo', true);
    updateError('personalInfo', null);
    
    try {
      const data = await repository.getPersonalInfo();
      setPersonalInfo(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load personal info';
      updateError('personalInfo', errorMessage);
      console.error('Load personal info error:', err);
    } finally {
      updateLoading('personalInfo', false);
    }
  };

  // Submit contact form
  const submitContact = async (data: ContactForm): Promise<boolean> => {
    updateLoading('contact', true);
    updateError('contact', null);
    
    try {
      await repository.submitContact(data);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit contact form';
      updateError('contact', errorMessage);
      console.error('Submit contact error:', err);
      return false;
    } finally {
      updateLoading('contact', false);
    }
  };

  // Refresh all data
  const refreshAll = async () => {
    await Promise.allSettled([
      loadProjects(),
      loadExperience(),
      loadSkills(),
      loadPersonalInfo()
    ]);
  };

  return {
    // Data
    projects,
    experience,
    skills,
    personalInfo,
    
    // Loading states
    loading,
    
    // Error states
    error,
    
    // Actions
    loadProjects,
    loadExperience,
    loadSkills,
    loadPersonalInfo,
    submitContact,
    refreshAll
  };
};
