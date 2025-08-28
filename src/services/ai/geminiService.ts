// ================================
// PILIHAN 1: Update services/ai/geminiService.ts (REKOMENDASI)
// Menggunakan nama yang konsisten dengan yang ada
// ================================

'use client';

import { ChatContextData } from '@/components/common/ChatBot/ChatBot.types';
import { SupportedLanguage } from '@/types/language.types';
import { DocumentService } from './documentService';

// ✅ GUNAKAN NAMA INI (konsisten dengan export di services/index.ts)
export interface GeminiConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  defaultLanguage?: SupportedLanguage;
  enableDocumentContext?: boolean;
  maxContextLength?: number;
  debug?: boolean;
}

// ✅ GUNAKAN NAMA INI (konsisten dengan export di services/index.ts)
export class EnhancedGeminiService {
  private apiKey: string;
  private model: string;
  private temperature: number;
  private maxTokens: number;
  private defaultLanguage: SupportedLanguage;
  private enableDocumentContext: boolean;
  private maxContextLength: number;
  private documentService: DocumentService;
  private debug: boolean;

  constructor(config: GeminiConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model || 'gemini-1.5-flash';
    this.temperature = config.temperature || 0.7;
    this.maxTokens = config.maxTokens || 1000;
    this.defaultLanguage = config.defaultLanguage || 'en';
    this.enableDocumentContext = config.enableDocumentContext !== false;
    this.maxContextLength = config.maxContextLength || 2000;
    this.documentService = new DocumentService();
    this.debug = config.debug || false;

    if (!this.apiKey || this.apiKey.trim() === '') {
      console.error('Gemini API key is missing or empty');
    }
  }

