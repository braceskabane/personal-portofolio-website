// ================================
// src/components/sections/ContactSection/ContactSection.tsx
// ================================

'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, ExternalLink, Download } from 'lucide-react';
import { Button, Card, Input } from '@/components/ui';
import { useIntersectionObserver } from '@/hooks';
import { ContactValidationService } from '@/services';
import type { ContactSectionProps } from './ContactSection.types';
import type { ContactForm } from '@/types';

export const ContactSection: React.FC<ContactSectionProps> = ({
  personalInfo,
  onSubmitContact,
  loading = false
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true
  });

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
  const [submitMessage, setSubmitMessage] = useState('');

  const validationService = new ContactValidationService();

  // Handle form field changes
  const handleFieldChange = (field: keyof ContactForm, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    const fieldError = validationService.validateField(field, value);
    setValidationErrors(prev => ({
      ...prev,
      [field]: fieldError || ''
    }));

    // Clear submit status on form change
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const validation = validationService.validate(contactForm);
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const success = await onSubmitContact(contactForm);
      
      if (success) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you for your message! I\'ll get back to you soon.');
        
        // Reset form
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
        setSubmitMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: personalInfo?.social?.github,
      icon: Github,
      color: 'hover:bg-gray-700'
    },
    {
      name: 'LinkedIn',
      url: personalInfo?.social?.linkedin,
      icon: Linkedin,
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Twitter',
      url: personalInfo?.social?.twitter,
      icon: Twitter,
      color: 'hover:bg-blue-500'
    }
  ].filter(link => link.url);

  return (
    <section id="contact" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear from you. Send me a message and let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Contact Information */}
            <div className={`transition-all duration-1000 delay-200 ${
              isIntersecting ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <Card variant="elevated" padding="large" className="h-fit">
                <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  {/* Email */}
                  {personalInfo?.email && (
                    <div className="flex items-center space-x-4 group">
                      <div className="p-3 bg-cyan-500/10 rounded-full group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
                        <Mail className="text-cyan-400" size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-white font-semibold">Email</h4>
                        <a
                          href={`mailto:${personalInfo.email}`}
                          className="text-gray-400 hover:text-cyan-400 transition-colors break-all"
                        >
                          {personalInfo.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Phone */}
                  {personalInfo?.phone && (
                    <div className="flex items-center space-x-4 group">
                      <div className="p-3 bg-purple-500/10 rounded-full group-hover:bg-purple-500/20 transition-colors flex-shrink-0">
                        <Phone className="text-purple-400" size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-white font-semibold">Phone</h4>
                        <a
                          href={`tel:${personalInfo.phone}`}
                          className="text-gray-400 hover:text-purple-400 transition-colors"
                        >
                          {personalInfo.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {personalInfo?.location && (
                    <div className="flex items-center space-x-4 group">
                      <div className="p-3 bg-pink-500/10 rounded-full group-hover:bg-pink-500/20 transition-colors flex-shrink-0">
                        <MapPin className="text-pink-400" size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-white font-semibold">Location</h4>
                        <p className="text-gray-400">{personalInfo.location}</p>
                      </div>
                    </div>
                  )}

                  {/* Website */}
                  {personalInfo?.website && (
                    <div className="flex items-center space-x-4 group">
                      <div className="p-3 bg-green-500/10 rounded-full group-hover:bg-green-500/20 transition-colors flex-shrink-0">
                        <ExternalLink className="text-green-400" size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-white font-semibold">Website</h4>
                        <a
                          href={personalInfo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-green-400 transition-colors break-all"
                        >
                          {personalInfo.website.replace('https://', '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                {socialLinks.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <h4 className="text-white font-semibold mb-4">Follow Me</h4>
                    <div className="flex flex-wrap gap-4">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 bg-gray-800 rounded-full ${social.color} transition-all duration-300 hover:scale-110 group`}
                          title={social.name}
                        >
                          <social.icon className="text-gray-400 group-hover:text-white" size={20} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Availability Status */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                    <span className="text-green-400 font-semibold">Available for new projects</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    I'm currently accepting new freelance projects and full-time opportunities.
                  </p>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className={`transition-all duration-1000 delay-400 ${
              isIntersecting ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              <Card variant="elevated" padding="large">
                <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                
                <div className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="min-w-0">
                      <Input
                        label="Name *"
                        value={contactForm.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        error={validationErrors.name}
                        placeholder="Your full name"
                        className="w-full"
                      />
                    </div>
                    <div className="min-w-0">
                      <Input
                        label="Email *"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        error={validationErrors.email}
                        placeholder="your.email@example.com"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="min-w-0">
                      <Input
                        label="Phone"
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        error={validationErrors.phone}
                        placeholder="+1 (555) 123-4567"
                        className="w-full"
                      />
                    </div>
                    <div className="min-w-0">
                      <Input
                        label="Company"
                        value={contactForm.company}
                        onChange={(e) => handleFieldChange('company', e.target.value)}
                        error={validationErrors.company}
                        placeholder="Your company (optional)"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="w-full">
                    <Input
                      label="Subject"
                      value={contactForm.subject}
                      onChange={(e) => handleFieldChange('subject', e.target.value)}
                      error={validationErrors.subject}
                      placeholder="What's this about?"
                      className="w-full"
                    />
                  </div>

                  {/* Message */}
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      placeholder="Tell me about your project, ideas, or just say hello..."
                    />
                    {validationErrors.message && (
                      <p className="mt-1 text-sm text-red-500">{validationErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="w-full">
                    <Button
                      variant="primary"
                      size="large"
                      fullWidth
                      loading={isSubmitting}
                      onClick={handleSubmit}
                      icon={<Send size={20} />}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </Button>
                  </div>

                  {/* Submit Status */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 text-sm flex items-center gap-2">
                        ✅ {submitMessage}
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm flex items-center gap-2">
                        ❌ {submitMessage}
                      </p>
                    </div>
                  )}

                  {/* Form Info */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      I typically respond within 24 hours. All information is kept confidential.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Additional Call to Actions */}
          <div className={`mt-16 transition-all duration-1000 delay-600 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Download Resume */}
              <Card variant="glass" padding="large" className="text-center">
                <h3 className="text-xl font-bold text-white mb-4">Download My Resume</h3>
                <p className="text-gray-400 mb-6">
                  Get a detailed overview of my experience, skills, and achievements.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (personalInfo?.resume) {
                      window.open(personalInfo.resume, '_blank');
                    }
                  }}
                  className="flex items-center gap-2 mx-auto"
                >
                  <Download size={18} />
                  Download CV
                </Button>
              </Card>

              {/* Schedule Meeting */}
              <Card variant="glass" padding="large" className="text-center">
                <h3 className="text-xl font-bold text-white mb-4">Schedule a Call</h3>
                <p className="text-gray-400 mb-6">
                  Prefer to talk? Let's schedule a video call to discuss your project.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => window.open('https://calendly.com/johndoe', '_blank')}
                  className="flex items-center gap-2 mx-auto"
                >
                  <ExternalLink size={18} />
                  Schedule Call
                </Button>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className={`mt-16 transition-all duration-1000 delay-800 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <Card variant="default" padding="large">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                Frequently Asked Questions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                    What's your typical response time?
                  </h4>
                  <p className="text-gray-400 text-sm">
                    I usually respond to messages within 24 hours during business days.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                    Do you work with international clients?
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Yes! I work with clients worldwide and am comfortable with different time zones.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                    What's your preferred project size?
                  </h4>
                  <p className="text-gray-400 text-sm">
                    I work on projects of all sizes, from small features to full-scale applications.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                    Are you available for long-term projects?
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Absolutely! I'm open to both short-term projects and long-term partnerships.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};