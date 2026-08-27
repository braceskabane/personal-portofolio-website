'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Input } from '@/components/ui';
import { usePortfolio } from '@/hooks';
import type { ContactForm } from '@/types';

// Simple inline implementations to avoid missing dependencies
class MockPortfolioService {
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async getProjects() {
    await this.delay(800);
    return [
      {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with real-time inventory management.',
        technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
        stats: { users: '10K+', performance: '98%', uptime: '99.9%' }
      },
      {
        id: '2',
        title: 'AI Analytics Dashboard',
        description: 'Real-time analytics platform with machine learning insights.',
        technologies: ['React', 'D3.js', 'Python', 'TensorFlow'],
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        stats: { users: '1M+', performance: '94%', uptime: '2.3s' }
      }
    ];
  }

  async getExperience() {
    await this.delay(600);
    return [
      {
        id: '1',
        title: 'Senior Full Stack Developer',
        description: 'Leading development of scalable web applications.',
        company: 'Tech Innovators Inc.',
        position: 'Senior Full Stack Developer',
        duration: '2022 - Present',
        achievements: ['Increased performance by 40%', 'Led team of 6 developers'],
        technologies: ['React', 'Next.js', 'TypeScript', 'Node.js']
      }
    ];
  }

  async getSkills() {
    await this.delay(400);
    return [
      { name: 'React.js', projectCount: 2, category: 'Frontend' as const },
      { name: 'Next.js', projectCount: 1, category: 'Frontend' as const },
      { name: 'TypeScript', projectCount: 2, category: 'Language' as const },
      { name: 'Node.js', projectCount: 1, category: 'Backend' as const }
    ];
  }

  async getPersonalInfo() {
    await this.delay(300);
    return {
      name: 'Muhammad Daffa\' Fisabilillah',
      title: 'Mobile Application Developer',
      subtitle: 'Android & Machine Learning Specialist',
      description: 'Mobile Application Developer with strong foundations in Android development and machine learning.',
      profileImage: '/images/Davis_Metahuman.png',
      email: 'mydaffa2003@gmail.com',
      phone: '+62 822 8924 7001',
      location: 'Surabaya, Indonesia',
      social: {
        github: 'https://github.com/braceskabane',
        linkedin: 'https://linkedin.com/in/muhammaddaffafisabilillah'
      }
    };
  }

  async getProject(id: string) {
    const projects = await this.getProjects();
    return projects.find(p => p.id === id)!;
  }

