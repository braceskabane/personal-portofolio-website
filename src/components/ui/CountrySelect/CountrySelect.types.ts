// ================================
// src/components/ui/CountrySelect/CountrySelect.types.ts
// ================================

export interface CountrySelectProps {
    value?: string;
    onChange: (countryCode: string) => void;
    placeholder?: string;
    className?: string;
    error?: string;
    disabled?: boolean;
  }