// ================================
// src/types/language.types.ts
// ================================

export type SupportedLanguage = 'en' | 'id' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'zh';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export interface MultilingualContent {
  [key: string]: {
    [K in SupportedLanguage]?: string;
  };
}
