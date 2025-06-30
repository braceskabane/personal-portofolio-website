// ================================
// src/services/portfolio/mockPortfolioService.ts
// ================================

'use client';

import type { 
  Project, 
  Experience, 
  Skill, 
  PersonalInfo, 
  ContactForm,
  Country 
} from '@/types';
import { ContactValidationService } from '@/services/validation/contactValidation';

export interface PortfolioRepository {
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project>;
  getExperience(): Promise<Experience[]>;
  getSkills(): Promise<Skill[]>;
  getPersonalInfo(): Promise<PersonalInfo>;
  submitContact(data: ContactForm): Promise<void>;
  getSupportedCountries?(): Country[];
  detectCountryFromPhone?(phone: string): Country | null;
}

export class MockPortfolioService implements PortfolioRepository {
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  private validationService = new ContactValidationService();

  // 🌍 Get supported countries
  getSupportedCountries(): Country[] {
    return this.validationService.getCountries();
  }

  // 🔍 Detect country from phone number
  detectCountryFromPhone(phone: string): Country | null {
    return this.validationService.detectCountryFromPhone(phone);
  }

  async getProjects(): Promise<Project[]> {
    await this.delay(800); // Simulate API delay
    
    return [
      {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard. Built with modern technologies and scalable architecture.',
        technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Redis', 'Docker'],
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
        demoUrl: 'https://demo-ecommerce.example.com',
        githubUrl: 'https://github.com/example/ecommerce-platform',
        stats: { users: '10K+', performance: '98%', uptime: '99.9%' },
        featured: true,
        category: 'web-app'
      },
      {
        id: '2',
        title: 'AI Analytics Dashboard',
        description: 'Real-time analytics platform with machine learning insights and predictive modeling. Features advanced data visualization and automated reporting.',
        technologies: ['React', 'D3.js', 'Python', 'TensorFlow', 'FastAPI', 'MongoDB'],
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        demoUrl: 'https://analytics-demo.example.com',
        githubUrl: 'https://github.com/example/ai-analytics',
        stats: { dataPoints: '1M+', accuracy: '94%', speed: '2.3s' },
        featured: true,
        category: 'web-app'
      },
      {
        id: '3',
        title: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric authentication and real-time transactions. Supports multiple currencies and international transfers.',
        technologies: ['React Native', 'Node.js', 'MongoDB', 'JWT', 'Socket.io', 'AWS'],
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
        demoUrl: 'https://banking-demo.example.com',
        githubUrl: 'https://github.com/example/mobile-banking',
        stats: { downloads: '50K+', rating: '4.8★', security: 'A+' },
        featured: false,
        category: 'mobile-app'
      },
      {
        id: '4',
        title: 'Task Management API',
        description: 'RESTful API for task management with team collaboration features. Includes real-time notifications and advanced filtering capabilities.',
        technologies: ['Node.js', 'Express', 'GraphQL', 'PostgreSQL', 'Redis', 'Jest'],
        imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
        demoUrl: 'https://api-docs.example.com',
        githubUrl: 'https://github.com/example/task-api',
        stats: { users: '1M+', performance: '99.8%', uptime: '150ms' },
        featured: false,
        category: 'api'
      },
      {
        id: '5',
        title: 'Component Library',
        description: 'Reusable React component library with TypeScript support. Includes comprehensive documentation and Storybook integration.',
        technologies: ['React', 'TypeScript', 'Storybook', 'Rollup', 'Jest', 'Chromatic'],
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
        demoUrl: 'https://storybook.example.com',
        githubUrl: 'https://github.com/example/component-library',
        stats: { users: '5K+', performance: '50+', uptime: '95%' },
        featured: false,
        category: 'library'
      }
    ];
  }

  async getProject(id: string): Promise<Project> {
    await this.delay(500);
    const projects = await this.getProjects();
    const project = projects.find(p => p.id === id);
    
    if (!project) {
      throw new Error(`Project with id ${id} not found`);
    }
    
    return project;
  }

