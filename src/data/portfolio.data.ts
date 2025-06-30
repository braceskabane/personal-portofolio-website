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
  }
  
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
  Muhammad Daffa' Fisabilillah adalah seorang Senior Full Stack Developer dengan passion yang mendalam untuk menciptakan solusi teknologi yang meaningful. 
  
  LATAR BELAKANG:
  - Lahir dan besar di Jakarta, Indonesia
  - Lulus dari Universitas Indonesia jurusan Teknik Informatika (2018)
  - Memulai karir sebagai Junior Developer di startup lokal
  - Pindah ke San Francisco pada 2020 untuk bergabung dengan tech company
  - Saat ini bekerja sebagai Senior Developer dan memimpin tim engineering
  
  FILOSOFI KERJA:
  "Code is poetry in motion. Every line should tell a story, solve a problem, and create value."
  
  PERSONAL INTERESTS:
  - Open source contributor dengan 50+ repositories
  - Tech blogger dengan 10K+ followers
  - Mentor di coding bootcamp untuk underprivileged communities
  - Passionate tentang AI/ML dan sustainable technology
  
  ACHIEVEMENTS:
  - Led development of platform yang digunakan 1M+ users
  - Speaking di 5+ international tech conferences
  - Winner of "Developer of the Year" award di perusahaan terakhir
  - Published 15+ technical articles di Medium dan Dev.to
  
  CURRENT FOCUS:
  Saat ini fokus pada AI integration, cloud architecture, dan mentoring next generation developers.
      `
    },
    
    {
      id: 'bio-id',
      title: 'Biografi Profesional',
      category: 'personal',
      language: 'id',
      lastUpdated: new Date('2024-12-01'),
      tags: ['biografi', 'latar belakang', 'cerita'],
      content: `
  Muhammad Daffa' Fisabilillah adalah seorang Senior Full Stack Developer dengan passion yang mendalam untuk menciptakan solusi teknologi yang bermakna.
  
  LATAR BELAKANG:
  - Lahir dan besar di Jakarta, Indonesia
  - Lulus dari Universitas Indonesia jurusan Teknik Informatika (2018)
  - Memulai karir sebagai Junior Developer di startup lokal
  - Pindah ke San Francisco pada 2020 untuk bergabung dengan tech company
  - Saat ini bekerja sebagai Senior Developer dan memimpin tim engineering
  
  FILOSOFI KERJA:
  "Kode adalah puisi dalam gerakan. Setiap baris harus menceritakan kisah, memecahkan masalah, dan menciptakan nilai."
  
  MINAT PRIBADI:
  - Kontributor open source dengan 50+ repositories
  - Tech blogger dengan 10K+ followers  
  - Mentor di coding bootcamp untuk komunitas kurang mampu
  - Passionate tentang AI/ML dan teknologi berkelanjutan
  
  PENCAPAIAN:
  - Memimpin pengembangan platform yang digunakan 1M+ users
  - Speaker di 5+ konferensi teknologi internasional
  - Pemenang penghargaan "Developer of the Year" di perusahaan terakhir
  - Menerbitkan 15+ artikel teknis di Medium dan Dev.to
  
  FOKUS SAAT INI:
  Saat ini fokus pada integrasi AI, arsitektur cloud, dan mentoring generasi developer berikutnya.
      `
    },
  
    {
      id: 'detailed-experience',
      title: 'Detailed Work Experience',
      category: 'experience',
      language: 'en',
      lastUpdated: new Date('2024-12-01'),
      tags: ['work', 'experience', 'career', 'achievements'],
      content: `
  TECH INNOVATORS INC. (2022 - Present)
  Position: Senior Full Stack Developer
  Location: San Francisco, CA
  Team Size: 15 engineers
  
  Key Responsibilities:
  - Lead architecture decisions for microservices handling 1M+ daily requests
  - Mentor 6 junior developers through code reviews and pair programming
  - Implement CI/CD pipelines reducing deployment time from 2 hours to 15 minutes
  - Design and build real-time analytics dashboard using React, D3.js, and WebSocket
  - Collaborate with product team to translate business requirements into technical solutions
  
  Major Projects:
  1. E-Commerce Platform Redesign
     - Technologies: Next.js, TypeScript, PostgreSQL, Redis
     - Impact: Increased conversion rate by 35%, reduced page load time by 40%
     - Users: 50K+ monthly active users
     
  2. AI-Powered Recommendation Engine
     - Technologies: Python, TensorFlow, FastAPI, Docker
     - Impact: Improved user engagement by 28%
     - Data: Processing 100K+ user interactions daily
  
  3. Mobile API Gateway
     - Technologies: Node.js, Express, MongoDB, AWS Lambda
     - Impact: Unified 12 different APIs into single gateway
     - Performance: 99.9% uptime, <200ms response time
  
  Technical Leadership:
  - Established coding standards and best practices adopted company-wide
  - Led migration from monolith to microservices architecture
  - Implemented automated testing increasing code coverage from 60% to 95%
  - Introduced GraphQL reducing API calls by 50%
  
  DIGITAL SOLUTIONS CO. (2020 - 2022)
  Position: Frontend Developer
  Location: New York, NY
  
  Key Projects:
  - Built 15+ production React applications
  - Implemented design system used across 8 different products
  - Led accessibility compliance initiative achieving WCAG 2.1 AA standards
  - Optimized bundle sizes reducing initial load time by 30%
  
  STARTUP HUB (2019 - 2020)
  Position: Junior Developer
  Location: Jakarta, Indonesia
  
  Learning Journey:
  - Mastered fundamental web technologies (HTML, CSS, JavaScript)
  - Built first production application serving 1K+ users
  - Contributed to open source projects gaining 500+ GitHub stars
  - Completed 50+ client projects with 98% satisfaction rate
      `
    },
  
    {
      id: 'technical-skills-detailed',
      title: 'Comprehensive Technical Skills',
      category: 'skills',
      language: 'en',
      lastUpdated: new Date('2024-12-01'),
      tags: ['skills', 'technology', 'expertise', 'proficiency'],
      content: `
  FRONTEND TECHNOLOGIES:
  • React.js (95% proficiency, 5 years experience)
    - Advanced patterns: Hooks, Context, Suspense, Concurrent Features
    - State management: Redux, Zustand, React Query
    - Testing: Jest, React Testing Library, Cypress
    - Performance: Code splitting, lazy loading, memoization
  
  • Next.js (90% proficiency, 3 years experience)
    - App Router, Server Components, Static Generation
    - SEO optimization, performance monitoring
    - Deployment on Vercel, custom server configurations
  
  • TypeScript (92% proficiency, 4 years experience)
    - Advanced types, generics, utility types
    - Type-driven development, strict configuration
    - Integration with React, Node.js, and databases
  
  • Vue.js (85% proficiency, 2 years experience)
    - Composition API, Pinia state management
    - Nuxt.js for SSR applications
  
  BACKEND TECHNOLOGIES:
  • Node.js (88% proficiency, 4 years experience)
    - Express.js, Fastify, NestJS frameworks
    - RESTful APIs, GraphQL, WebSocket real-time communication
    - Authentication: JWT, OAuth, Passport.js
  
  • Python (82% proficiency, 3 years experience)
    - FastAPI, Django, Flask frameworks
    - Data analysis: Pandas, NumPy, Matplotlib
    - Machine Learning: TensorFlow, scikit-learn
  
  • Databases (85% average proficiency)
    - PostgreSQL: Complex queries, performance optimization, migrations
    - MongoDB: Aggregation pipelines, indexing strategies
    - Redis: Caching, session management, pub/sub
    - Prisma, TypeORM for database management
  
  CLOUD & DEVOPS:
  • AWS (82% proficiency, 3 years experience)
    - EC2, S3, Lambda, RDS, CloudFront
    - Infrastructure as Code: CloudFormation, CDK
    - Monitoring: CloudWatch, X-Ray
  
  • Docker & Kubernetes (85% proficiency)
    - Container orchestration, scaling strategies
    - Helm charts, service mesh (Istio)
  
  • CI/CD (80% proficiency)
    - GitHub Actions, GitLab CI, Jenkins
    - Automated testing, deployment pipelines
    - Infrastructure monitoring and alerting
  
  ADDITIONAL SKILLS:
  • GraphQL: Schema design, Apollo Server/Client, Federation
  • Testing: Unit testing (95%), Integration testing (90%), E2E testing (85%)
  • Security: OWASP best practices, penetration testing basics
  • Performance: Web Vitals optimization, bundle analysis, CDN configuration
  • Design: Figma, basic UI/UX principles, responsive design
      `
    },
  
    {
      id: 'projects-detailed',
      title: 'Detailed Project Portfolio',
      category: 'projects',
      language: 'en',
      lastUpdated: new Date('2024-12-01'),
      tags: ['projects', 'portfolio', 'achievements', 'impact'],
      content: `
  PROJECT 1: NEXTGEN E-COMMERCE PLATFORM
  Timeline: Jan 2023 - Aug 2023 (8 months)
  Role: Tech Lead & Senior Developer
  Team: 8 engineers (3 frontend, 3 backend, 2 DevOps)
  
  Problem Statement:
  Legacy e-commerce platform with 40% cart abandonment rate, 5-second page load times, and limited mobile experience.
  
  Technical Solution:
  Frontend:
  - Next.js 13 with App Router for optimal SEO and performance
  - TypeScript for type safety across 50+ components
  - Tailwind CSS with custom design system
  - React Query for efficient data fetching and caching
  - Stripe integration for payment processing
  
  Backend:
  - Node.js microservices architecture (5 services)
  - PostgreSQL with optimized queries and indexing
  - Redis for session management and cart persistence
  - GraphQL Federation for unified API layer
  - Real-time inventory updates using WebSocket
  
  Infrastructure:
  - AWS ECS for container orchestration
  - CloudFront CDN for global content delivery
  - RDS Multi-AZ for database redundancy
  - ElastiCache for Redis clustering
  
  Results & Impact:
  ✅ Reduced page load time from 5s to 1.2s (76% improvement)
  ✅ Increased conversion rate from 60% to 85% (42% improvement)
  ✅ Mobile experience score improved from 65 to 92
  ✅ Handles 10K+ concurrent users during peak sales
  ✅ 99.9% uptime during Black Friday weekend
  ✅ Revenue increased by $2M annually
  
  Technical Challenges Solved:
  - Implemented progressive image loading reducing bandwidth by 60%
  - Built real-time inventory system preventing overselling
  - Created automated testing suite with 95% code coverage
  - Designed fault-tolerant payment processing
  
  PROJECT 2: AI-POWERED ANALYTICS DASHBOARD
  Timeline: Sep 2022 - Dec 2022 (4 months)
  Role: Full Stack Developer & ML Engineer
  Team: 5 engineers (2 frontend, 2 backend, 1 ML specialist)
  
  Problem Statement:
  Business stakeholders needed real-time insights from multiple data sources without technical expertise.
  
  Technical Solution:
  Frontend:
  - React 18 with Concurrent Features for smooth UX
  - D3.js for custom data visualizations
  - WebSocket for real-time data updates
  - Responsive design supporting mobile dashboards
  
  Backend:
  - Python FastAPI for ML model serving
  - TensorFlow for predictive analytics
  - Apache Kafka for real-time data streaming
  - PostgreSQL with TimescaleDB for time-series data
  
  Machine Learning:
  - Customer behavior prediction models (85% accuracy)
  - Sales forecasting using LSTM neural networks
  - Anomaly detection for fraud prevention
  - Recommendation engine using collaborative filtering
  
  Results & Impact:
  ✅ Processing 1M+ data points daily
  ✅ Real-time dashboard updates under 500ms
  ✅ Improved business decision speed by 3x
  ✅ Detected $500K in potential fraud annually
  ✅ Increased user engagement by 28%
  
  PROJECT 3: SECURE MOBILE BANKING APPLICATION
  Timeline: Mar 2021 - Oct 2021 (8 months)
  Role: Senior Mobile Developer
  Team: 12 engineers (4 mobile, 4 backend, 2 security, 2 QA)
  
  Problem Statement:
  Traditional banking needed modern mobile experience while maintaining highest security standards.
  
  Technical Solution:
  Mobile App:
  - React Native for cross-platform development
  - Biometric authentication (fingerprint, Face ID)
  - End-to-end encryption for all transactions
  - Offline capability for account viewing
  
  Backend:
  - Node.js with Express for API layer
  - MongoDB for user data and transaction history
  - JWT with refresh token rotation
  - Rate limiting and fraud detection
  
  Security:
  - OWASP compliance and penetration testing
  - Certificate pinning for API communication
  - Multi-factor authentication
  - PCI DSS Level 1 compliance
  
  Results & Impact:
  ✅ 50K+ downloads in first 6 months
  ✅ 4.8★ rating on App Store and Google Play
  ✅ Zero security incidents since launch
  ✅ 40% reduction in customer service calls
  ✅ $10M+ in mobile transactions monthly
  
  PROJECT 4: REAL-TIME COLLABORATION PLATFORM
  Timeline: Jan 2022 - Jun 2022 (6 months)
  Role: Full Stack Developer
  Team: 6 engineers
  
  Technical Highlights:
  - Real-time collaborative editing using Operational Transformation
  - WebRTC for peer-to-peer video calls
  - Redis Pub/Sub for instant messaging
  - Conflict resolution algorithms for simultaneous editing
  
  Results:
  ✅ 5K+ teams using platform daily
  ✅ 99.5% uptime with sub-100ms latency
  ✅ Supports 50+ concurrent collaborators per document
      `
    },
  
    {
      id: 'personal-values',
      title: 'Personal Values & Work Philosophy',
      category: 'personal',
      language: 'en',
      lastUpdated: new Date('2024-12-01'),
      tags: ['values', 'philosophy', 'culture', 'leadership'],
      content: `
  CORE VALUES:
  
  1. CONTINUOUS LEARNING
  "Technology evolves rapidly, and so must we."
  - Dedicated 10+ hours weekly to learning new technologies
  - Completed 25+ online courses and certifications
  - Regular attendee of tech conferences and workshops
  - Belief that stagnation is the enemy of innovation
  
  2. COLLABORATIVE EXCELLENCE
  "Great software is built by great teams, not great individuals."
  - Strong advocate for code reviews and pair programming
  - Mentored 12+ junior developers throughout career
  - Established team rituals: daily standups, retrospectives, knowledge sharing
  - Created psychologically safe environments for learning and experimentation
  
  3. USER-CENTRIC DEVELOPMENT
  "Every line of code should serve a human need."
  - Always consider user experience in technical decisions
  - Regular user research and feedback incorporation
  - Accessibility-first mindset in all projects
  - Performance optimization from user perspective, not just technical metrics
  
  4. ETHICAL TECHNOLOGY
  "With great power comes great responsibility."
  - Privacy-by-design approach in all applications
  - Transparent data handling and user consent
  - Sustainable coding practices for environmental impact
  - Inclusive technology that serves diverse communities
  
  LEADERSHIP PHILOSOPHY:
  
  "Lead by example, inspire through action."
  
  As a Senior Developer, I believe in:
  - Servant leadership: supporting team success over personal recognition
  - Technical excellence: maintaining high code quality standards
  - Knowledge sharing: documentation, mentoring, and team learning
  - Empowerment: giving team members autonomy and ownership
  - Growth mindset: treating failures as learning opportunities
  
  WORK STYLE:
  
  • Problem-Solving Approach:
    1. Understand the root problem, not just symptoms
    2. Research existing solutions and best practices
    3. Prototype and validate assumptions quickly
    4. Implement with scalability and maintainability in mind
    5. Monitor, measure, and iterate based on results
  
  • Communication Style:
    - Clear, concise technical communication
    - Visual diagrams and documentation for complex concepts
    - Regular progress updates and transparent about challenges
    - Active listening and collaborative decision-making
  
  • Time Management:
    - Deep work blocks for complex development tasks
    - Regular breaks for sustained productivity
    - Batch similar tasks (code reviews, meetings, documentation)
    - Continuous prioritization based on business impact
  
  FUTURE ASPIRATIONS:
  
  "Building technology that positively impacts millions of lives."
  
  Short-term (1-2 years):
  - Master AI/ML integration in web applications
  - Lead architectural decisions for enterprise-scale systems
  - Mentor 20+ developers through formal and informal programs
  - Contribute to major open source projects
  
  Long-term (3-5 years):
  - Start tech consultancy focusing on sustainable and ethical technology
  - Write technical book on modern full-stack development
  - Speak at 10+ international conferences
  - Build educational platform for underrepresented communities in tech
  
  GIVING BACK:
  
  • Open Source Contributions:
    - 50+ public repositories on GitHub
    - 10K+ stars across personal projects
    - Regular contributor to popular frameworks and libraries
  
  • Community Involvement:
    - Volunteer coding instructor at local nonprofits
    - Mentor at coding bootcamps for career changers
    - Organizer of monthly JavaScript meetup (100+ attendees)
    - Guest lecturer at university computer science programs
  
  • Knowledge Sharing:
    - Technical blog with 10K+ monthly readers
    - YouTube channel with coding tutorials (5K+ subscribers)
    - Regular speaker at local tech events
    - Code review volunteer for open source projects
  

    **🎭 PERSONAL INTERESTS**
    
    • **K-Drama & J-Drama Lover**
    
    * Watching K-Dramas has become more than just a hobby—it feels like a ritual of emotional cleansing. Over the past years, I've watched more than 100 Korean dramas, each one offering a piece of someone else’s world that quietly stitched itself into my own.
    * Some stories stayed with me long after the credits rolled. *My Mister* helped me process my own silences; its portrayal of loneliness was poetic, unflinching, and yet somehow healing. *Hospital Playlist* gave me warmth I didn’t know I needed—it taught me the beauty of everyday friendships.
    * I’m also deeply moved by Japanese dramas. There's a subtlety and quiet sorrow in many J-Dramas that resonates with the way I sometimes perceive the world. *1 Litre of Tears* was my first heartbreak in drama form; *Kimi no Todoke* softened me with its pure-hearted innocence.
    * I gravitate toward themes like emotional recovery, time travel, moral ambiguity, and "found family" tropes. I tend to avoid shallow plots and overly predictable romance.
    * Watching dramas, for me, is not an escape—but a way to understand life from unfamiliar angles.
    
    • **J-Pop & K-Pop Music Aesthetic**
    
    * Music is my emotional translator. It says what I often can't. I find myself immersed in the cinematic universe of J-Pop—especially when listening to artists like Aimer, YOASOBI, or RADWIMPS. Their music feels like distilled poetry wrapped in melody.
    * K-Pop offers a different, yet equally compelling experience: the artistry, the choreography, the conceptual storytelling. IU is my go-to for emotional clarity, while BTS, especially RM, offers lyrical depth wrapped in vulnerability. When I listen to NewJeans or Seventeen, I feel a burst of youth and electricity.
    * I create playlists based on feelings: heartbreak, wonder, morning haze, existential dread, quiet joy. Music scores my daily life like a personal soundtrack.
    
    • **Anime: Windows into Philosophy, Emotion, and Imagination**
    
    * Anime shaped much of my emotional vocabulary. I’ve watched over 200 titles, and each one has expanded the boundaries of my perspective—sometimes gently, sometimes violently.
    * *Monster* challenged my understanding of morality and the weight of our choices. *Your Lie in April* taught me how beauty can be wrapped in tragedy. *Mob Psycho 100* surprised me with its emotional maturity beneath the chaotic animation.
    * I'm especially fond of psychological thrillers, slow-burn character dramas, and slice-of-life narratives with existential undercurrents.
    * I also enjoy the rituals surrounding anime: following seasonal releases, reading fan theories, analyzing character arcs late at night when I should be asleep.
    * Watching anime is like sitting with a friend who isn’t afraid to show you their most honest thoughts.
    
    ---
    
    **🏃‍♂️ SPORTS & PHYSICAL WELLNESS**
    
    • **Running**
    
    * Running has become my form of meditation. The rhythm of my footsteps often helps me process complex thoughts or unwind emotionally.
    * I usually run early in the morning or just before sunset, when the air feels forgiving and the world is quieter. I listen to ambient tracks, emotional ballads, or nothing at all—just the sound of my breath.
    * My go-to gear includes the Garmin Forerunner 55 (simple yet reliable), Nike ZoomX Vaporfly Next% (lightweight and responsive), and Shokz OpenRun headphones so I can stay aware of my surroundings.
    
    • **Badminton**
    
    * I play badminton not just to move my body, but to engage my focus. The balance of power and precision, the split-second decisions—I love how it forces me to be fully present.
    * I usually play doubles with friends. I’m not a professional by any means, but I enjoy every match as if it matters.
    * I use a Yonex Astrox 99 Pro racket, Victor A970 shoes for foot support, and Li-Ning GP3000 grips that keep me grounded—literally and emotionally.
    
    • **Futsal**
    
    * Futsal reminds me that even in a fast-paced world, teamwork is everything. I usually play as a midfielder, navigating the tension between offense and defense.
    * I don’t chase goals—I create space for others to find them. That’s always been my style, on and off the field.
    * I rotate gear randomly, but I currently wear Adidas Predator Edge boots, Mizuno Sala Club 2 shoes, and a Decathlon tactical compression shirt for better movement.
    
    ---
    
    **📈 FUTURE ASPIRATIONS (HOBBY-CENTERED)**
    
    • **Short-Term (1–2 Years)**
    
    * Build a blog or platform that curates dramas, anime, and music—not by genre, but by emotion and personal growth themes.
    * Design a visual mood tracker that connects what I watch to how I feel, creating a sort of emotional library for reflection.
    * Run at least two official 5K/10K races annually to challenge my consistency and mental endurance.
    * Improve my badminton skills with structured practice or a local coach.
    * Start learning conversational Korean and Japanese to understand native media without subtitles.
    
    • **Long-Term (3–5 Years)**
    
    * Build a “Story Archive” website where I document the most meaningful narratives I’ve consumed—like a museum of fictional lives that shaped my own.
    * Launch a podcast that dives deep into themes in Asian media—especially those that connect to real emotional and societal issues.
    * Organize local or online “Watch & Reflect” groups where people can discuss stories that moved them.
    * Integrate storytelling and AI by building a bot that recommends content not just by keywords, but by emotional relevance.
    * Teach others how to use media as a self-reflective tool—especially younger audiences or people recovering from emotional trauma.
    
    ---
    
    **🤝 GIVING BACK (PASSION-DRIVEN CONTRIBUTIONS)**
    
    • **Content Sharing**
    
    * Write essays and reflections on the human themes hidden in popular or underrated dramas and anime.
    * Produce short videos that analyze character development and emotional nuance—especially in lesser-known works.
    * Curate playlists that help others process feelings they can’t explain.
    
    • **Community Involvement**
    
    * Volunteer in local creative clubs where young people discuss movies, music, or visual storytelling.
    * Mentor teens or hobbyists in building blogs, writing reviews, or producing media analysis.
    * Create a casual club that combines jogging and storytelling discussions—"Run & Reflect."
    
    • **Knowledge Contribution**
    
    * Build an open-source emotional media index, tagging shows, songs, and anime based on emotional depth rather than genre.
    * Contribute to subtitling or translation efforts for underrepresented or unlicensed media.
    * Write in-depth reviews of Japanese/Korean music and make them accessible to international audiences through niche platforms.
    
    ---
    
      `
    }
  ];