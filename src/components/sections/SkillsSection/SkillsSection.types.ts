// ================================
// src/components/sections/SkillsSection/SkillsSection.types.ts
// ================================

import type { Skill } from '@/types';

export interface SkillsSectionProps {
  skills: Skill[];
  loading?: boolean;
  error?: string | null;
}

export interface SkillCardProps {
  skill: Skill;
  index: number;
}