// ================================
// src/components/sections/HeroSection/HeroSection.types.ts
// ================================

import type { PersonalInfo } from '@/types';

export interface HeroSectionProps {
  personalInfo: PersonalInfo | null;
  loading?: boolean;
  onContactClick: () => void;
  onDownloadCV: () => void;
  onOpenChat?: () => void; // ← TAMBAHKAN HANYA INI
}