  async getExperience(): Promise<Experience[]> {
    await this.delay(600);
    
    return [
      {
        id: '1',
        title: 'Senior Full Stack Developer',
        description: 'Leading development of scalable web applications using React, Next.js, and cloud technologies. Mentoring junior developers and architecting microservices solutions for high-traffic applications.',
        company: 'Tech Innovators Inc.',
        position: 'Senior Full Stack Developer',
        duration: '2022 - Present',
        location: 'San Francisco, CA',
        type: 'full-time',
        achievements: [
          'Increased application performance by 40% through code optimization and caching strategies',
          'Led a team of 6 developers in delivering 3 major product releases',
          'Implemented CI/CD pipeline reducing deployment time by 60%',
          'Mentored 4 junior developers, with 2 receiving promotions',
          'Architected microservices infrastructure handling 1M+ daily users'
        ],
        technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL']
      },
      {
        id: '2',
        title: 'Frontend Developer',
        description: 'Developed responsive web applications and collaborated with design teams to create exceptional user experiences. Focused on performance optimization and accessibility compliance.',
        company: 'Digital Solutions Co.',
        position: 'Frontend Developer',
        duration: '2020 - 2022',
        location: 'New York, NY',
        type: 'full-time',
        achievements: [
          'Built 15+ production applications serving 100K+ monthly users',
          'Reduced bundle size by 30% through code splitting and optimization',
          'Improved SEO scores by 25% across all company websites',
          'Implemented design system used across 8 different products',
          'Achieved 98% accessibility compliance (WCAG 2.1 AA)'
        ],
        technologies: ['React', 'Vue.js', 'Sass', 'Webpack', 'JavaScript', 'HTML5', 'CSS3']
      },
      {
        id: '3',
        title: 'Junior Developer',
        description: 'Started career building dynamic websites and learning modern development practices. Contributed to various projects while developing fundamental programming skills.',
        company: 'Startup Hub',
        position: 'Junior Developer',
        duration: '2019 - 2020',
        location: 'Austin, TX',
        type: 'full-time',
        achievements: [
          'Completed 50+ client projects with 98% satisfaction rate',
          'Learned 8 new technologies including React, Node.js, and MongoDB',
          'Contributed to 3 open source projects with 500+ GitHub stars',
          'Reduced bug reports by 40% through comprehensive testing',
          'Received "Developer of the Year" award for outstanding performance'
        ],
        technologies: ['JavaScript', 'HTML', 'CSS', 'PHP', 'MySQL', 'jQuery', 'Bootstrap']
      }
    ];
  }

  async getSkills(): Promise<Skill[]> {
    await this.delay(400);
    
    return [
      // Frontend Skills
      { name: 'React.js', level: 95, category: 'Frontend', yearsOfExperience: 5 },
      { name: 'Next.js', level: 90, category: 'Frontend', yearsOfExperience: 3 },
      { name: 'Vue.js', level: 85, category: 'Frontend', yearsOfExperience: 2 },
      { name: 'Svelte', level: 75, category: 'Frontend', yearsOfExperience: 1 },
      
      // Languages
      { name: 'TypeScript', level: 92, category: 'Language', yearsOfExperience: 4 },
      { name: 'JavaScript', level: 95, category: 'Language', yearsOfExperience: 6 },
      { name: 'Python', level: 82, category: 'Language', yearsOfExperience: 3 },
      { name: 'Go', level: 70, category: 'Language', yearsOfExperience: 1 },
      
      // Backend Skills
      { name: 'Node.js', level: 88, category: 'Backend', yearsOfExperience: 4 },
      { name: 'Express.js', level: 85, category: 'Backend', yearsOfExperience: 4 },
      { name: 'FastAPI', level: 78, category: 'Backend', yearsOfExperience: 2 },
      { name: 'Django', level: 75, category: 'Backend', yearsOfExperience: 2 },
      
      // Database Skills
      { name: 'PostgreSQL', level: 85, category: 'Database', yearsOfExperience: 4 },
      { name: 'MongoDB', level: 80, category: 'Database', yearsOfExperience: 3 },
      { name: 'Redis', level: 75, category: 'Database', yearsOfExperience: 2 },
      { name: 'MySQL', level: 78, category: 'Database', yearsOfExperience: 3 },
      
      // Cloud & DevOps
      { name: 'AWS', level: 82, category: 'Cloud', yearsOfExperience: 3 },
      { name: 'Docker', level: 85, category: 'DevOps', yearsOfExperience: 3 },
      { name: 'Kubernetes', level: 75, category: 'DevOps', yearsOfExperience: 2 },
      { name: 'CI/CD', level: 80, category: 'DevOps', yearsOfExperience: 3 },
      
      // API & Testing
      { name: 'GraphQL', level: 80, category: 'API', yearsOfExperience: 2 },
      { name: 'REST APIs', level: 90, category: 'API', yearsOfExperience: 5 },
      { name: 'Jest', level: 85, category: 'Testing', yearsOfExperience: 4 },
      { name: 'Cypress', level: 75, category: 'Testing', yearsOfExperience: 2 }
    ];
  }

  async getPersonalInfo(): Promise<PersonalInfo> {
    await this.delay(300);
    
    return {
      name: 'Muhammad Daffa\' Fisabilillah',
      title: 'Junior Full Stack Developer',
      subtitle: '& UI/UX Designer',
      description: 'Passionate about creating scalable solutions that make a difference. With over 5 years of experience in full-stack development, I specialize in building robust applications using modern technologies and best practices.',
      profileImage: '/images/Davis_Metahuman.png',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'https://johndoe.dev',
      resume: '/resume-john-doe.pdf',
      social: {
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: 'https://twitter.com/johndoe',
        instagram: 'https://instagram.com/johndoe.dev',
        youtube: 'https://youtube.com/@johndoe-dev',
        behance: 'https://behance.net/johndoe',
        dribbble: 'https://dribbble.com/johndoe'
      }
    };
  }