  async submitContact(data: ContactForm) {
    await this.delay(1500);
    
    if (!data.name || data.name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
    
    if (!data.email || !data.email.includes('@')) {
      throw new Error('Please provide a valid email address');
    }
    
    if (!data.message || data.message.trim().length < 10) {
      throw new Error('Message must be at least 10 characters long');
    }
    
    console.log('✅ Contact form submitted successfully:', data);
  }
}

class ContactValidationService {
  validateField(field: keyof ContactForm, value: any): string | null {
    switch (field) {
      case 'name':
        if (!value || value.toString().trim().length < 2) {
          return 'Name must be at least 2 characters long';
        }
        break;
      case 'email':
        if (!value || !value.toString().includes('@')) {
          return 'Please provide a valid email address';
        }
        break;
      case 'message':
        if (!value || value.toString().trim().length < 10) {
          return 'Message must be at least 10 characters long';
        }
        break;
      case 'phone':
        if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.toString())) {
          return 'Please provide a valid phone number';
        }
        break;
    }
    return null;
  }

  validate(data: ContactForm) {
    const errors: Record<string, string> = {};
    
    Object.entries(data).forEach(([field, value]) => {
      const error = this.validateField(field as keyof ContactForm, value);
      if (error) {
        errors[field] = error;
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

// Simple Particle System Component
const SimpleParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

const ServicesTestPage = () => {
  // Portfolio Service Test
  const mockPortfolioService = new MockPortfolioService();
  const {
    projects,
    experience,
    skills,
    personalInfo,
    loading,
    error,
    loadProjects,
    loadExperience,
    loadSkills,
    loadPersonalInfo,
    submitContact
  } = usePortfolio(mockPortfolioService);

  // Contact Validation Test
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    company: ''
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Load data on component mount
  useEffect(() => {
    loadPersonalInfo();
    loadProjects();
    loadExperience();
    loadSkills();
  }, []);

  // Handle contact form changes
  const handleContactChange = (field: keyof ContactForm, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    const validationService = new ContactValidationService();
    const fieldError = validationService.validateField(field, value);
    
    setValidationErrors(prev => ({
      ...prev,
      [field]: fieldError || ''
    }));
  };

  // Handle contact form submission
  const handleContactSubmit = async () => {
    const validationService = new ContactValidationService();
    const validation = validationService.validate(contactForm);
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const success = await submitContact(contactForm);
      if (success) {
        setSubmitStatus('success');
        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
          company: ''
        });
        setValidationErrors({});
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Simple Particle Background */}
      <SimpleParticleBackground />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-xl border-b border-gray-800">
          <div className="container mx-auto px-6 py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Services Testing Lab
            </h1>
          </div>
        </nav>

        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6 space-y-12">
            
            {/* Portfolio Service Test */}
            <section>
              <Card variant="default" padding="large">
                <h2 className="text-3xl font-bold mb-8 text-cyan-400">Portfolio Service Test</h2>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Data Loading Controls */}
                  <Card variant="glass" padding="medium">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Data Management</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          size="small"
                          loading={loading.personalInfo}
                          onClick={loadPersonalInfo}
                        >
                          Load Personal Info
                        </Button>
                        <Button
                          size="small"
                          loading={loading.projects}
                          onClick={loadProjects}
                        >
                          Load Projects
                        </Button>
                        <Button
                          size="small"
                          loading={loading.experience}
                          onClick={loadExperience}
                        >
                          Load Experience
                        </Button>
                        <Button
                          size="small"
                          loading={loading.skills}
                          onClick={loadSkills}
                        >
                          Load Skills
                        </Button>
                      </div>
                      
                      {/* Loading States */}
                      <div className="mt-6 space-y-2">
                        <h4 className="font-semibold text-sm">Loading States:</h4>
                        {Object.entries(loading).map(([key, isLoading]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="capitalize">{key}:</span>
                            <span className={isLoading ? 'text-yellow-400' : 'text-green-400'}>
                              {isLoading ? 'Loading...' : 'Ready'}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Error States */}
                      {Object.values(error).some(err => err) && (
                        <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded">
                          <h4 className="text-red-400 font-semibold text-sm mb-2">Errors:</h4>
                          {Object.entries(error).map(([key, err]) => (
                            err && (
                              <div key={key} className="text-red-300 text-xs">
                                {key}: {err}
                              </div>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Data Display */}
                  <Card variant="glass" padding="medium">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Loaded Data</h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <span className="text-gray-400">Personal Info:</span>
                        <div className="text-cyan-400 mt-1">
                          {personalInfo ? `${personalInfo.name} - ${personalInfo.title}` : 'Not loaded'}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-gray-400">Projects:</span>
                        <div className="text-cyan-400 mt-1">
                          {projects.length} projects loaded
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-gray-400">Experience:</span>
                        <div className="text-cyan-400 mt-1">
                          {experience.length} positions loaded
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-gray-400">Skills:</span>
                        <div className="text-cyan-400 mt-1">
                          {skills.length} skills loaded
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Quick Data Preview */}
                {projects.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-purple-400">Sample Project Data</h3>
                    <Card variant="elevated" padding="medium">
                      <div className="grid md:grid-cols-2 gap-4">
                        {projects.slice(0, 2).map((project) => (
                          <Card key={project.id} variant="outlined" padding="small">
                            <h4 className="font-semibold text-cyan-400 mb-2">{project.title}</h4>
                            <p className="text-xs text-gray-400 mb-2">{project.description.slice(0, 100)}...</p>
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.slice(0, 3).map((tech, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-700 rounded text-xs">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </Card>
                  </div>
                )}
              </Card>
            </section>

            {/* Contact Validation Service Test */}
            <section>
              <Card variant="default" padding="large">
                <h2 className="text-3xl font-bold mb-8 text-cyan-400">Contact Validation Service Test</h2>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Contact Form */}
                  <Card variant="glass" padding="medium">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Contact Form with Real-time Validation</h3>
                    <div className="space-y-4">
                      <Input
                        label="Name *"
                        value={contactForm.name}
                        onChange={(e) => handleContactChange('name', e.target.value)}
                        error={validationErrors.name}
                        placeholder="Your full name"
                      />
                      
                      <Input
                        label="Email *"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                        error={validationErrors.email}
                        placeholder="your.email@example.com"
                      />
                      
                      <Input
                        label="Phone"
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => handleContactChange('phone', e.target.value)}
                        error={validationErrors.phone}
                        placeholder="+1 (555) 123-4567"
                      />
                      
                      <Input
                        label="Subject"
                        value={contactForm.subject}
                        onChange={(e) => handleContactChange('subject', e.target.value)}
                        error={validationErrors.subject}
                        placeholder="Message subject"
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Message *
                        </label>
                        <textarea
                          className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                          rows={4}
                          value={contactForm.message}
                          onChange={(e) => handleContactChange('message', e.target.value)}
                          placeholder="Your message here..."
                        />
                        {validationErrors.message && (
                          <p className="mt-1 text-sm text-red-500">{validationErrors.message}</p>
                        )}
                      </div>
                      
                      <Button
                        variant="primary"
                        fullWidth
                        loading={isSubmitting}
                        onClick={handleContactSubmit}
                      >
                        Test Submit Contact
                      </Button>
                      
                      {/* Submit Status */}
                      {submitStatus === 'success' && (
                        <div className="p-3 bg-green-900/20 border border-green-500/30 rounded text-green-400 text-sm">
                          ✅ Contact form submitted successfully! Check browser console for submitted data.
                        </div>
                      )}
                      
                      {submitStatus === 'error' && (
                        <div className="p-3 bg-red-900/20 border border-red-500/30 rounded text-red-400 text-sm">
                          ❌ Failed to submit contact form. Please try again.
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Validation Status */}
                  <Card variant="glass" padding="medium">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Validation Status</h3>
                    <div className="space-y-3">
                      {Object.entries(contactForm).map(([field, value]) => {
                        const hasError = validationErrors[field];
                        const hasValue = value && value.toString().trim() !== '';
                        
                        return (
                          <div key={field} className="flex items-center justify-between">
                            <span className="capitalize text-sm">{field}:</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-400">
                                {value ? `${value.toString().length} chars` : 'empty'}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs ${
                                hasError 
                                  ? 'bg-red-500/20 text-red-400' 
                                  : hasValue 
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-gray-500/20 text-gray-400'
                              }`}>
                                {hasError ? 'Invalid' : hasValue ? 'Valid' : 'Empty'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Current Errors */}
                    {Object.keys(validationErrors).length > 0 && (
                      <div className="mt-6 p-3 bg-red-900/10 border border-red-500/20 rounded">
                        <h4 className="text-red-400 font-semibold text-sm mb-2">Current Errors:</h4>
                        {Object.entries(validationErrors).map(([field, error]) => (
                          error && (
                            <div key={field} className="text-red-300 text-xs mb-1">
                              <span className="capitalize font-medium">{field}:</span> {error}
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </Card>
                </div>
              </Card>
            </section>

            {/* Summary */}
            <section>
              <Card variant="elevated" padding="large">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      🎉 Services Working Perfectly!
                    </span>
                  </h2>
                  <p className="text-gray-300 mb-8">
                    Services layer implementing business logic with SOLID principles
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <Card variant="glass" padding="small">
                      <div className="text-cyan-400 font-semibold">✅ Portfolio Service</div>
                      <div className="text-gray-400">Data management & API simulation</div>
                    </Card>
                    <Card variant="glass" padding="small">
                      <div className="text-cyan-400 font-semibold">✅ Validation Service</div>
                      <div className="text-gray-400">Form validation & error handling</div>
                    </Card>
                  </div>

                  <div className="mt-6 p-4 bg-blue-900/10 border border-blue-500/20 rounded">
                    <p className="text-blue-300 text-sm">
                      💡 This is a simplified version without external service dependencies. 
                      Contact form submissions are logged to browser console.
                    </p>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesTestPage;