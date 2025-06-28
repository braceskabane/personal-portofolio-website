// ================================
// src/services/validation/contactValidation.ts
// ================================

'use client';

import type { ContactForm } from '@/types';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export class ContactValidationService {
  private rules: Record<keyof ContactForm, ValidationRule[]> = {
    name: [
      { required: true },
      { minLength: 2 },
      { maxLength: 50 },
      { 
        pattern: /^[a-zA-Z\s]+$/, 
        custom: (value: string) => {
          if (!/^[a-zA-Z\s]+$/.test(value)) {
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
        pattern: /^[\+]?[1-9][\d]{0,15}$/,
        custom: (value: string) => {
          if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value)) {
            return 'Please provide a valid phone number';
          }
          return true;
        }
      }
    ],
    company: [
      { maxLength: 100 }
    ]
  };

  validate(data: ContactForm): ValidationResult {
    const errors: Record<string, string> = {};

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

        // Custom validation
        if (rule.custom) {
          const result = rule.custom(stringValue);
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

  validateField(field: keyof ContactForm, value: any): string | null {
    const rules = this.rules[field];
    if (!rules) return null;

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

      // Custom validation
      if (rule.custom) {
        const result = rule.custom(stringValue);
        if (result !== true) {
          return typeof result === 'string' ? result : `${this.capitalize(field)} is invalid`;
        }
      }
    }

    return null;
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
