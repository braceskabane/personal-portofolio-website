export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export class ValidationService {
  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  validateContactForm(data: any): ValidationResult {
    const errors: Record<string, string> = {};

    if (!data.name?.trim()) {
      errors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (data.name.trim().length > 100) {
      errors.name = 'Name must be less than 100 characters';
    }

    if (!data.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!this.validateEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.subject?.trim()) {
      errors.subject = 'Subject is required';
    } else if (data.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    } else if (data.subject.trim().length > 200) {
      errors.subject = 'Subject must be less than 200 characters';
    }

    if (!data.message?.trim()) {
      errors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    } else if (data.message.trim().length > 5000) {
      errors.message = 'Message must be less than 5000 characters';
    }

    if (data.phone && !this.validatePhone(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (data.company && data.company.length > 100) {
      errors.company = 'Company name must be less than 100 characters';
    }

    if (this.isSpamContent(data)) {
      errors.message = 'Message flagged as potential spam';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  private validateEmail(email: string): boolean {
    return this.emailRegex.test(email.trim());
  }

  private validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+\d\s\-\(\)]{7,20}$/;
    return phoneRegex.test(phone.trim());
  }

  private isSpamContent(data: any): boolean {
    const spamKeywords = [
      'viagra', 'casino', 'lottery', 'free money', 'click here',
      'urgent business', 'inheritance', 'lottery winner', 'prince',
      'millions of dollars', 'western union', 'transfer funds'
    ];

    const text = (data.subject + ' ' + data.message).toLowerCase();
    
    const spamScore = spamKeywords.reduce((score, keyword) => {
      return text.includes(keyword) ? score + 1 : score;
    }, 0);

    const caps = text.match(/[A-Z]/g);
    const capsRatio = caps ? caps.length / text.length : 0;
    
    const punctuation = text.match(/[!?]{2,}/g);
    const punctuationCount = punctuation ? punctuation.length : 0;

    return spamScore >= 2 || capsRatio > 0.7 || punctuationCount > 3;
  }
}