  async generateResponse(
    message: string, 
    context: ChatContextData,
    language: SupportedLanguage = this.defaultLanguage,
    conversationHistory: Array<{role: string, content: string}> = []
  ): Promise<string> {
    try {
      if (this.debug) {
        console.log('🔵 Gemini Request:', {
          message,
          language,
          model: this.model,
          conversationHistory: conversationHistory.length
        });
      }

      const documentContext = this.enableDocumentContext 
        ? this.documentService.getRelevantContext(message, language, this.maxContextLength)
        : '';

      if (this.debug && documentContext) {
        console.log('📄 Document Context Found:', documentContext.substring(0, 200) + '...');
      }

      const systemPrompt = this.buildEnhancedSystemPrompt(context, language, documentContext);
      const prompt = this.formatPromptWithDocuments(systemPrompt, message, language, conversationHistory);

      if (this.debug) {
        console.log('📝 Final Prompt Length:', prompt.length);
        console.log('🚀 Sending request to Gemini...');
      }

      const requestBody = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: this.temperature,
          maxOutputTokens: this.maxTokens,
          topP: 0.8,
          topK: 40
        }
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`, 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        }
      );

      if (this.debug) {
        console.log('📡 Response Status:', response.status);
      }

      if (!response.ok) {
        const errorText = await response.text();
        if (this.debug) {
          console.error('❌ Gemini API Error Response:', errorText);
        }
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: { message: errorText } };
        }

        if (response.status === 400) {
          throw new Error(`Invalid request: ${errorData.error?.message || 'Bad request'}`);
        } else if (response.status === 403) {
          throw new Error('API key invalid or insufficient permissions');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        } else {
          throw new Error(`Gemini API error (${response.status}): ${errorData.error?.message || 'Unknown error'}`);
        }
      }

      const data = await response.json();
      
      if (this.debug) {
        console.log('📦 Raw Response:', JSON.stringify(data, null, 2));
      }

      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];
        
        if (candidate.finishReason === 'SAFETY') {
          if (this.debug) {
            console.warn('⚠️ Response blocked by safety filters');
          }
          return this.getFallbackResponse(message, language, context);
        }
        
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          const responseText = candidate.content.parts[0].text;
          
          if (this.debug) {
            console.log('✅ Generated Response:', responseText.substring(0, 200) + '...');
          }
          
          return responseText.trim();
        }
      }
      
      if (this.debug) {
        console.warn('⚠️ Unexpected response format, using fallback');
      }
      
      return this.getFallbackResponse(message, language, context);
      
    } catch (error) {
      console.error('❌ Enhanced Gemini API error:', error);
      
      if (this.debug) {
        console.error('🐛 Full error details:', error);
      }
      
      return this.getFallbackResponse(message, language, context);
    }
  }

  private getFallbackResponse(message: string, language: SupportedLanguage, context: ChatContextData): string {
    const lowerMessage = message.toLowerCase();
    
    const fallbackResponses: Record<SupportedLanguage, Record<string, string>> = {
      'en': {
        experience: `${context.name} has ${context.experience}. He has worked on various projects using ${context.skills.slice(0, 3).join(', ')} and more.`,
        skills: `${context.name}'s main technical skills include: ${context.skills.slice(0, 5).join(', ')}. He specializes in full-stack development.`,
        projects: `${context.name} has worked on several projects including: ${context.projects.slice(0, 2).join(', ')}.`,
        contact: `You can reach ${context.name} at: ${context.contact}`,
        default: `I'd be happy to help you learn more about ${context.name}! You can ask about his experience, skills, projects, or contact information.`
      },
      'id': {
        experience: `${context.name} memiliki ${context.experience}. Dia telah mengerjakan berbagai proyek menggunakan ${context.skills.slice(0, 3).join(', ')} dan teknologi lainnya.`,
        skills: `Keahlian teknis utama ${context.name} meliputi: ${context.skills.slice(0, 5).join(', ')}. Dia berspesialisasi dalam pengembangan full-stack.`,
        projects: `${context.name} telah mengerjakan beberapa proyek termasuk: ${context.projects.slice(0, 2).join(', ')}.`,
        contact: `Anda dapat menghubungi ${context.name} di: ${context.contact}`,
        default: `Saya senang membantu Anda mengetahui lebih lanjut tentang ${context.name}! Anda dapat bertanya tentang pengalaman, keahlian, proyek, atau informasi kontak.`
      },
      'es': {
        experience: `${context.name} tiene ${context.experience}. Ha trabajado en varios proyectos usando ${context.skills.slice(0, 3).join(', ')} y más.`,
        skills: `Las principales habilidades técnicas de ${context.name} incluyen: ${context.skills.slice(0, 5).join(', ')}. Se especializa en desarrollo full-stack.`,
        projects: `${context.name} ha trabajado en varios proyectos incluyendo: ${context.projects.slice(0, 2).join(', ')}.`,
        contact: `Puedes contactar a ${context.name} en: ${context.contact}`,
        default: `¡Me complace ayudarte a conocer más sobre ${context.name}! Puedes preguntar sobre su experiencia, habilidades, proyectos o información de contacto.`
      },
      'fr': {
        experience: `${context.name} a ${context.experience}. Il a travaillé sur divers projets en utilisant ${context.skills.slice(0, 3).join(', ')} et plus.`,
        skills: `Les principales compétences techniques de ${context.name} incluent: ${context.skills.slice(0, 5).join(', ')}. Il se spécialise dans le développement full-stack.`,
        projects: `${context.name} a travaillé sur plusieurs projets incluant: ${context.projects.slice(0, 2).join(', ')}.`,
        contact: `Vous pouvez contacter ${context.name} à: ${context.contact}`,
        default: `Je serais ravi de vous aider à en savoir plus sur ${context.name}! Vous pouvez poser des questions sur son expérience, ses compétences, ses projets ou ses informations de contact.`
      },
      'de': {
        experience: `${context.name} hat ${context.experience}. Er hat an verschiedenen Projekten mit ${context.skills.slice(0, 3).join(', ')} und mehr gearbeitet.`,
        skills: `${context.name}s wichtigste technische Fähigkeiten umfassen: ${context.skills.slice(0, 5).join(', ')}. Er spezialisiert sich auf Full-Stack-Entwicklung.`,
        projects: `${context.name} hat an mehreren Projekten gearbeitet, einschließlich: ${context.projects.slice(0, 2).join(', ')}.`,
        contact: `Sie können ${context.name} erreichen unter: ${context.contact}`,
        default: `Ich helfe Ihnen gerne dabei, mehr über ${context.name} zu erfahren! Sie können nach seiner Erfahrung, seinen Fähigkeiten, Projekten oder Kontaktinformationen fragen.`
      },
      'ja': {
        experience: `${context.name}は${context.experience}を持っています。${context.skills.slice(0, 3).join(', ')}などを使用して様々なプロジェクトに取り組んできました。`,
        skills: `${context.name}の主な技術スキルには以下が含まれます：${context.skills.slice(0, 5).join(', ')}。フルスタック開発を専門としています。`,
        projects: `${context.name}は以下を含む複数のプロジェクトに取り組んできました：${context.projects.slice(0, 2).join(', ')}。`,
        contact: `${context.name}への連絡先：${context.contact}`,
        default: `${context.name}についてもっと知るお手伝いをします！経験、スキル、プロジェクト、または連絡先情報について質問できます。`
      },
      'ko': {
        experience: `${context.name}은 ${context.experience}을 가지고 있습니다. ${context.skills.slice(0, 3).join(', ')} 등을 사용하여 다양한 프로젝트에 참여했습니다.`,
        skills: `${context.name}의 주요 기술 스킬에는 다음이 포함됩니다: ${context.skills.slice(0, 5).join(', ')}. 풀스택 개발을 전문으로 합니다.`,
        projects: `${context.name}은 다음을 포함한 여러 프로젝트에 참여했습니다: ${context.projects.slice(0, 2).join(', ')}.`,
        contact: `${context.name}에게 연락하실 수 있습니다: ${context.contact}`,
        default: `${context.name}에 대해 더 알아보는 것을 도와드리겠습니다! 경험, 스킬, 프로젝트 또는 연락처 정보에 대해 질문하실 수 있습니다.`
      },
      'zh': {
        experience: `${context.name}拥有${context.experience}。他使用${context.skills.slice(0, 3).join(', ')}等技术参与了各种项目。`,
        skills: `${context.name}的主要技术技能包括：${context.skills.slice(0, 5).join(', ')}。他专精于全栈开发。`,
        projects: `${context.name}参与了多个项目，包括：${context.projects.slice(0, 2).join(', ')}。`,
        contact: `您可以通过以下方式联系${context.name}：${context.contact}`,
        default: `我很乐意帮助您了解更多关于${context.name}的信息！您可以询问他的经验、技能、项目或联系信息。`
      }
    };

    const responses = fallbackResponses[language] || fallbackResponses['en'];
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('pengalaman') || lowerMessage.includes('experiencia')) {
      return responses.experience;
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('keahlian') || lowerMessage.includes('habilidad')) {
      return responses.skills;
    }
    
    if (lowerMessage.includes('project') || lowerMessage.includes('proyek') || lowerMessage.includes('proyecto')) {
      return responses.projects;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('kontak') || lowerMessage.includes('contacto')) {
      return responses.contact;
    }
    
    return responses.default;
  }

  detectLanguage(text: string): SupportedLanguage {
    const lowerText = text.toLowerCase();
    
    const indonesianKeywords = [
      'saya', 'anda', 'adalah', 'dengan', 'untuk', 'dari', 'yang', 'atau', 'dan', 'ini', 'itu',
      'bagaimana', 'mengapa', 'kapan', 'dimana', 'siapa', 'apa', 'bisa', 'tidak', 'ada',
      'halo', 'selamat', 'terima kasih', 'maaf', 'keahlian', 'pengalaman', 'proyek'
    ];
    
    const spanishKeywords = [
      'hola', 'gracias', 'por favor', 'sí', 'no', 'cómo', 'qué', 'cuándo', 'dónde', 'quién',
      'experiencia', 'habilidades', 'proyecto', 'trabajo', 'tecnología', 'desarrollador'
    ];
    
    const frenchKeywords = [
      'bonjour', 'merci', 'oui', 'non', 'comment', 'quoi', 'quand', 'où', 'qui',
      'expérience', 'compétences', 'projet', 'travail', 'technologie', 'développeur'
    ];
    
    const germanKeywords = [
      'hallo', 'danke', 'ja', 'nein', 'wie', 'was', 'wann', 'wo', 'wer',
      'erfahrung', 'fähigkeiten', 'projekt', 'arbeit', 'technologie', 'entwickler'
    ];
    
    const japanesePattern = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
    const koreanPattern = /[\uAC00-\uD7AF]/;
    const chinesePattern = /[\u4E00-\u9FFF]/;
    
    const indonesianMatches = indonesianKeywords.filter(keyword => lowerText.includes(keyword)).length;
    const spanishMatches = spanishKeywords.filter(keyword => lowerText.includes(keyword)).length;
    const frenchMatches = frenchKeywords.filter(keyword => lowerText.includes(keyword)).length;
    const germanMatches = germanKeywords.filter(keyword => lowerText.includes(keyword)).length;
    
    if (japanesePattern.test(text)) return 'ja';
    if (koreanPattern.test(text)) return 'ko';
    if (chinesePattern.test(text)) return 'zh';
    
    const scores = {
      'id': indonesianMatches,
      'es': spanishMatches,
      'fr': frenchMatches,
      'de': germanMatches
    };
    
    const maxScore = Math.max(...Object.values(scores));
    
    if (maxScore > 0) {
      const detectedLang = Object.keys(scores).find(
        lang => scores[lang as keyof typeof scores] === maxScore
      ) as SupportedLanguage;
      return detectedLang;
    }
    
    return this.defaultLanguage;
  }

  getErrorMessage(language: SupportedLanguage): string {
    const errorMessages: Record<SupportedLanguage, string> = {
      'en': 'I apologize for the temporary issue. Let me help you with information about our developer.',
      'id': 'Mohon maaf atas kendala sementara. Biarkan saya membantu Anda dengan informasi tentang developer kami.',
      'es': 'Me disculpo por el problema temporal. Permíteme ayudarte con información sobre nuestro desarrollador.',
      'fr': 'Je m\'excuse pour le problème temporaire. Permettez-moi de vous aider avec des informations sur notre développeur.',
      'de': 'Entschuldigung für das vorübergehende Problem. Lassen Sie mich Ihnen mit Informationen über unseren Entwickler helfen.',
      'ja': '一時的な問題をお詫びします。開発者に関する情報でお手伝いさせてください。',
      'ko': '일시적인 문제에 대해 사과드립니다. 개발자에 대한 정보로 도움을 드리겠습니다.',
      'zh': '为临时问题道歉。让我为您提供有关我们开发者的信息。'
    };
    
    return errorMessages[language] || errorMessages['en'];
  }

  private buildEnhancedSystemPrompt(context: ChatContextData, language: SupportedLanguage, documentContext: string): string {
    const languageName = this.getLanguageName(language);
    const languageInstruction = language === 'en' 
      ? '' 
      : `IMPORTANT: You must respond ONLY in ${languageName}. Provide natural, fluent responses in ${languageName}.\n\n`;

    return `${languageInstruction}You are an AI assistant representing ${context.name}, a ${context.title}.

ENHANCED CONTEXT FROM PERSONAL DOCUMENTS:
${documentContext}

BASIC CONTEXT INFORMATION:
- Name: ${context.name}
- Title: ${context.title}
- Experience: ${context.experience}
- Key Skills: ${context.skills.join(', ')}
- Notable Projects: ${context.projects.join('; ')}
- Contact: ${context.contact}
- Background: ${context.background}

GUIDELINES:
1. Use the detailed information from personal documents to provide rich, specific answers
2. Always be helpful, professional, and enthusiastic about ${context.name}'s work
3. Provide concrete examples and specific details when available
4. If asked about something not covered in the documents, be honest about limitations
5. Encourage visitors to contact ${context.name} for opportunities or collaborations
6. Keep responses informative but conversational (2-4 sentences typically)
7. Reference specific achievements, projects, or experiences when relevant
${language === 'en' ? '' : `8. CRITICAL: Always respond in ${languageName}.`}

Remember: You have access to detailed personal documents, so provide specific, meaningful answers that showcase ${context.name}'s expertise and personality.`;
  }

  private formatPromptWithDocuments(systemPrompt: string, userMessage: string, language: SupportedLanguage, conversationHistory: Array<{role: string, content: string}>): string {
    let prompt = systemPrompt + '\n\n';
    
    if (conversationHistory.length > 0) {
      prompt += 'RECENT CONVERSATION:\n';
      conversationHistory.slice(-4).forEach(msg => {
        const role = msg.role === 'user' ? 'User' : 'Assistant';
        prompt += `${role}: ${msg.content}\n`;
      });
      prompt += '\n';
    }
    
    prompt += `User Question: ${userMessage}\n\n`;
    
    if (language !== 'en') {
      const languageName = this.getLanguageName(language);
      prompt += `Assistant (respond in ${languageName}):`;
    } else {
      prompt += 'Assistant:';
    }
    
    return prompt;
  }

  private getLanguageName(language: SupportedLanguage): string {
    const names: Record<SupportedLanguage, string> = {
      'en': 'English',
      'id': 'Indonesian (Bahasa Indonesia)',
      'es': 'Spanish (Español)',
      'fr': 'French (Français)',
      'de': 'German (Deutsch)',
      'ja': 'Japanese (日本語)',
      'ko': 'Korean (한국어)',
      'zh': 'Chinese (中文)'
    };
    return names[language];
  }

  getDocumentStats() {
    return this.documentService.getDocumentStats();
  }

  searchDocuments(query: string, language: SupportedLanguage = 'en') {
    return this.documentService.searchDocuments(query, language);
  }

  setDebugMode(enabled: boolean) {
    this.debug = enabled;
  }
}
