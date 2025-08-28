// ================================
// src/services/portfolio/portfolioService.ts
// ================================

'use client';

import type { 
  Project, 
  Experience, 
  Skill, 
  PersonalInfo, 
  ContactForm 
} from '@/types';
import type { ApiClient } from '../api/httpClient';

export interface PortfolioRepository {
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project>;
  getExperience(): Promise<Experience[]>;
  getSkills(): Promise<Skill[]>;
  getPersonalInfo(): Promise<PersonalInfo>;
  submitContact(data: ContactForm): Promise<void>;
}

export class PortfolioService implements PortfolioRepository {
  constructor(private apiClient: ApiClient) {}

  async getProjects(): Promise<Project[]> {
    try {
      const response = await this.apiClient.get<{ data: Project[] }>('/api/projects');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw new Error('Unable to load projects. Please try again later.');
    }
  }

  async getProject(id: string): Promise<Project> {
    try {
      const response = await this.apiClient.get<{ data: Project }>(`/api/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch project ${id}:`, error);
      throw new Error('Unable to load project details. Please try again later.');
    }
  }

  async getExperience(): Promise<Experience[]> {
    try {
      const response = await this.apiClient.get<{ data: Experience[] }>('/api/experience');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch experience:', error);
      throw new Error('Unable to load work experience. Please try again later.');
    }
  }

  async getSkills(): Promise<Skill[]> {
    try {
      const response = await this.apiClient.get<{ data: Skill[] }>('/api/skills');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch skills:', error);
      throw new Error('Unable to load skills. Please try again later.');
    }
  }

  async getPersonalInfo(): Promise<PersonalInfo> {
    try {
      const response = await this.apiClient.get<{ data: PersonalInfo }>('/api/personal-info');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch personal info:', error);
      throw new Error('Unable to load personal information. Please try again later.');
    }
  }

  async submitContact(data: ContactForm): Promise<void> {
    try {
      await this.apiClient.post<{ success: boolean }>('/api/contact', data);
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      throw new Error('Unable to send message. Please try again later.');
    }
  }
}
