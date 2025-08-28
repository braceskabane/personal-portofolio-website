// ================================
// src/hooks/useModalDetail.ts
// ================================

import { useState, useCallback } from 'react';
import type { ProjectDetailData } from '@/components/common/ProjectDetailModal';

// Function to get project detail data based on actual project/experience ID
async function fetchProjectDetail(id: string, category: 'project' | 'experience'): Promise<ProjectDetailData> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return data based on actual project/experience IDs from MockPortfolioService
  if (category === 'experience') {
    // Map experience data based on ID
    switch(id) {
      case '1': // PT. Adinata Charming Emmanuel
        return {
          id,
          title: 'Android Developer - PT. Adinata Charming Emmanuel (ACE MEMBERSHIP APP)',
          year: '2024',
          category,
          problem: 'PT. Adinata Charming Emmanuel needed a comprehensive membership-based mobile application to enhance customer engagement, streamline business operations, and modernize their customer management system. The existing system lacked mobile presence and efficient member management capabilities.',
          solution: 'Developed ACE MEMBERSHIP APP - a full-featured Android application using modern development practices including Clean Architecture, MVVM pattern, and secure authentication. The app features 43 endpoints integration, comprehensive membership management, promotional systems, and real-time data synchronization with backend services. Complete API documentation available via Postman.',
          impact: [
            'Successfully delivered a production-ready mobile application with 43 API endpoints',
            'Improved customer engagement through modern mobile interface and membership features',
            'Streamlined membership management processes with real-time data synchronization',
            'Enhanced security with proper authentication and authorization implementation',
            'Provided scalable architecture supporting multiple business operations',
            'Implemented comprehensive feature set as detailed in project proposal'
          ],
          role: 'Android Developer',
          contributions: [
            'Architected and developed complete Android application from scratch using Kotlin',
            'Implemented secure user authentication and authorization systems',
            'Designed and integrated 43 API endpoints for comprehensive functionality',
            'Created membership management features with real-time updates',
            'Developed promotional system with dynamic content management',
            'Established robust API integration architecture for backend communication',
            'Applied Clean Architecture principles with MVVM pattern for maintainable codebase',
            'Designed intuitive UI/UX following Figma design specifications',
            'Conducted comprehensive testing and quality assurance',
            'Collaborated with backend team for API design and integration',
            'Created comprehensive API documentation using Postman for all 43 endpoints'
          ],
          techStack: {
            mobile: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Material Design', 'XML Layouts'],
            architecture: ['MVVM Architecture', 'Clean Architecture', 'Repository Pattern', 'Use Cases'],
            networking: ['REST API Integration', 'JSON Parsing', 'HTTP Clients', 'Retrofit', 'OkHttp'],
            data: ['Room Database', 'SQLite', 'Shared Preferences', 'Local Caching'],
            tools: ['Android Studio', 'Git', 'Postman', 'Figma', 'GitHub'],
            deployment: ['APK Distribution', 'Internal Testing', 'Version Control', 'Documentation']
          },
          gallery: [
            {
              id: '1',
              url: '/ace-membership/Images/1_Ace_Profile.png',
              caption: 'ACE MEMBERSHIP APP - Profile management interface',
              type: 'screenshot'
            },
            {
              id: '2',
              url: '/ace-membership/Images/2_Kata_Kata_Hari_Ini.png',
              caption: 'Daily inspiration - Kata-kata Hari Ini feature',
              type: 'screenshot'
            },
            {
              id: '3',
              url: '/ace-membership/Images/3_Design_System.png',
              caption: 'Design system and UI components specification',
              type: 'diagram'
            },
            {
              id: '4',
              url: '/ace-membership/Images/4_Epic_Todo_List_Scrum.png',
              caption: 'Project management - Epic Todo List and Scrum methodology',
              type: 'diagram'
            },
            {
              id: '5',
              url: '/ace-membership/Images/7_Daily_Sprint.png',
              caption: 'Daily sprint progress and development workflow',
              type: 'diagram'
            },
            {
              id: '6',
              url: '/ace-membership/Images/6_Manual_Testing.png',
              caption: 'Manual testing process and quality assurance',
              type: 'screenshot'
            }
          ],
          reports: [
            {
              title: 'Project Proposal - ACE MEMBERSHIP APP',
              url: '/ace-membership/Proposal_AceMember.pdf',
              type: 'pdf',
              size: '2.5 MB'
            },
            {
              title: 'Progress Payment Presentation',
              url: '/ace-membership/Progress_Payment.pdf',
              type: 'pdf',
              size: '1.8 MB'
            },
            {
              title: 'Backend API Documentation (Postman)',
              url: 'https://documenter.getpostman.com/view/31368205/2sAYBbepF9',
              type: 'doc',
              size: 'Online'
            }
          ],
          githubUrl: 'https://github.com/AceHotelProject/ACE-MEMBERSHIP-APP.git',
          documentationUrl: 'https://www.figma.com/design/0SYhYVfIzmNDbjhjDsKja9/Ace-Member?node-id=0-1&t=k5VD3fA81zOlGxZn-1',
          demoUrl: 'https://drive.google.com/drive/mobile/folders/1FwcfOPBo3kiz3_H38E5WHABdpoOGWwzn?usp=sharing'
        };
        
      case '2': // Bangkit Academy
        return {
          id,
          title: 'Mobile Development Learning Path - Bangkit Academy 2024',
          year: '2024',
          category,
          problem: 'Indonesia faces a significant digital talent gap, particularly in mobile development and emerging technologies. There was a need for a comprehensive career readiness program that bridges the gap between academic learning and industry requirements, preparing students for real-world software development challenges.',
          solution: 'Participated in Bangkit Academy 2024, an intensive 20-week career readiness program led by Google, GoTo, and Traveloka. Focused on Mobile Development Learning Path covering modern Android development, Kotlin programming, machine learning integration, and cross-functional team collaboration. Completed comprehensive coursework including 10+ specialized courses and a capstone project "Terravision" involving real-world application development with industry mentorship.',
          impact: [
            'Successfully completed 20-week intensive career readiness program with distinction',
            'Achieved certifications in 10+ specialized courses covering complete Android development stack',
            'Mastered modern Android development using Kotlin and Jetpack Compose',
            'Built production-ready mobile applications with clean architecture principles',
            'Successfully delivered "Terravision" capstone project with cross-functional team',
            'Gained expertise in integrating machine learning features using TensorFlow Lite',
            'Developed strong cross-functional collaboration skills through team-based projects',
            'Received industry-standard training from Google, GoTo, and Traveloka experts',
            'Enhanced problem-solving abilities through real-world project challenges',
            'Built professional network with peers and industry mentors across Indonesia',
            'Completed comprehensive learning path from programming fundamentals to expert-level Android development'
          ],
          role: 'Mobile Development Cohort - Android Learning Path',
          contributions: [
            'Completed comprehensive Android development curriculum with 10+ specialized course certifications',
            'Achieved mastery in Programming Logic 101 and Software Development Fundamentals',
            'Earned Android Fundamental certification covering complete Android development basics',
            'Mastered Kotlin programming language with dedicated certification',
            'Completed Android for Beginners course with hands-on project implementations',
            'Advanced to Android Intermediate level with complex application development',
            'Achieved Android Developer Expert certification demonstrating advanced proficiency',
            'Learned and applied SOLID programming principles for maintainable code architecture',
            'Gained expertise in Git and GitHub for professional version control workflows',
            'Integrated AI and machine learning concepts into mobile development projects',
            'Led cross-functional collaboration in "Terravision" capstone project development',
            'Participated in weekly mentorship sessions and peer code reviews',
            'Presented final capstone project to industry experts and received valuable feedback',
            'Applied agile development methodologies and project management best practices',
            'Documented complete learning journey and technical implementations'
          ],
          techStack: {
            mobile: ['Kotlin', 'Jetpack Compose', 'Material Design 3', 'Android SDK', 'XML Layouts'],
            architecture: ['MVVM Pattern', 'Clean Architecture', 'Repository Pattern', 'Use Cases', 'Dependency Injection'],
            data: ['Room Database', 'SQLite', 'Shared Preferences', 'DataStore', 'RESTful API Integration'],
            tools: ['Android Studio', 'Git', 'GitHub', 'TensorFlow Lite', 'Postman', 'Figma'],
            concepts: ['Machine Learning Integration', 'Team Collaboration', 'Agile Methodology', 'Code Review', 'UI/UX Design']
          },
          gallery: [
            {
              id: '1',
              url: '/bangkit-academy/Images/Terravision_Capstone_Deck.png',
              caption: 'Terravision Capstone Project - Main presentation deck',
              type: 'screenshot'
            },
            {
              id: '2',
              url: '/bangkit-academy/Images/VBG_Presentasi_Blue.png',
              caption: 'Capstone project presentation - Team collaboration showcase',
              type: 'screenshot'
            }
          ],
          reports: [
            {
              title: 'Bangkit Academy 2024 - Certificate of Completion',
              url: '/bangkit-academy/Sertificate_Member_Bangkit_Academy.pdf',
              type: 'pdf',
              size: '1.2 MB'
            },
            {
              title: 'Academic Transcript - Mobile Development Learning Path',
              url: '/bangkit-academy/Transcript_Bangkit_Academy.pdf',
              type: 'pdf',
              size: '800 KB'
            },
            {
              title: 'Capstone Project Plan & Timeline',
              url: '/bangkit-academy/Project_Plan.pdf',
              type: 'pdf',
              size: '1.5 MB'
            },
            {
              title: 'Final Presentation - Capstone Project',
              url: '/bangkit-academy/Capstone_Project_PPT.pdf',
              type: 'pdf',
              size: '3.2 MB'
            },
            {
              title: 'Internship Report - Bangkit Academy 2024',
              url: '/bangkit-academy/Report_Internship.pdf',
              type: 'pdf',
              size: '2.8 MB'
            }
          ],
          courseCertificates: [
            {
              title: 'Android Fundamental',
              url: '/bangkit-academy/Images/sertifikat_course_Android Fundamental.pdf',
              type: 'pdf',
              size: '500 KB'
            },
            {
              title: 'Kotlin Programming',
              url: '/bangkit-academy/Images/sertifikat_course_Memulai Pemrograman Kotlin.pdf',
              type: 'pdf',
              size: '500 KB'
            },
            {
              title: 'Android Developer Expert',
              url: '/bangkit-academy/Images/sertifikat_course_Menjadi Android Developer Expert.pdf',
              type: 'pdf',
              size: '500 KB'
            },
            {
              title: 'Android Intermediate',
              url: '/bangkit-academy/Images/sertifikat_course_Belajar Pengembangan Aplikasi Android Intermediate.pdf',
              type: 'pdf',
              size: '500 KB'
            },
            {
              title: 'Programming Logic 101',
              url: '/bangkit-academy/Images/sertifikat_course_302_Pengenalan ke Logika Pemrograman (Programming Logic 101).pdf',
              type: 'pdf',
              size: '500 KB'
            },
            {
              title: 'SOLID Principles',
              url: '/bangkit-academy/Images/sertifikat_course_Prinsip Pemrograman Solid.pdf',
              type: 'pdf',
              size: '500 KB'
            },
            {
              title: 'Git & GitHub',
              url: '/bangkit-academy/Images/sertifikat_course_Belajar Dasar Git dengan GitHub.pdf',
              type: 'pdf',
              size: '500 KB'
            },
            {
              title: 'Basic AI Learning',
              url: '/bangkit-academy/Images/sertifikat_course_Belajar Dasar AI.pdf',
              type: 'pdf',
              size: '500 KB'
            },
            {
              title: 'Software Development Fundamentals',
              url: '/bangkit-academy/Images/sertifikat_course_Memulai Dasar Pemrograman untuk Menjadi Pengembang Software.pdf',
              type: 'pdf',
              size: '500 KB'
            },
            {
              title: 'Android for Beginners',
              url: '/bangkit-academy/Images/sertifikat_course_Belajar Membuat Aplikasi Android Untuk Pemula.pdf',
              type: 'pdf',
              size: '500 KB'
            }
          ],
          githubUrl: 'https://github.com/braceskabane/Capstone.git' // Only capstone project repository
        };
        
      default:
        // Generic experience data for unknown IDs
        return {
          id,
          title: 'Professional Experience',
          year: '2024',
          category,
          problem: 'Details about this experience are being updated.',
          solution: 'Please check back later for more information.',
          impact: ['Experience details coming soon'],
          role: 'Various roles',
          contributions: ['Details to be added'],
          techStack: {
            frontend: ['Various technologies'],
            backend: ['Various frameworks'],
            database: ['Various databases'],
            tools: ['Various tools'],
            deployment: ['Various platforms']
          },
          gallery: [],
          reports: [],
          githubUrl: '#',
          documentationUrl: '#'
        };
    }
  }
  
  // Return data for projects based on ID from MockPortfolioService
  switch(id) {
    case '1': // BAKI
      return {
        id,
        title: 'BAKI - Body Analyzer & Kinetic Instructor',
        year: '2023-2024',
        category,
        problem: 'Many people struggle with maintaining proper form during workouts, leading to ineffective exercises and potential injuries. Without professional guidance and real-time feedback, it\'s difficult to know if you\'re performing movements correctly, which can result in poor workout effectiveness and increased risk of injury.',
        solution: 'BAKI uses ML Kit\'s real-time pose detection combined with custom KNN classification to provide instant feedback on exercise form. The app analyzes 33 3D body landmarks and compares movements against validated datasets to ensure proper technique. Features include real-time pose analysis, exercise form correction, and personalized workout guidance.',
        impact: [
          'Successfully implemented real-time pose detection using ML Kit for exercise form analysis',
          'Achieved accurate body landmark detection for major exercise movements',
          'Created comprehensive fitness application with personalized workout guidance',
          'Developed user-friendly interface for real-time exercise form feedback',
          'Implemented KNN classification for exercise movement validation',
          'Delivered complete fitness solution with exercise tracking and analysis'
        ],
        role: 'Lead Android Developer & ML Engineer',
        contributions: [
          'Integrated ML Kit Pose Detection API with custom KNN classifier for exercise analysis',
          'Implemented real-time camera processing for live exercise form feedback',
          'Built Clean Architecture with MVVM pattern for maintainable codebase',
          'Created intuitive UI/UX design for fitness application interface',
          'Developed comprehensive exercise tracking and analysis features',
          'Designed and implemented personalized workout recommendation system',
          'Conducted thorough testing and optimization for real-time performance',
          'Created detailed project documentation and user guidebook'
        ],
        techStack: {
          mobile: ['Kotlin', 'Android SDK', 'ML Kit', 'CameraX', 'Jetpack Compose'],
          architecture: ['MVVM Architecture', 'Clean Architecture', 'Repository Pattern'],
          data: ['Room Database', 'SQLite', 'Shared Preferences'],
          tools: ['Android Studio', 'ML Kit Pose Detection', 'KNN Classifier', 'Git'],
          concepts: ['Machine Learning', 'Computer Vision', 'Real-time Processing', 'Pose Detection']
        },
        gallery: [
          {
            id: '1',
            url: '/baki-fitness/Image/1_Poster.png',
            caption: 'BAKI Fitness - Project poster and overview',
            type: 'screenshot'
          },
          {
            id: '2',
            url: '/baki-fitness/Image/2_Banner.png',
            caption: 'BAKI Fitness - Application banner and branding',
            type: 'screenshot'
          }
        ],
        reports: [
          {
            title: 'Individual Project Report - BAKI Fitness',
            url: '/baki-fitness/Project_Report_Individual.pdf',
            type: 'pdf',
            size: '2.8 MB'
          },
          {
            title: 'Project Presentation - BAKI PPT',
            url: '/baki-fitness/BAKI_PPT.pdf',
            type: 'pdf',
            size: '3.5 MB'
          },
          {
            title: 'User Guidebook - BAKI Application',
            url: '/baki-fitness/Guidebook.pdf',
            type: 'pdf',
            size: '1.2 MB'
          },
          {
            title: 'Design Source Documentation',
            url: '/baki-fitness/Source_Desain.pdf',
            type: 'pdf',
            size: '2.1 MB'
          }
        ],
        githubUrl: 'https://github.com/braceskabane/Proyek_Telematika.git',
        demoUrl: '/projects/demo-soon?project=baki'
      };
      
    case '2': // DogVision
      return {
        id,
        title: 'DogVision - On-Device Dog Breed Classification',
        year: '2023-2024',
        category,
        problem: 'Dog owners and enthusiasts often struggle to accurately identify dog breeds, especially mixed breeds or less common varieties. Traditional methods require expert knowledge or expensive genetic testing, and many existing solutions require internet connectivity which limits their practicality in various situations.',
        solution: 'DogVision uses a custom Convolutional Neural Network (CNN) with advanced data augmentation techniques to classify 10 different dog breeds with high accuracy. The model is optimized for mobile deployment through a comprehensive pipeline from PyTorch to TensorFlow Lite, enabling complete offline functionality for real-time breed classification.',
        impact: [
          'Successfully implemented deep learning model for accurate dog breed classification',
          'Achieved high classification accuracy across 10 different dog breeds',
          'Developed complete offline mobile application with no internet dependency',
          'Created comprehensive dataset preprocessing and augmentation pipeline',
          'Delivered real-time classification with optimized model performance',
          'Built user-friendly Android interface with intuitive breed identification features'
        ],
        role: 'ML Engineer & Android Developer',
        contributions: [
          'Designed and trained custom CNN architecture for dog breed classification',
          'Implemented comprehensive data augmentation pipeline for improved model generalization',
          'Optimized model deployment pipeline: PyTorch → ONNX → TensorFlow → TFLite',
          'Built complete Android application with camera integration and real-time inference',
          'Integrated Room database for classification history and result storage',
          'Achieved efficient on-device inference with TensorFlow Lite optimization',
          'Created intuitive user interface with Material Design components',
          'Conducted extensive testing and model validation for production deployment'
        ],
        techStack: {
          mobile: ['Kotlin', 'Android SDK', 'TensorFlow Lite', 'CameraX', 'Material Design'],
          architecture: ['MVVM Architecture', 'Clean Architecture', 'Repository Pattern'],
          data: ['Room Database', 'SQLite', 'TensorFlow Lite Models'],
          tools: ['PyTorch', 'ONNX', 'TensorFlow', 'Android Studio', 'Python', 'Jupyter'],
          concepts: ['Deep Learning', 'Computer Vision', 'Model Optimization', 'Mobile ML', 'CNN Architecture']
        },
        gallery: [
          {
            id: '1',
            url: '/dog-vision/Images/Dog_Vision.png',
            caption: 'DogVision - Dog breed classification application overview',
            type: 'screenshot'
          }
        ],
        reports: [
          {
            title: 'Dog Breed Classification - Technical Report',
            url: '/dog-vision/Dog Breed Classification_Report.pdf',
            type: 'pdf',
            size: '2.8 MB'
          },
          {
            title: 'Project Presentation - Dogs Breed Classification',
            url: '/dog-vision/Dogs Breed Classfication_PPT.pdf',
            type: 'pdf',
            size: '3.2 MB'
          }
        ],
        githubUrl: 'https://github.com/braceskabane/Dog_Classification.git',
        demoUrl: '/projects/demo-soon?project=dogvision'
      };
      
    case '3': // Digital Twin - FOTO DISPLAY_ACTOR.JPEG SUDAH DIHAPUS
      return {
        id,
        title: 'Digital Twin for Virtual Music Concert Using Metahuman UE5',
        year: '2023-2024',
        category,
        problem: 'Traditional music concerts are limited by physical venues, travel restrictions, and capacity constraints. Musicians need new ways to connect with global audiences through immersive virtual performances.',
        solution: 'Created a photorealistic digital avatar using Unreal Engine 5 and Metahuman technology, enabling immersive virtual concert experiences. Integrated motion capture systems to achieve natural motion synchronization and realistic performance delivery.',
        impact: [
          'Successfully implemented facial motion capture using Live Link Face with blendshape comparison',
          'Achieved accurate facial landmark detection for mouth and eye movements using MediaPipe',
          'Created photorealistic Metahuman avatar with detailed facial expressions',
          'Integrated multiple motion capture technologies (Move AI, Rokoko, DeepMotion)',
          'Developed comprehensive virtual concert environment in Unreal Engine 5',
          'Demonstrated feasibility of real-time digital twin performance for virtual concerts'
        ],
        role: '3D Artist & Technical Developer',
        contributions: [
          'Created photorealistic Metahuman avatar with custom adjustments',
          'Integrated multiple motion capture systems (Move AI, Rokoko, DeepMotion)',
          'Implemented Live Link Face for facial motion capture',
          'Designed virtual concert environment in Unreal Engine 5',
          'Optimized performance for real-time rendering'
        ],
        techStack: {
          frontend: ['Unreal Engine 5', 'Metahuman Creator', 'Blueprint Visual Scripting'],
          tools: ['Move AI', 'Rokoko', 'DeepMotion', 'Live Link Face', 'MediaPipe', 'Marvelous Designer'],
          concepts: ['Motion Capture', '3D Character Creation', 'Facial Rigging', 'Real-time Rendering', 'Virtual Environment Design']
        },
        gallery: [
          {
            id: '1',
            url: '/digital-twin/Images/1_Banner.png',
            caption: 'Digital Twin Concert - Main banner and branding',
            type: 'screenshot'
          },
          {
            id: '3',
            url: '/digital-twin/Images/1_pose.png',
            caption: 'Motion capture pose demonstration - Setup 1',
            type: 'screenshot'
          },
          {
            id: '4',
            url: '/digital-twin/Images/2_pose.png',
            caption: 'Motion capture pose demonstration - Setup 2',
            type: 'screenshot'
          },
          {
            id: '5',
            url: '/digital-twin/Images/3_a.png',
            caption: 'Virtual concert environment - Scene A',
            type: 'screenshot'
          },
          {
            id: '6',
            url: '/digital-twin/Images/3_b.png',
            caption: 'Virtual concert environment - Scene B',
            type: 'screenshot'
          },
          {
            id: '7',
            url: '/digital-twin/Images/3_c.png',
            caption: 'Virtual concert environment - Scene C',
            type: 'screenshot'
          },
          {
            id: '8',
            url: '/digital-twin/Images/3_d.png',
            caption: 'Virtual concert environment - Scene D',
            type: 'screenshot'
          },
          {
            id: '9',
            url: '/digital-twin/Images/Penggabungan Aset.jpeg',
            caption: 'Asset integration workflow and pipeline',
            type: 'diagram'
          },
          {
            id: '10',
            videoUrl: 'https://www.youtube.com/embed/wukUAHbyV2g',
            caption: 'Digital Twin Concert Demo - Full Performance',
            type: 'video'
          },
          {
            id: '11',
            videoUrl: 'https://www.youtube.com/embed/awl8CPy4hyw',
            caption: 'Motion Capture Integration Showcase',
            type: 'video'
          },
          {
            id: '12',
            videoUrl: 'https://www.youtube.com/embed/ZELXzQ2_ZQg',
            caption: 'Virtual Concert Environment Walkthrough',
            type: 'video'
          }
        ],
        reports: [
          {
            title: 'Digital Twin Concert - Project Poster',
            url: '/digital-twin/5024211006_Muhammad Daffa Fisabilillah_Poster.pdf',
            type: 'pdf',
            size: '2.5 MB'
          },
          {
            title: 'Project Presentation Slides',
            url: '/digital-twin/5024211006_Muhammad_Daffa__Fisabilillah_PPT.pdf',
            type: 'pdf',
            size: '3.8 MB'
          },
          {
            title: 'Technical Paper & Research Documentation',
            url: '/digital-twin/5024211006_Muhammad_Daffa__Fisabilillah_Makalah.pdf',
            type: 'pdf',
            size: '1.2 MB'
          },
          {
            title: 'Complete Project Book - Final Documentation',
            url: '/digital-twin/5024211006_Muhammad_Daffa__Fisabilillah_Draft_Buku_Fix.pdf',
            type: 'pdf',
            size: '4.5 MB'
          },
          {
            title: 'Exhibition X-Banner Design',
            url: '/digital-twin/5024211006_Muhammad Daffa Fisabilillah_Xbanner.pdf',
            type: 'pdf',
            size: '1.8 MB'
          }
        ],
        githubUrl: undefined // No public repository
      };
      
    case '4': // Playing Card Game
      return {
        id,
        title: 'Mini Game for Playing Card Classification',
        year: '2023',
        category,
        problem: 'Traditional card games require physical cards and manual gameplay management. There was a need for an automated system that could recognize cards in real-time and manage game logic digitally, while also providing an engaging interactive experience for users.',
        solution: 'Developed a computer vision-based card recognition system using Convolutional Neural Networks (CNN) and OpenCV for real-time playing card classification. The system features webcam integration, automated card detection, and interactive gameplay management through a comprehensive preprocessing pipeline.',
        impact: [
          'Successfully implemented real-time playing card recognition using computer vision',
          'Achieved accurate card classification across all standard playing cards',
          'Created interactive gaming experience with automated card detection',
          'Developed robust preprocessing pipeline handling various lighting conditions',
          'Integrated webcam functionality for seamless real-time card recognition',
          'Built comprehensive game logic with automated scoring and turn management'
        ],
        role: 'Computer Vision Engineer & Game Developer',
        contributions: [
          'Designed and trained CNN model for playing card classification',
          'Implemented OpenCV preprocessing pipeline for robust card detection',
          'Built real-time webcam integration with perspective correction and image processing',
          'Created interactive terminal-based game interface with user-friendly controls',
          'Developed automated scoring system and turn management logic',
          'Optimized image processing pipeline for real-time performance',
          'Conducted extensive testing across different lighting conditions and card orientations',
          'Created comprehensive project documentation and technical implementation details'
        ],
        techStack: {
          frontend: ['Python', 'OpenCV', 'TensorFlow/Keras', 'NumPy'],
          architecture: ['CNN Architecture', 'Computer Vision Pipeline', 'Real-time Processing'],
          tools: ['Webcam Integration', 'Image Processing', 'Terminal Interface'],
          concepts: ['Computer Vision', 'Deep Learning', 'Real-time Recognition', 'Game Development']
        },
        gallery: [
          {
            id: '1',
            videoUrl: 'https://www.youtube.com/embed/1jJwtBCPKBs',
            caption: 'Playing Card Classification Demo - Real-time card recognition and gameplay',
            type: 'video'
          }
        ],
        reports: [
          {
            title: 'Playing Card Classification - Project Report',
            url: '/playing-card/5024211006-2-Muhammad Daffa\' Fisabilillah.pdf',
            type: 'pdf',
            size: '2.1 MB'
          }
        ],
        githubUrl: 'https://github.com/braceskabane/Playing-Card-with-Convolutional-Neural-Network.git',
        demoUrl: 'https://youtu.be/1jJwtBCPKBs'
      };
      
    default:
      // Generic project data for unknown IDs
      return {
        id,
        title: 'Project Details',
        year: '2024',
        category,
        problem: 'Project details are being updated.',
        solution: 'Please check back later for more information.',
        impact: ['Project details coming soon'],
        role: 'Developer',
        contributions: ['Details to be added'],
        techStack: {
          frontend: ['Various technologies'],
          backend: ['Various frameworks'],
          database: ['Various databases'],
          tools: ['Various tools'],
          deployment: ['Various platforms']
        },
        gallery: [],
        reports: [],
        githubUrl: '#',
        demoUrl: '#'
      };
  }
}

export const useModalDetail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<ProjectDetailData | null>(null);
  const [loading, setLoading] = useState(false);

  const openDetail = useCallback(async (projectId: string, category: 'project' | 'experience') => {
    setLoading(true);
    setIsOpen(true);
    
    try {
      // Fetch detailed data based on specific ID
      const data = await fetchProjectDetail(projectId, category);
      setCurrentProject(data);
    } catch (error) {
      console.error('Error loading project detail:', error);
      // You might want to show an error state here
    } finally {
      setLoading(false);
    }
  }, []);

  const closeDetail = useCallback(() => {
    setIsOpen(false);
    setCurrentProject(null);
  }, []);

  return {
    isOpen,
    currentProject,
    loading,
    openDetail,
    closeDetail
  };
};
