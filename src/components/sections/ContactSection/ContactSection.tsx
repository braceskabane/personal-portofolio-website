// ================================
// src/components/sections/ContactSection/ContactSection.tsx - Fixed Form Layout
// ================================

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, ExternalLink, 
  Download, Globe, CheckCircle, AlertCircle, Clock, Users 
} from 'lucide-react';
import { Button, Card, Input } from '@/components/ui';
import { CountrySelect } from '@/components/ui/CountrySelect';
import { useIntersectionObserver } from '@/hooks';
import { ContactValidationService } from '@/services';
import type { ContactSectionProps } from './ContactSection.types';
import type { ContactForm } from '@/types';
import type { ContactFormData } from '@/services/api/contactService';
import { contactService } from '@/services/api/contactService';

export const ContactSection: React.FC<ContactSectionProps> = ({
  personalInfo,
  onSubmitContact,
  loading = false
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true
  });

  // Enhanced form state with country support
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    company: '',
    country: 'ID'
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

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
      name: 'Instagram',
      url: 'https://instagram.com/braceskabane',
      icon: Instagram,
      color: 'hover:bg-pink-500'
    }
  ].filter(link => link.url);

  const validationService = new ContactValidationService();

  // Auto-detect country from phone number
  useEffect(() => {
    if (contactForm.phone && !contactForm.country) {
      const detectedCountry = validationService.detectCountryFromPhone(contactForm.phone);
      if (detectedCountry) {
        setContactForm(prev => ({ ...prev, country: detectedCountry.code }));
      }
    }
  }, [contactForm.phone]);

  // Handle form field changes with enhanced validation
  const handleFieldChange = (field: keyof ContactForm, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation with country context
    const fieldError = validationService.validateField(field, value, contactForm.country);
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

  // Handle country change
  const handleCountryChange = (countryCode: string) => {
    setContactForm(prev => ({ ...prev, country: countryCode }));
    
    // Re-validate phone number with new country
    if (contactForm.phone) {
      const phoneError = validationService.validateField('phone', contactForm.phone, countryCode);
      setValidationErrors(prev => ({
        ...prev,
        phone: phoneError || ''
      }));
    }
  };

  // Enhanced form submission
  // Submit contact form to backend API
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');
  
    try {
      // Comprehensive validation
      const validation = validationService.validate(contactForm);
      
      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        setSubmitStatus('error');
        setSubmitMessage('Please fix the validation errors and try again.');
        return;
      }
  
      // Clear validation errors
      setValidationErrors({});
  
      // Submit to backend API
      const contactData: ContactFormData = {
        name: contactForm.name,
        email: contactForm.email,
        subject: contactForm.subject ?? '',
        message: contactForm.message,
        phone: contactForm.phone ?? '',
        company: contactForm.company ?? '',
        country: contactForm.country ?? ''
      };
      
      const contact = await contactService.submitContact(contactData);      
      
      // Success handling
      setSubmitStatus('success');
      const country = validationService.getCountryByCode(contactForm.country || '');
      setSubmitMessage(
        `Thank you for your message! I'll get back to you soon. ${
          country ? `Greetings from ${country.flag} ${country.name}!` : ''
        }`
      );
      
      // Reset form
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        phone: '',
        company: '',
        country: 'ID'
      });
      setValidationErrors({});
  
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get phone placeholder based on selected country
  const phonePlaceholder = validationService.getPhonePlaceholder(contactForm.country);

  return (
    <section id="contact" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Enhanced Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Ready to bring your ideas to life? I work with clients globally and would love to discuss your project.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Globe size={16} className="text-cyan-400" />
              <span>Global Collaboration</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-purple-400" />
              <span>24h Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={16} className="text-pink-400" />
              <span>1+ Happy Clients</span>
            </div>
          </div>
        </div>

        {/* Fixed Container with proper max-width */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Contact Information - Keep existing */}
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

            {/* Fixed Contact Form */}
            <div className={`transition-all duration-1000 delay-400 ${
              isIntersecting ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              <Card variant="elevated" padding="large">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Send className="mr-3 text-purple-400" size={24} />
                  Send a Message
                </h3>
                
                <div className="space-y-6">
                  {/* Fixed Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full">
                      <Input
                        label="Name *"
                        value={contactForm.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        error={validationErrors.name}
                        placeholder="Your full name"
                        disabled={isSubmitting || loading}
                        fullWidth
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        label="Email *"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        error={validationErrors.email}
                        placeholder="your.email@example.com"
                        disabled={isSubmitting || loading}
                        fullWidth
                      />
                    </div>
                  </div>

                  {/* Fixed Country & Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full">
                      <CountrySelect
                        value={contactForm.country}
                        onChange={handleCountryChange}
                        error={validationErrors.country}
                        disabled={isSubmitting || loading}
                        placeholder="Select your country"
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        label="Phone Number"
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        error={validationErrors.phone}
                        placeholder={phonePlaceholder}
                        disabled={isSubmitting || loading}
                        fullWidth
                      />
                    </div>
                  </div>

                  {/* Fixed Company & Subject Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full">
                      <Input
                        label="Company"
                        value={contactForm.company}
                        onChange={(e) => handleFieldChange('company', e.target.value)}
                        error={validationErrors.company}
                        placeholder="Your company (optional)"
                        disabled={isSubmitting || loading}
                        fullWidth
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        label="Subject"
                        value={contactForm.subject}
                        onChange={(e) => handleFieldChange('subject', e.target.value)}
                        error={validationErrors.subject}
                        placeholder="What's this about?"
                        disabled={isSubmitting || loading}
                        fullWidth
                      />
                    </div>
                  </div>

                  {/* Message - Fixed width */}
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors resize-none disabled:opacity-50"
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                      disabled={isSubmitting || loading}
                    />
                    {validationErrors.message && (
                      <p className="mt-1 text-sm text-red-500">{validationErrors.message}</p>
                    )}
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>Be as detailed as possible for better assistance</span>
                      <span>{contactForm.message.length}/1000</span>
                    </div>
                  </div>

                  {/* Submit Button - Fixed width */}
                  <div className="w-full">
                    <Button
                      variant="primary"
                      size="large"
                      fullWidth
                      loading={isSubmitting || loading}
                      onClick={handleSubmit}
                      icon={<Send size={20} />}
                      disabled={isSubmitting || loading}
                    >
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </Button>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="flex items-start space-x-3 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="text-green-400 font-medium">Message sent successfully!</p>
                        <p className="text-green-300 text-sm mt-1">{submitMessage}</p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-start space-x-3 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="text-red-400 font-medium">Failed to send message</p>
                        <p className="text-red-300 text-sm mt-1">{submitMessage}</p>
                      </div>
                    </div>
                  )}

                  {/* Form Info */}
                  <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-400">
                      <div className="flex items-center space-x-2">
                        <CheckCircle size={14} className="text-green-400" />
                        <span>SSL encrypted & secure</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={14} className="text-blue-400" />
                        <span>24h response guarantee</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe size={14} className="text-purple-400" />
                        <span>International clients welcome</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users size={14} className="text-cyan-400" />
                        <span>Confidentiality assured</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};