// ================================
// src/components/sections/AboutSection/AboutSection.types.ts
// ================================

import type { PersonalInfo } from '@/types';

export interface AboutSectionProps {
  personalInfo: PersonalInfo | null;
  loading?: boolean;
}