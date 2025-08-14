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
        title: 'BAKI: Sport Motion Detector Based on ML Kit',
        description: 'Android fitness app offering real-time posture correction and motion analysis using ML Kit Pose Detection API and KNN classifier. Built custom motion classifier on 33 3D skeletal points with CSV dataset and Exponential Moving Average smoothing.',
        technologies: ['Kotlin', 'ML Kit', 'CameraX', 'Dagger Hilt', 'Jetpack Navigation', 'Firebase', 'CSV Parsing', 'KNN Classifier'],
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
        demoUrl: '/projects/demo-soon?project=baki',
        githubUrl: 'https://github.com/braceskabane/Proyek_Telematika.git',
        stats: { accuracy: '92%', speed: '30fps', performance: '3 months' },
        featured: true,
        category: 'mobile-app'
      },
      {
        id: '2',
        title: 'DogVision: On-Device Dog Breed Classifier',
        description: 'Custom CNN with residual blocks and Mixup data augmentation to classify 10 dog breeds with high accuracy. Optimized model for mobile deployment through PyTorch → ONNX → TensorFlow → TFLite pipeline with full offline capability.',
        technologies: ['PyTorch', 'ONNX', 'TensorFlow Lite', 'Kotlin', 'Room', 'Android Studio', 'CNN', 'Data Augmentation'],
        imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop',
        demoUrl: '/projects/demo-soon?project=dogvision',
        githubUrl: 'https://github.com/braceskabane/Dog_Classification.git',
        stats: { accuracy: '94%', dataPoints: '10 breeds', performance: '3 months' },
        featured: true,
        category: 'mobile-app'
      },
      {
        id: '3',
        title: 'Digital Twin for Virtual Music Concert Using Metahuman UE5',
        description: 'Photorealistic avatar for virtual musician using Unreal Engine 5 and Metahuman, enabling immersive concert performance in 3D environment. Integrated motion capture systems and achieved natural motion synchronization.',
        technologies: ['Unreal Engine 5', 'Metahuman', 'Move AI', 'Rokoko', 'DeepMotion', 'Live Link Face', 'Marvelous Designer', 'MediaPipe'],
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
        demoUrl: undefined, // No GitHub repository available
        githubUrl: undefined, // No GitHub repository available
        stats: {  speed: '30fps', accuracy: '95%', performance: '3 months' },
        featured: true,
        category: 'desktop-app'
      },
      {
        id: '4',
        title: 'Mini Game for Playing Card Classification',
        description: 'Terminal-based game with webcam card recognition using custom CNN model and real-time prediction with OpenCV. Implemented preprocessing pipeline with thresholding, perspective transform, and label prediction using Keras.',
        technologies: ['Python', 'Keras', 'OpenCV', 'NumPy', 'CNN', 'Computer Vision', 'Real-time Processing'],
        imageUrl: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=400&fit=crop',
        demoUrl: '/projects/demo-soon?project=mini-game',
        githubUrl: 'https://github.com/braceskabane/Playing-Card-with-Convolutional-Neural-Network.git',
        stats: { accuracy: '88%', dataPoints: '52 cards', performance: '3 months' },
        featured: false,
        category: 'desktop-app'
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
        title: 'Mobile Android Developer',
        description: 'Developed a membership-based Android application connecting users with partnered merchants using Kotlin and Clean Architecture (MVVM) for high scalability and maintainability. Collaborated with backend engineers to ensure seamless integration with RESTful APIs.',
        company: 'PT. Adinata Charming Emmanuel',
        position: 'Mobile Android Developer',
        duration: 'Jul 2024 – Feb 2025',
        location: 'Surabaya, Indonesia',
        type: 'full-time',
        achievements: [
          'Developed membership-based Android application with Kotlin and Clean Architecture (MVVM)',
          'Implemented secure authentication flow with OTP/email verification and token refresh',
          'Built UI components in XML following UI/UX design specs with animations and smooth transitions',
          'Handled core promo flows: creation, activation, referral redemption, and history display',
          'Collaborated with backend engineers for seamless RESTful API integration'
        ],
        technologies: ['Kotlin', 'Android SDK', 'MVVM', 'XML', 'RESTful APIs', 'OTP', 'Token Authentication', 'Promo Systems']
      },
      {
        id: '2',
        title: 'Mobile Application Developer (Internship)',
        description: 'Completed a 20-week career readiness program led by Google, GoTo, and Traveloka, focused on industry-level mobile development. Built Android applications using modern technologies and contributed to cross-functional teams.',
        company: 'Bangkit Academy',
        position: 'Mobile Application Developer Intern',
        duration: 'Feb 2024 – Aug 2024',
        location: 'Remote, Indonesia',
        type: 'internship',
        achievements: [
          'Completed 20-week career readiness program led by Google, GoTo, and Traveloka',
          'Built Android applications using Kotlin, Jetpack Compose, and MVVM architecture',
          'Integrated REST APIs and Room local database for data persistence',
          'Integrated on-device Machine Learning features using TensorFlow Lite for real-time prediction',
          'Contributed to cross-functional Capstone Project team (ML, Cloud, Mobile)',
          'Participated in mentorship sessions and weekly code reviews'
        ],
        technologies: ['Kotlin', 'Jetpack Compose', 'MVVM', 'REST APIs', 'Room Database', 'TensorFlow Lite', 'Machine Learning', 'Android Studio']
      }
    ];
  }

  async getSkills(): Promise<Skill[]> {
    await this.delay(400);
    
    return [
      // Programming Languages
      { name: 'Kotlin', projectCount: 2, category: 'Language', description: 'Used in BAKI and DogVision Android apps' },
      { name: 'Python', projectCount: 1, category: 'Language', description: 'Used in Playing Card Classification game' },
      { name: 'Java', projectCount: 1, category: 'Language', description: 'Used in university coursework projects' },
      { name: 'XML', projectCount: 2, category: 'Language', description: 'UI layouts for Android applications' },
      { name: 'SQL', projectCount: 1, category: 'Database', description: 'Database queries and Room integration' },
      
      // Android Development
      { name: 'Android SDK', projectCount: 2, category: 'Mobile', description: 'Core Android development for mobile apps' },
      { name: 'Jetpack Compose', projectCount: 1, category: 'Mobile', description: 'Modern UI toolkit for Android' },
      { name: 'MVVM Architecture', projectCount: 2, category: 'Backend', description: 'Clean architecture pattern implementation' },
      { name: 'Clean Architecture', projectCount: 1, category: 'Backend', description: 'Scalable app architecture design' },
      
      // Frameworks & Libraries
      { name: 'Room Database', projectCount: 2, category: 'Database', description: 'Local data persistence in Android' },
      { name: 'Dagger Hilt', projectCount: 1, category: 'Backend', description: 'Dependency injection framework' },
      { name: 'CameraX', projectCount: 2, category: 'Mobile', description: 'Camera functionality for ML apps' },
      { name: 'Firebase', projectCount: 1, category: 'Backend', description: 'Backend services and authentication' },
      
      // Machine Learning & AI
      { name: 'TensorFlow Lite', projectCount: 1, category: 'Backend', description: 'On-device ML model deployment' },
      { name: 'ML Kit', projectCount: 1, category: 'Mobile', description: 'Pose detection and motion analysis' },
      { name: 'PyTorch', projectCount: 1, category: 'Backend', description: 'Custom CNN model development' },
      { name: 'OpenCV', projectCount: 1, category: 'Backend', description: 'Computer vision and image processing' },
      { name: 'Keras', projectCount: 1, category: 'Backend', description: 'Deep learning model training' },
      
      // Game Development & 3D
      { name: 'Unreal Engine 5', projectCount: 1, category: 'Design', description: 'Virtual concert and 3D environment' },
      { name: 'Metahuman', projectCount: 1, category: 'Design', description: 'Photorealistic avatar creation' },
      { name: 'Motion Capture', projectCount: 1, category: 'Design', description: 'Avatar animation and synchronization' },
      
      // Tools & Platforms
      { name: 'Android Studio', projectCount: 2, category: 'DevOps', description: 'Primary IDE for Android development' },
      { name: 'Git', projectCount: 4, category: 'DevOps', description: 'Version control for all projects' },
      { name: 'GitHub', projectCount: 4, category: 'DevOps', description: 'Code repository and collaboration' },
      { name: 'Gradle', projectCount: 2, category: 'DevOps', description: 'Build automation for Android' },
      
      // API & Integration
      { name: 'REST APIs', projectCount: 1, category: 'API', description: 'API integration and data handling' },
      { name: 'Material Design', projectCount: 2, category: 'Design', description: 'Modern UI/UX design principles' }
    ];
  }

  async getPersonalInfo(): Promise<PersonalInfo> {
    await this.delay(300);
    
    return {
      name: 'Muhammad Daffa\' Fisabilillah',
      title: 'Computer Engineering Student in',
      subtitle: 'ITS University',
      description: 'Mobile Application Developer with strong foundations in Android development, machine learning integration, and real-time computer vision. Experienced in building end-to-end mobile solutions using Kotlin, MVVM architecture, and modern Android libraries including Jetpack, CameraX, and Firebase. Proficient in deploying lightweight on-device AI models (TFLite, ML Kit) and working with custom CNNs and pose estimation pipelines. Demonstrated ability to work in cross-functional teams and lead student-led projects and organizations.',
      profileImage: '/images/Davis_Metahuman.png',
      email: 'mydaffa2003@gmail.com',
      phone: '+62 822 8924 7001',
      location: 'Surabaya, Indonesia',
      website: 'https://dav-portofolio.vercel.app',
      resume: '/resume-daffa-fisabilillah.pdf',
      social: {
        github: 'https://github.com/braceskabane',
        linkedin: 'https://linkedin.com/in/muhammaddaffafisabilillah',
        twitter: 'https://twitter.com/daffafisabilillah',
        instagram: 'https://instagram.com/braceskabane',
        youtube: 'https://youtube.com/@daffafisabilillah',
        behance: 'https://behance.net/daffafisabilillah',
        dribbble: 'https://dribbble.com/daffafisabilillah'
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
