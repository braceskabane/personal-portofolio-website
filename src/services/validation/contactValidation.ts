// ================================
// src/services/validation/contactValidation.ts - Complete with Missing Methods
// ================================

'use client';

import type { ContactForm, Country } from '@/types';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any, country?: Country) => boolean | string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export class ContactValidationService {
  // 🌍 Database negara dengan validasi phone masing-masing
  private countries: Country[] = [
    {
      code: 'ID',
      name: 'Indonesia',
      flag: '🇮🇩',
      dialCode: '+62',
      phonePattern: /^(\+62|62|0)8[1-9][0-9]{7,11}$/,
      phoneExample: '+62 812-3456-7890',
      maxLength: 15
    },
    {
      code: 'US',
      name: 'United States',
      flag: '🇺🇸',
      dialCode: '+1',
      phonePattern: /^(\+1|1)?[2-9][0-8][0-9][2-9][0-9]{6}$/,
      phoneExample: '+1 (555) 123-4567',
      maxLength: 14
    },
    {
      code: 'SG',
      name: 'Singapore',
      flag: '🇸🇬',
      dialCode: '+65',
      phonePattern: /^(\+65|65)?[689][0-9]{7}$/,
      phoneExample: '+65 9123-4567',
      maxLength: 12
    },
    {
      code: 'MY',
      name: 'Malaysia',
      flag: '🇲🇾',
      dialCode: '+60',
      phonePattern: /^(\+60|60|0)1[0-9]{8,9}$/,
      phoneExample: '+60 12-345-6789',
      maxLength: 13
    },
    {
      code: 'GB',
      name: 'United Kingdom',
      flag: '🇬🇧',
      dialCode: '+44',
      phonePattern: /^(\+44|44|0)7[0-9]{9}$/,
      phoneExample: '+44 7700 900123',
      maxLength: 13
    },
    {
      code: 'AU',
      name: 'Australia',
      flag: '🇦🇺',
      dialCode: '+61',
      phonePattern: /^(\+61|61|0)4[0-9]{8}$/,
      phoneExample: '+61 412 345 678',
      maxLength: 12
    },
    {
      code: 'JP',
      name: 'Japan',
      flag: '🇯🇵',
      dialCode: '+81',
      phonePattern: /^(\+81|81|0)[789]0[0-9]{8}$/,
      phoneExample: '+81 90-1234-5678',
      maxLength: 13
    },
    {
      code: 'KR',
      name: 'South Korea',
      flag: '🇰🇷',
      dialCode: '+82',
      phonePattern: /^(\+82|82|0)10[0-9]{8}$/,
      phoneExample: '+82 10-1234-5678',
      maxLength: 13
    },
    {
      code: 'IN',
      name: 'India',
      flag: '🇮🇳',
      dialCode: '+91',
      phonePattern: /^(\+91|91|0)?[6789][0-9]{9}$/,
      phoneExample: '+91 98765-43210',
      maxLength: 13
    },
    {
      code: 'PH',
      name: 'Philippines',
      flag: '🇵🇭',
      dialCode: '+63',
      phonePattern: /^(\+63|63|0)9[0-9]{9}$/,
      phoneExample: '+63 917-123-4567',
      maxLength: 13
    }
  ];

  private rules: Record<keyof ContactForm, ValidationRule[]> = {
    name: [
      { required: true },
      { minLength: 2 },
      { maxLength: 50 },
      { 
        pattern: /^[a-zA-Z\s\u00C0-\u017F\u0100-\u017F]+$/, // Support international characters
        custom: (value: string) => {
          if (!/^[a-zA-Z\s\u00C0-\u017F\u0100-\u017F]+$/.test(value)) {
            return 'Name can only contain letters and spaces';
          }
          return true;
        }
      }
    ],
    email: [
      { required: true },
      { 
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        custom: (value: string) => {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Please provide a valid email address';
          }
          return true;
        }
      }
    ],
    subject: [
      { maxLength: 100 }
    ],
    message: [
      { required: true },
      { minLength: 10 },
      { maxLength: 1000 }
    ],
    phone: [
      { 
        custom: (value: string, country?: Country) => {
          if (!value || value.trim() === '') {
            return true; // Phone is optional
          }

          if (!country) {
            return 'Please select a country first';
          }

          // Remove all non-digit characters except +
          const cleanPhone = value.replace(/[^\d+]/g, '');
          
          if (!country.phonePattern.test(cleanPhone)) {
            return `Please provide a valid ${country.name} phone number (e.g., ${country.phoneExample})`;
          }

          if (cleanPhone.length > country.maxLength) {
            return `Phone number is too long for ${country.name}`;
          }

          return true;
        }
      }
    ],
    company: [
      { maxLength: 100 }
    ],
    country: [
      // Country field validation - optional field
      {
        custom: (value: string) => {
          if (!value) return true; // Country is optional
          
          const validCountryCodes = ['ID', 'US', 'SG', 'MY', 'GB', 'AU', 'JP', 'KR', 'IN', 'PH'];
          if (!validCountryCodes.includes(value)) {
            return 'Please select a valid country';
          }
          return true;
        }
      }
    ]
  };

  // 🌍 Get all available countries
  getCountries(): Country[] {
    return this.countries;
  }

  // 🔍 Get country by code
  getCountryByCode(code: string): Country | undefined {
    return this.countries.find(country => country.code === code);
  }

  // 🔍 Get country by dial code
  getCountryByDialCode(dialCode: string): Country | undefined {
    return this.countries.find(country => country.dialCode === dialCode);
  }

  // 🛠️ MISSING METHOD 1: Detect country from phone number
  detectCountryFromPhone(phone: string): Country | null {
    if (!phone || phone.trim() === '') {
      return null;
    }

    // Clean phone number - remove all non-digit characters except +
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // Try to match with country patterns based on dial code first
    for (const country of this.countries) {
      if (cleanPhone.startsWith(country.dialCode)) {
        // Check if the phone number matches the country's pattern
        if (country.phonePattern.test(cleanPhone)) {
          return country;
        }
      }
    }

    // If no dial code match, try pattern matching without dial code
    for (const country of this.countries) {
      // Remove dial code and test pattern for local format
      let localPhone = cleanPhone;
      
      // Handle common local formats
      if (localPhone.startsWith('0')) {
        // Remove leading 0 and add dial code
        localPhone = country.dialCode + localPhone.substring(1);
      } else if (!localPhone.startsWith('+')) {
        // Add dial code if no + prefix
        localPhone = country.dialCode + localPhone;
      }
      
      if (country.phonePattern.test(localPhone)) {
        return country;
      }
    }

    return null;
  }

  // 🛠️ MISSING METHOD 2: Validate phone number specifically
  validatePhoneNumber(phone: string, countryCode: string): {
    isValid: boolean;
    error?: string;
    formatted?: string;
  } {
    if (!phone || phone.trim() === '') {
      return { isValid: true }; // Phone is optional
    }

    const country = this.getCountryByCode(countryCode);
    if (!country) {
      return { 
        isValid: false, 
        error: 'Please select a valid country' 
      };
    }

    // Remove all non-digit characters except +
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // Check if phone matches country pattern
    if (!country.phonePattern.test(cleanPhone)) {
      return { 
        isValid: false, 
        error: `Please provide a valid ${country.name} phone number (e.g., ${country.phoneExample})` 
      };
    }

    // Check length
    if (cleanPhone.length > country.maxLength) {
      return { 
        isValid: false, 
        error: `Phone number is too long for ${country.name}` 
      };
    }

    // Format the phone number
    const formatted = this.formatPhoneNumber(phone, countryCode);

    return { 
      isValid: true, 
      formatted 
    };
  }

  // 📱 Format phone number according to country
  formatPhoneNumber(phone: string, countryCode: string): string {
    const country = this.getCountryByCode(countryCode);
    if (!country || !phone) return phone;

    // Remove all non-digit characters except +
    let cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // Add country dial code if not present
    if (!cleanPhone.startsWith(country.dialCode)) {
      // Remove leading 0 if present
      if (cleanPhone.startsWith('0')) {
        cleanPhone = cleanPhone.substring(1);
      }
      cleanPhone = country.dialCode + cleanPhone;
    }

    // Apply country-specific formatting
    switch (countryCode) {
      case 'ID':
        // Format: +62 812-3456-7890
        return cleanPhone.replace(/(\+62)(\d{3})(\d{4})(\d+)/, '$1 $2-$3-$4');
      case 'US':
        // Format: +1 (555) 123-4567
        return cleanPhone.replace(/(\+1)(\d{3})(\d{3})(\d{4})/, '$1 ($2) $3-$4');
      case 'SG':
        // Format: +65 9123-4567
        return cleanPhone.replace(/(\+65)(\d{4})(\d{4})/, '$1 $2-$3');
      case 'MY':
        // Format: +60 12-345-6789
        return cleanPhone.replace(/(\+60)(\d{2})(\d{3})(\d{4})/, '$1 $2-$3-$4');
      case 'GB':
        // Format: +44 7700 900123
        return cleanPhone.replace(/(\+44)(\d{4})(\d{6})/, '$1 $2 $3');
      case 'AU':
        // Format: +61 412 345 678
        return cleanPhone.replace(/(\+61)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
      case 'JP':
        // Format: +81 90-1234-5678
        return cleanPhone.replace(/(\+81)(\d{2})(\d{4})(\d{4})/, '$1 $2-$3-$4');
      case 'KR':
        // Format: +82 10-1234-5678
        return cleanPhone.replace(/(\+82)(\d{2})(\d{4})(\d{4})/, '$1 $2-$3-$4');
      case 'IN':
        // Format: +91 98765-43210
        return cleanPhone.replace(/(\+91)(\d{5})(\d{5})/, '$1 $2-$3');
      case 'PH':
        // Format: +63 917-123-4567
        return cleanPhone.replace(/(\+63)(\d{3})(\d{3})(\d{4})/, '$1 $2-$3-$4');
      default:
        // Default formatting with spaces
        return cleanPhone.replace(/(\+\d{1,3})(\d{1,4})(\d+)/, '$1 $2-$3');
    }
  }

  // ✅ Enhanced validation with country support
  validate(data: ContactForm): ValidationResult {
    const errors: Record<string, string> = {};
    const country = data.country ? this.getCountryByCode(data.country) : undefined;

    Object.entries(this.rules).forEach(([field, rules]) => {
      const value = data[field as keyof ContactForm];
      
      rules.forEach(rule => {
        // Required validation
        if (rule.required && (!value || value.toString().trim() === '')) {
          errors[field] = `${this.capitalize(field)} is required`;
          return;
        }

        // Skip other validations if field is empty and not required
        if (!value || value.toString().trim() === '') {
          return;
        }

        const stringValue = value.toString();

        // MinLength validation
        if (rule.minLength && stringValue.length < rule.minLength) {
          errors[field] = `${this.capitalize(field)} must be at least ${rule.minLength} characters`;
          return;
        }

        // MaxLength validation
        if (rule.maxLength && stringValue.length > rule.maxLength) {
          errors[field] = `${this.capitalize(field)} must not exceed ${rule.maxLength} characters`;
          return;
        }

        // Pattern validation
        if (rule.pattern && !rule.pattern.test(stringValue)) {
          errors[field] = `${this.capitalize(field)} format is invalid`;
          return;
        }

        // Custom validation with country context
        if (rule.custom) {
          const result = rule.custom(stringValue, country);
          if (result !== true) {
            errors[field] = typeof result === 'string' ? result : `${this.capitalize(field)} is invalid`;
            return;
          }
        }
      });
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // ✅ Enhanced field validation with country support
  validateField(field: keyof ContactForm, value: any, countryCode?: string): string | null {
    const rules = this.rules[field];
    if (!rules) return null;

    const country = countryCode ? this.getCountryByCode(countryCode) : undefined;

    for (const rule of rules) {
      // Required validation
      if (rule.required && (!value || value.toString().trim() === '')) {
        return `${this.capitalize(field)} is required`;
      }

      // Skip other validations if field is empty and not required
      if (!value || value.toString().trim() === '') {
        continue;
      }

      const stringValue = value.toString();

      // MinLength validation
      if (rule.minLength && stringValue.length < rule.minLength) {
        return `${this.capitalize(field)} must be at least ${rule.minLength} characters`;
      }

      // MaxLength validation
      if (rule.maxLength && stringValue.length > rule.maxLength) {
        return `${this.capitalize(field)} must not exceed ${rule.maxLength} characters`;
      }

      // Pattern validation
      if (rule.pattern && !rule.pattern.test(stringValue)) {
        return `${this.capitalize(field)} format is invalid`;
      }

      // Custom validation with country context
      if (rule.custom) {
        const result = rule.custom(stringValue, country);
        if (result !== true) {
          return typeof result === 'string' ? result : `${this.capitalize(field)} is invalid`;
        }
      }
    }

    return null;
  }

  // 🛠️ Helper: Get phone placeholder based on country
  getPhonePlaceholder(countryCode?: string): string {
    if (!countryCode) return 'Select country first';
    
    const country = this.getCountryByCode(countryCode);
    return country ? country.phoneExample : 'Enter phone number';
  }

  // 🛠️ Helper: Get country suggestions for search
  getCountrySuggestions(query: string): Country[] {
    const searchTerm = query.toLowerCase();
    
    return this.countries.filter(country => 
      country.name.toLowerCase().includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm) ||
      country.dialCode.includes(searchTerm)
    );
  }

  // 🛠️ Private helper method
  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}