  // 📧 Enhanced submitContact with comprehensive country support
  async submitContact(data: ContactForm): Promise<void> {
    await this.delay(1500); // Simulate form submission delay
    
    try {
      // 1. Enhanced validation with country support
      const validation = this.validationService.validate(data);
      
      if (!validation.isValid) {
        const errorMessages = Object.values(validation.errors).join(', ');
        throw new Error(`Validation failed: ${errorMessages}`);
      }

      // 2. Validate phone number specifically if provided
      let phoneValidation = null; // 🔧 Define phoneValidation variable
      if (data.phone && data.country) {
        phoneValidation = this.validationService.validatePhoneNumber(data.phone, data.country);
        if (!phoneValidation.isValid) {
          throw new Error(phoneValidation.error || 'Invalid phone number');
        }
      }

      // 3. Get country information
      const countryInfo = data.country ? this.validationService.getCountryByCode(data.country) : null;

      // 4. Format phone number if valid
      let formattedData = { ...data };
      if (phoneValidation && phoneValidation.isValid && phoneValidation.formatted) {
        formattedData.phone = phoneValidation.formatted;
      }

      // 5. Enhanced logging with country metadata
      console.log('🌍 Enhanced Contact Form Submitted:', {
        submission: {
          ...formattedData,
          submissionId: `contact-${Date.now()}`,
          submissionTime: new Date().toISOString()
        },
        country: countryInfo ? {
          code: countryInfo.code,
          name: countryInfo.name,
          flag: countryInfo.flag,
          dialCode: countryInfo.dialCode
        } : null,
        client: {
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
          language: typeof navigator !== 'undefined' ? navigator.language : 'Unknown',
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timestamp: Date.now()
        },
        validation: {
          phoneFormatted: !!phoneValidation?.formatted, // 🔧 Fixed reference
          countryDetected: !!countryInfo,
          validationPassed: true
        }
      });

      // 6. Simulate different response scenarios for testing
      if (data.email.includes('test')) {
        console.log('🧪 Test submission detected - Success!');
        return;
      }

      if (data.email.includes('error')) {
        throw new Error('Simulated submission error for testing purposes');
      }

      if (data.email.includes('slow')) {
        await this.delay(3000); // Simulate slow response
        console.log('🐌 Slow submission test completed');
        return;
      }

      // 7. Simulate successful submission with country-specific handling
      if (countryInfo) {
        console.log(`✅ Contact form submitted successfully from ${countryInfo.flag} ${countryInfo.name}!`);
        
        // Simulate country-specific business logic
        switch (countryInfo.code) {
          case 'ID':
            console.log('🇮🇩 Indonesian submission - Using Bahasa Indonesia template');
            break;
          case 'US':
            console.log('🇺🇸 US submission - Using English template');
            break;
          case 'SG':
            console.log('🇸🇬 Singapore submission - Using multi-language template');
            break;
          default:
            console.log(`🌍 International submission from ${countryInfo.name}`);
        }
      } else {
        console.log('✅ Contact form submitted successfully (no country specified)');
      }
      
      // In real implementation, this would:
      // 1. Save to database with full country metadata
      // 2. Send email notification with country-specific templates
      // 3. Track analytics by country and region
      // 4. Apply country-specific business rules
      // 5. Queue follow-up actions based on timezone
      // 6. Integrate with CRM systems
      // 7. Trigger localized notifications
      
      return;

    } catch (error) {
      // Enhanced error logging
      console.error('❌ Contact submission failed:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        data: { ...data, phone: data.phone ? '***masked***' : undefined },
        timestamp: new Date().toISOString(),
        country: data.country
      });
      
      throw error;
    }
  }

  // 🛠️ Helper method to validate contact data without submitting
  async validateContactData(data: ContactForm): Promise<{
    isValid: boolean;
    errors: Record<string, string>;
    countryInfo?: Country;
    formattedPhone?: string;
  }> {
    const validation = this.validationService.validate(data);
    const countryInfo = data.country ? this.validationService.getCountryByCode(data.country) : undefined;
    
    let formattedPhone: string | undefined;
    if (data.phone && data.country) {
      const phoneValidation = this.validationService.validatePhoneNumber(data.phone, data.country);
      if (phoneValidation.isValid && phoneValidation.formatted) {
        formattedPhone = phoneValidation.formatted;
      }
    }

    return {
      isValid: validation.isValid,
      errors: validation.errors,
      countryInfo,
      formattedPhone
    };
  }

  // 🌍 Helper method to get country suggestions based on partial input
  getCountrySuggestions(query: string): Country[] {
    const countries = this.getSupportedCountries();
    const searchTerm = query.toLowerCase();
    
    return countries.filter(country => 
      country.name.toLowerCase().includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm) ||
      country.dialCode.includes(searchTerm)
    ).slice(0, 5); // Limit to 5 suggestions
  }
}
