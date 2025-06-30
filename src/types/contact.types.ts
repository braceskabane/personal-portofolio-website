// ================================
// src/types/contact.types.ts (Update ContactForm)
// ================================

export interface ContactForm {
    name: string;
    email: string;
    subject?: string;
    message: string;
    phone?: string;
    company?: string;
    country?: string; 
  }
  
export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  phonePattern: RegExp;
  phoneExample: string;
  maxLength: number;
}