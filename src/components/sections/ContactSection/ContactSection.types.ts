// ================================
// src/components/sections/ContactSection/ContactSection.types.ts
// ================================

import type { PersonalInfo, ContactForm } from '@/types';

export interface ContactSectionProps {
  personalInfo: PersonalInfo | null;
  onSubmitContact: (data: ContactForm) => Promise<boolean>;
  loading?: boolean;
}