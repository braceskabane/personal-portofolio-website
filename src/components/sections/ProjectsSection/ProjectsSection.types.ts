// ================================
// src/components/sections/ProjectsSection/ProjectsSection.types.ts
// ================================

import type { Project } from '@/types';

export interface ProjectsSectionProps {
  projects: Project[];
  loading?: boolean;
  error?: string | null;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
}