// ================================
// src/data/portfolio.data.ts (Enhanced with Personal Documents)
// ================================

export interface PersonalDocument {
    id: string;
    title: string;
    content: string;
    category: 'experience' | 'skills' | 'projects' | 'education' | 'achievements' | 'personal';
    language: 'en' | 'id' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'zh';
    lastUpdated: Date;
    tags: string[];
    featured?: boolean;
    priority?: number;
    status?: 'published' | 'draft' | 'archived';
}

// Helper function to get documents by category
export const getDocumentsByCategory = (category: PersonalDocument['category']) => {
    return PERSONAL_DOCUMENTS.filter((doc: PersonalDocument) => doc.category === category);
};

// Helper function to get featured documents
export const getFeaturedDocuments = () => {
    return PERSONAL_DOCUMENTS.filter((doc: PersonalDocument) => doc.featured === true);
};

// Helper function to get documents by language
export const getDocumentsByLanguage = (language: PersonalDocument['language']) => {
    return PERSONAL_DOCUMENTS.filter((doc: PersonalDocument) => doc.language === language);
};
  
// Detailed personal information in multiple languages
  export const PERSONAL_DOCUMENTS: PersonalDocument[] = [
    {
    id: 'bio-en',
    title: 'Professional Biography',
    category: 'personal',
    language: 'en',
    lastUpdated: new Date('2024-12-01'),
    tags: ['biography', 'background', 'story'],
    content: `
Muhammad Daffa' Fisabilillah is a Mobile Application Developer specializing in Android development, machine learning integration, and real-time computer vision. 
He has a proven track record in building end-to-end mobile solutions using Kotlin, MVVM architecture, and modern Android libraries such as Jetpack, CameraX, and Firebase. 
Daffa is also experienced in deploying lightweight on-device AI models (TensorFlow Lite, ML Kit) and integrating custom CNNs and pose estimation pipelines into mobile applications.

With a GPA of 3.53/4.0 from Institut Teknologi Sepuluh Nopember in Computer Engineering, Daffa has contributed to impactful projects including:
- **BAKI**: A sport motion detector app using ML Kit Pose Detection API with real-time posture correction.
- **DogVision**: An offline dog breed classifier using PyTorch and TensorFlow Lite.
- **Digital Twin for Virtual Music Concert**: A photorealistic avatar system using Unreal Engine 5 and Metahuman.
- **Playing Card Classification Mini Game**: A terminal-based real-time recognition game using OpenCV and Keras.

Professional experiences include:
- **Mobile Android Developer** at PT. Adinata Charming Emmanuel, developing a membership-based app with secure authentication, promo systems, and API integration.
- **Mobile Developer Intern** at Bangkit Academy, focusing on Kotlin, Jetpack Compose, Room database, and TensorFlow Lite integration.

Beyond technical skills, Daffa has served in leadership and organizational roles such as Human Resources Development Staff at HIMATEKKOM ITS and Head of Event Organizer Subdivision for MAGE 9 ITS.

**Technical Skills**:
- Languages: Kotlin, Java, Python, XML, SQL
- Frameworks & Libraries: Jetpack Compose, Android Jetpack, Dagger Hilt, PyTorch, TensorFlow Lite, OpenCV, Keras
- Tools & Platforms: Android Studio, Firebase, Git, CameraX, ML Kit, ONNX
- Concepts: Clean Architecture (MVVM), Agile (Scrum), On-Device Machine Learning, Real-Time Image Processing, REST API Integration, Material Design

Daffa is passionate about creating meaningful technology solutions that combine mobile innovation with AI, and enjoys working in cross-functional teams to bring impactful ideas to life.
    `
  },
  {
    id: 'project-baki',
    title: 'BAKI - Body Analyzer & Kinetic Instructor',
    category: 'projects',
    language: 'en',
    lastUpdated: new Date('2024-12-20'),
    tags: ['fitness', 'machine learning', 'pose detection', 'android', 'mlkit'],
    content: `
BAKI ("Body Analyzer & Kinetic Instructor") is an Android application that integrates ML Kit's real-time pose detection with custom movement classification to assist users in performing exercises with correct techniques, reducing injury risk, and improving performance.

PROJECT BACKGROUND:
BAKI addresses common issues in self-directed workouts, including difficulty in identifying posture errors, increased injury risks, and lack of access to professional trainers. It provides real-time feedback using mobile cameras, visual cues, voice instructions, and haptic notifications.

KEY FEATURES:
1. **Real-Time Pose Detection & Feedback**:
   - Uses CameraX and ML Kit Pose Detection to track 33 3D body landmarks.
   - PoseGraphic and GraphicOverlay handle skeleton visualization with clear left/right color differentiation.
   - Feedback includes correct/incorrect movement alerts, repetition counts, and rest timers.

2. **Movement Classification**:
   - Custom K-Nearest Neighbors (KNN) classifier compares real-time landmark data with validated CSV datasets.
   - EMASmoothing improves prediction stability.
   - Confidence threshold (>6.0) ensures accuracy in repetition counting.

3. **Workout Planning & Tracking**:
   - Daily Plan configuration with exercise type, repetitions, sets, and scheduling.
   - Progress tracking via History section, with labels like "Leg Day."
   - Rest intervals and automated set management.

4. **Psychomotor Training**:
   - Reflex Test: Measures reaction time against audio stimuli, categorizes performance (F1 Driver, Goalkeeper, etc.).
   - Anticipation Test: Ball drop simulation measuring visual timing accuracy.

5. **Authentication & Security**:
   - Email/password registration with OTP verification.
   - Secure login, personalized dashboard.

UI/UX DEVELOPMENT:
- Material Components with Bottom Navigation, FAB, ViewPager2.
- CameraX PreviewView for live video feed.
- Navigation Component for fragment-based flow.
- Intuitive dashboards: Home, History, Start, Daily Plan, Profile.

ARCHITECTURE:
- **Clean Architecture** with 3 layers:
  - Presentation: UI, ViewModels.
  - Domain: Entities, Use Cases, Repository Interfaces.
  - Data: Repository Implementations, Local/Remote DataSources.
- Dependency Injection via **Dagger Hilt** for scoped lifecycle management and reduced boilerplate.

TECHNOLOGIES USED:
- **Languages**: Kotlin, XML
- **Frameworks & Libraries**: Android Jetpack, CameraX, ML Kit Pose Detection, Material Components, Navigation Component, ViewPager2.
- **Architecture**: Clean Architecture + MVVM
- **ML**: KNN-based classifier with pose landmark data.
- **Version Control**: GitHub (Proyek_Telematika repository)
- **Documentation**: Notion, XML layout files.

DEVELOPMENT TIMELINE:
- Nov 2023: Research, proposal drafting, ML Kit feasibility testing.
- Nov–Jan 2024: UI/UX development, fragment navigation, daily plan system.
- Dec 2023: Backend integration for authentication, daily plans, and OTP verification.
- Jan–Feb 2024: CameraX + ML Kit integration, reflex & anticipation tests.
- Feb 2024: 22 of 25 core tasks completed; final optimization ongoing.

USER GUIDE HIGHLIGHTS:
- **Registration/Login** with OTP.
- **Workout Execution**: Camera-based posture tracking, instant feedback, repetition count.
- **Daily Plan** setup for structured workouts.
- **Reflex & Anticipation Tests** with categorized scoring.
- Data tracking for long-term progress monitoring.

IMPACT:
BAKI delivers a portable, AI-powered fitness coaching solution that bridges the gap between self-training and professional guidance, improving safety, technique, and motivation for users anywhere, anytime.
    `
  },
  {
    id: 'project-playing-card',
    title: 'Playing Card Mini Game with CNN & OpenCV',
    category: 'projects',
    language: 'en',
    lastUpdated: new Date('2024-12-15'),
    tags: ['deep learning', 'computer vision', 'opencv', 'cnn', 'python', 'game'],
    content: `
  The Playing Card Mini Game is a terminal-based interactive game that uses real-time playing card recognition via a webcam, powered by a custom CNN model and OpenCV preprocessing.

  PROJECT BACKGROUND:
  This project aims to demonstrate the integration of computer vision preprocessing, deep learning model deployment, and interactive game logic. It enables users to play a card game where the system automatically recognizes cards and manages gameplay flow.

  KEY FEATURES:
  1. **Dataset Collection**:
    - 20 JPG images per card for all 52 cards (total 1,040 images).
    - Captured via key commands in the game interface ('w' to save).
    - Images stored in structured directories per card label.

  2. **Preprocessing Pipeline**:
    - Green screen masking in HSV color space.
    - Morphological operations to remove noise.
    - Canny edge detection for contour finding.
    - Perspective transform to standardize card orientation.
    - Adaptive thresholding for suit/number extraction.
    - Color detection for suit classification (red/black).

  3. **Model Training**:
    - CNN architecture with Conv2D, MaxPooling, and Dense layers.
    - Input: 128×128 RGB images.
    - One-hot encoding for 52 card classes.
    - Model trained and saved as **Fix.h5** for deployment.

  4. **Gameplay Mechanics**:
    - Real-time prediction using np.argmax on CNN outputs.
    - Player verification step for incorrect predictions.
    - Card assignment to player/computer decks.
    - Open card pile management.
    - Turn-based gameplay with precedence-based scoring.

  5. **Code Structure**:
    - Game.py: Entry point initializing Gameplay() class and starting game loop.
    - gameplay.py: Handles game initialization, preprocessing, card taking, turn logic.
    - utils.py: Stores card labels, precedence values, card display, scoring functions.
    - 2 Training Label.py: Dataset loader, CNN definition, training, and saving.

  6. **Controls**:
    - 'w': Save dataset image.
    - 'e': Take card image for recognition.
    - 'p': Check current cards.
    - 'z': Start game.
    - 'j' / 'k': Assign card to player or computer.
    - 't': Take card during play.
    - 'u': Open new card.

  7. **End Conditions**:
    - All cards played.
    - One player's deck empty.
    - Precedence tie resulting in draw.

  TECHNOLOGIES USED:
  - **Languages**: Python
  - **Libraries**: OpenCV, NumPy, Keras, TensorFlow
  - **ML**: CNN-based classification model
  - **Others**: msvcrt for input handling, perspective transforms for preprocessing.

  IMPACT:
  The project showcases advanced use of computer vision and deep learning in a real-time game context, highlighting skills in preprocessing pipeline design, CNN training, and interactive Python application development.
    `
  },
  {
  id: 'project-dog-breed-classification',
  title: 'Dog Breed Classification - Deep Learning Project',
  category: 'projects',
  language: 'en',
  lastUpdated: new Date('2024-12-01'),
  tags: ['deep learning', 'computer vision', 'dog breed', 'classification', 'tensorflow', 'pytorch', 'transfer learning', 'mobile app', 'web app'],
  content: `
  This project focuses on developing a deep learning system to classify 10 dog breeds from images, implemented for both Web and Mobile applications. The development included building models from scratch and using transfer learning approaches (ResNet50V2 for web, MobileNetV2 for mobile), integrating them into apps, and optimizing for performance.

  **Background & Goals**
  The project aimed to explore image classification using deep learning, understand the differences between building models from scratch and transfer learning, and deploy them into practical applications. It utilized the Stanford Dog Breed dataset, applying preprocessing, augmentation, normalization, and stratified splits.

  **Methodology**
  - **Dataset**: 10 dog breeds from Stanford Dog Breed Dataset, with tailored preprocessing for each platform.
  - **Web App Models**:
    - **Scratch TensorFlow model**: Custom CNN with ConvBlocks, ResidualBlocks, Dropout, and Batch Normalization.
    - **Transfer Learning**: ResNet50V2 fine-tuned for dog breed classification.
  - **Mobile App Models**:
    - **Scratch PyTorch model**: CustomCNN with modular Feet, Body, Head design, ResidualBlocks, Kaiming initialization.
    - **Transfer Learning**: MobileNetV2 with frozen backbone and custom head layers.
  - **Training**: Adam/AdamW optimizers, CrossEntropy loss with label smoothing, learning rates tuned for scratch vs transfer, 30–50 epochs with early stopping.
  - **Integration**:
    - Web App using Flask backend serving TensorFlow .keras model.
    - Mobile App conversion from PyTorch → ONNX → TensorFlow → TFLite for Android/iOS, local history storage via Room DB.

  **Results & Analysis**
  - Scratch models achieved moderate accuracy (Web: 48% validation, Mobile: ~65%) but showed overfitting tendencies.
  - Transfer learning models achieved significantly higher performance (Web ResNet50V2: 86% validation accuracy; Mobile MobileNetV2: 85% validation accuracy), with better generalization and efficiency.
  - Concluded that while scratch models are valuable for learning purposes, transfer learning is preferable for real-world deployment.

  **Technologies & Skills**
  - Frameworks: TensorFlow, PyTorch, Flask
  - Techniques: Transfer Learning, CNN, Data Augmentation, Model Optimization, TFLite conversion, ONNX interoperability
  - Platforms: Web, Android/iOS
    `
  },
{
  id: 'project-digital-twin',
  title: 'Digital Twin Music Concert using Metahuman Unreal Engine 5',
  category: 'projects',
  language: 'en',
  lastUpdated: new Date('2024-12-01'),
  tags: [
    'digital twin', 'virtual concert', 'metaverse', 'metahuman', 'unreal engine 5',
    'motion capture', 'face recognition', '3d modeling', 'clothing simulation'
  ],
  content: `
  This research focuses on the design and development of photorealistic musician avatars for virtual concerts using Unreal Engine 5's Metahuman technology. The avatars integrate advanced motion capture, facial tracking, and clothing simulation to deliver an immersive concert experience in the metaverse.

  **Objective**
  To create high-fidelity digital twins of musicians capable of realistic facial expressions, body movements, and clothing dynamics, maintaining at least 30 FPS at 1080p for real-time performance.

  **Methodology**
  - **3D Face Creation**: HyperHuman AI for high-quality meshes from images; Polycam photogrammetry for detailed multi-angle scans.
  - **Facial Motion Capture**: Live Link Face (TrueDepth camera) integrated with Metahuman Animator for accurate lip sync and microexpressions.
  - **Body Motion Capture**: Move AI, DeepMotion, and Rokoko Vision for markerless skeletal tracking, retargeted to Metahuman skeleton.
  - **Clothing Simulation**: Marvelous Designer for garment design; Alembic Cache for static clothes, Chaos Cloth Physics for dynamic interaction.
  - **Integration**: Unreal Engine 5 with Sequencer for choreography, lighting, and synchronized animation timelines.

  **Hardware & Tools**
  - Acer Nitro AN51558 (Intel i9-13900H, RTX 3060, 16GB DDR5)
  - iPhone 15 Pro (LiDAR, 48MP camera) & iPhone SE 2020
  - Blender for mesh cleanup
  - Unreal Engine Marketplace assets for optimization

  **Results**
  - Achieved photorealistic avatars with convincing facial and body motion.
  - Clothing simulation balanced visual realism and performance.
  - Performance testing: 42–50 FPS on high-end PC; above 30 FPS in most scenarios.
  - Validation of Face Landmarker Link 02 vs MediaPipe showed high consistency in eye tracking (4.2% difference) and moderate consistency in mouth tracking (14% difference).
  - Demonstrated potential for NFT-based ticketing, virtual merchandise, and interactive metaverse concerts.

  **Key Contributions**
  - Modular framework for extending avatars to other performers.
  - Optimized performance using Level of Detail (LOD), texture streaming, and occlusion culling.
  - Provides a validated pipeline for high-fidelity avatar creation in the entertainment metaverse.
    `
  }
  ];