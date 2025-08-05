// ================================
// SIMPLIFIED INTEGRATION - Menggunakan ChatBot Component yang Ada
// ================================

// ================================
// STEP 1: Buat Simple Utility (Sama seperti sebelumnya)
// File: src/utils/portfolioChatUtils.ts
// ================================

import type { ChatContextData } from '@/components/common/ChatBot/ChatBot.types';

export class PortfolioChatUtils {
  static buildChatContext(portfolioData: {
    personalInfo?: any;
    skills?: any[];
    projects?: any[];
    experience?: any[];
  }): ChatContextData {
    const { personalInfo, skills = [], projects = [], experience = [] } = portfolioData;

    return {
      name: personalInfo?.name || "Muhammad Daffa' Fisabilillah",
      title: personalInfo?.title || "Mobile Application Developer & Android Specialist",
      experience: this.buildExperienceText(personalInfo, experience),
      skills: this.buildSkillsList(skills),
      projects: this.buildProjectsList(projects),
      contact: this.buildContactInfo(personalInfo),
      background: personalInfo?.description || "Mobile Application Developer with strong foundations in Android development, machine learning integration, and real-time computer vision."
    };
  }

  private static buildExperienceText(personalInfo: any, experience: any[]): string {
    if (personalInfo?.description) return personalInfo.description;

    if (experience.length > 0) {
      const companies = experience.map(exp => exp?.company).filter(Boolean).slice(0, 3);
      return `${experience.length}+ years of professional experience. Worked at ${companies.join(', ')}. Specialized in full-stack development and modern web technologies.`;
    }

    return "5+ years of experience in full-stack development, specializing in React, Next.js, TypeScript, and modern web technologies.";
  }

  private static buildSkillsList(skills: any[]): string[] {
    if (skills.length === 0) {
      return ["React.js", "Next.js", "TypeScript", "Node.js", "Python", "AWS", "Docker", "PostgreSQL"];
    }

    return skills.map(skill => {
      if (typeof skill === 'string') return skill;
      return skill?.name || skill?.title || 'Unknown Skill';
    }).slice(0, 16);
  }

  private static buildProjectsList(projects: any[]): string[] {
    if (projects.length === 0) {
      return [
        "E-Commerce Platform: Full-stack solution serving 10K+ users",
        "AI Analytics Dashboard: Real-time platform with ML insights",
        "Mobile Banking App: Secure application with 50K+ downloads"
      ];
    }

    return projects.map(project => {
      const name = project?.title || project?.name || 'Project';
      const desc = project?.description || 'Full-stack application';
      return `${name}: ${desc}`;
    }).slice(0, 8);
  }

  private static buildContactInfo(personalInfo: any): string {
    const parts = [];
    if (personalInfo?.email) parts.push(`Email: ${personalInfo.email}`);
    if (personalInfo?.phone) parts.push(`Phone: ${personalInfo.phone}`);
    if (personalInfo?.location) parts.push(`Location: ${personalInfo.location}`);
    
    return parts.length > 0 
      ? parts.join(', ')
      : "Email: mydaffa2003@gmail.com, Location: Surabaya, Indonesia";
  }
}