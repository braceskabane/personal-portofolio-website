// ================================
// src/components/sections/ExperienceSection/ExperienceSection.types.ts
// ================================

import type { Experience } from '@/types';

export interface ExperienceSectionProps {
  experience: Experience[];
  loading?: boolean;
  error?: string | null;
}