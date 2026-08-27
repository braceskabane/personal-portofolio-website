// ================================
// src/hooks/useChatBot.ts (FIXED - Updated for Integration)
// ================================

"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Message,
  ChatContextData,
} from "@/components/common/ChatBot/ChatBot.types";
import {
  EnhancedGeminiService,
  type GeminiConfig,
} from "@/services/ai/geminiService";
import { SupportedLanguage } from "@/types/language.types";
import { getTranslation } from "@/utils/translations";

export interface UseMultilingualChatBotProps {
  context: ChatContextData;
  apiKey?: string;
  config?: Partial<GeminiConfig>;
  defaultLanguage?: SupportedLanguage;
  enableAutoLanguageDetection?: boolean;
}

export interface UseMultilingualChatBotReturn {
  messages: Message[];
  isLoading: boolean;
  currentLanguage: SupportedLanguage;
  sendMessage: (content: string, language?: SupportedLanguage) => Promise<void>;
  clearChat: (language?: SupportedLanguage) => void;
  changeLanguage: (language: SupportedLanguage) => void;
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
}

export const useMultilingualChatBot = ({
  context,
  apiKey,
  config = {},
  defaultLanguage = "en",
  enableAutoLanguageDetection = true,
}: UseMultilingualChatBotProps): UseMultilingualChatBotReturn => {
  const [currentLanguage, setCurrentLanguage] =
    useState<SupportedLanguage>(defaultLanguage);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const geminiServiceRef = useRef<EnhancedGeminiService | null>(null);

  // Initialize Gemini service when API key is provided
  useEffect(() => {
    if (apiKey) {
      try {
        geminiServiceRef.current = new EnhancedGeminiService({
          apiKey,
          model: process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-2.5-flash",
          temperature: 0.7,
          maxTokens: 8192,
          defaultLanguage: currentLanguage,
          debug: true,
          ...config,
        });
        console.log("✅ Gemini service initialized successfully");
      } catch (error) {
        console.error("❌ Failed to initialize Gemini service:", error);
        geminiServiceRef.current = null;
      }
    } else {
      console.warn("⚠️ No API key provided, using fallback responses");
      geminiServiceRef.current = null;
    }
  }, [apiKey, currentLanguage]);

  const generateMultilingualMockResponse = useCallback(
    async (
      userMessage: string,
      language: SupportedLanguage,
    ): Promise<string> => {
      // Simulate API delay
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 2000),
      );

      const lowerMessage = userMessage.toLowerCase();

      // Indonesian responses
      if (language === "id") {
        if (
          lowerMessage.includes("pengalaman") ||
          lowerMessage.includes("kerja") ||
          lowerMessage.includes("karir")
        ) {
          return `${context.name} memiliki ${context.experience}. Dia telah berkembang dari Junior Developer menjadi Senior Full Stack Developer, menunjukkan pertumbuhan konsisten dan kepemimpinan dalam peran teknis. Pengalamannya mencakup berbagai teknologi dan dia dikenal karena membimbing tim serta memberikan solusi yang dapat diskalakan.`;
        }

        if (
          lowerMessage.includes("keahlian") ||
          lowerMessage.includes("skill") ||
          lowerMessage.includes("teknologi")
        ) {
          return `Keahlian teknis utama ${context.name} meliputi: ${context.skills.slice(0, 6).join(", ")}. Dia sangat kuat dalam ekosistem React dengan keahlian di Next.js, TypeScript, dan praktik pengembangan web modern. Pengalaman backend-nya termasuk Node.js, Python, dan teknologi cloud seperti AWS.`;
        }

        if (
          lowerMessage.includes("proyek") ||
          lowerMessage.includes("portfolio")
        ) {
          return `${context.name} telah mengerjakan beberapa proyek yang mengesankan:\n\n${context.projects.map((project) => `• ${project}`).join("\n")}\n\nSetiap proyek menunjukkan kemampuannya untuk bekerja dengan teknologi mutakhir dan memberikan solusi yang dapat diskalakan. Apakah Anda ingin tahu detail lebih lanjut tentang proyek tertentu?`;
        }

        if (
          lowerMessage.includes("kontak") ||
          lowerMessage.includes("hubungi")
        ) {
          return `Anda dapat menghubungi ${context.name} melalui: ${context.contact}. Dia selalu terbuka untuk mendiskusikan peluang baru, kolaborasi teknis, atau menjawab pertanyaan tentang pekerjaannya.`;
        }

        if (
          lowerMessage.includes("halo") ||
          lowerMessage.includes("hai") ||
          lowerMessage.includes("selamat")
        ) {
          return `Halo! Senang bertemu dengan Anda! Saya di sini untuk membantu Anda mempelajari lebih lanjut tentang ${context.name} dan keahlian teknisnya. Silakan tanyakan tentang pengalaman, keahlian, proyek, atau hal lain yang ingin Anda ketahui!`;
        }

        return `Saya dengan senang hati membantu Anda mempelajari lebih lanjut tentang ${context.name}! Anda dapat bertanya tentang pengalaman kerja, keahlian teknis, proyek, atau informasi kontak. Apa yang ingin Anda ketahui?`;
      }

      // Spanish responses
      if (language === "es") {
        if (
          lowerMessage.includes("experiencia") ||
          lowerMessage.includes("trabajo") ||
          lowerMessage.includes("carrera")
        ) {
          return `${context.name} tiene ${context.experience}. Ha progresado desde Desarrollador Junior hasta Desarrollador Senior Full Stack, demostrando un crecimiento constante y liderazgo en roles técnicos.`;
        }

        if (
          lowerMessage.includes("habilidades") ||
          lowerMessage.includes("tecnología") ||
          lowerMessage.includes("tech")
        ) {
          return `Las principales habilidades técnicas de ${context.name} incluyen: ${context.skills.slice(0, 6).join(", ")}. Es particularmente fuerte en el ecosistema React con experiencia en Next.js, TypeScript y prácticas modernas de desarrollo web.`;
        }

        return `¡Estaré encantado de ayudarte a conocer más sobre ${context.name}! Puedes preguntarme sobre su experiencia laboral, habilidades técnicas, proyectos o información de contacto. ¿Qué te gustaría saber?`;
      }

      // Default English responses
      if (
        lowerMessage.includes("experience") ||
        lowerMessage.includes("work") ||
        lowerMessage.includes("career")
      ) {
        return `${context.name} has ${context.experience}. He has progressed from Junior Developer to Senior Full Stack Developer, demonstrating consistent growth and leadership in technical roles.`;
      }

      if (
        lowerMessage.includes("skill") ||
        lowerMessage.includes("technology") ||
        lowerMessage.includes("tech")
      ) {
        return `${context.name}'s core technical skills include: ${context.skills.slice(0, 6).join(", ")}. He's particularly strong in the React ecosystem with expertise in Next.js, TypeScript, and modern web development practices.`;
      }

      if (
        lowerMessage.includes("project") ||
        lowerMessage.includes("portfolio")
      ) {
        return `${context.name} has worked on several impressive projects:\n\n${context.projects.map((project) => `• ${project}`).join("\n")}\n\nWould you like to know more details about any specific project?`;
      }

      if (lowerMessage.includes("contact") || lowerMessage.includes("reach")) {
        return `You can contact ${context.name} through: ${context.contact}. He's always open to discussing new opportunities and technical collaborations.`;
      }

      if (
        lowerMessage.includes("hello") ||
        lowerMessage.includes("hi") ||
        lowerMessage.includes("hey")
      ) {
        return `Hello! Great to meet you! I'm here to help you learn more about ${context.name} and his technical expertise. Feel free to ask about his experience, skills, projects, or anything else!`;
      }

      return `I'd be happy to help you learn more about ${context.name}! You can ask me about his work experience, technical skills, projects, or contact information. What would you like to know?`;
    },
    [context],
  );

  const sendMessage = useCallback(
    async (content: string, messageLanguage?: SupportedLanguage) => {
      if (!content.trim() || isLoading) return;

      let detectedLanguage = messageLanguage || currentLanguage;

      // Auto-detect language if enabled and Gemini is available
      if (
        enableAutoLanguageDetection &&
        geminiServiceRef.current &&
        !messageLanguage
      ) {
        try {
          detectedLanguage = geminiServiceRef.current.detectLanguage(content);
          if (detectedLanguage !== currentLanguage) {
            console.log(
              `🔍 Language detected: ${detectedLanguage}, switching from ${currentLanguage}`,
            );
            setCurrentLanguage(detectedLanguage);
          }
        } catch (error) {
          console.warn(
            "⚠️ Language detection failed, using current language:",
            error,
          );
        }
      }

      const userMessage: Message = {
        id: Date.now().toString(),
        content: content.trim(),
        role: "user",
        timestamp: new Date(),
      };

      const loadingMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "",
        role: "assistant",
        timestamp: new Date(),
        isLoading: true,
      };

      setMessages((prev) => [...prev, userMessage, loadingMessage]);
      setIsLoading(true);

      try {
        let response: string;

        if (geminiServiceRef.current && apiKey) {
          console.log("🤖 Using Gemini AI for response...");
          // Use real Gemini API with language support
          const conversationHistory = messages
            .filter((msg) => !msg.isLoading)
            .slice(-10)
            .map((msg) => ({
              role: msg.role === "user" ? "user" : "assistant",
              content: msg.content,
            }));

          response = await geminiServiceRef.current.generateResponse(
            content,
            context,
            detectedLanguage,
            conversationHistory,
          );
          console.log("✅ Gemini response received");
        } else {
          console.log("🔄 Using fallback mock responses...");
          // Use multilingual mock responses
          response = await generateMultilingualMockResponse(
            content,
            detectedLanguage,
          );
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.isLoading
              ? { ...msg, content: response, isLoading: false }
              : msg,
          ),
        );
      } catch (error) {
        console.error("❌ Chat error:", error);
        let errorMessage: string;

        if (geminiServiceRef.current) {
          errorMessage =
            geminiServiceRef.current.getErrorMessage(detectedLanguage);
        } else {
          errorMessage = getTranslation("ui.error", detectedLanguage);
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.isLoading
              ? { ...msg, content: errorMessage, isLoading: false }
              : msg,
          ),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [
      messages,
      isLoading,
      context,
      currentLanguage,
      enableAutoLanguageDetection,
      generateMultilingualMockResponse,
      apiKey,
    ],
  );

  const clearChat = useCallback(
    (language?: SupportedLanguage) => {
      const lang = language || currentLanguage;
      setMessages([
        {
          id: "1",
          content: getTranslation("welcome", lang),
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    },
    [currentLanguage],
  );

  const changeLanguage = useCallback(
    (language: SupportedLanguage) => {
      console.log(
        `🌐 Changing language from ${currentLanguage} to ${language}`,
      );
      setCurrentLanguage(language);
      // Update welcome message
      setMessages([
        {
          id: "1",
          content: getTranslation("welcome", language),
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    },
    [currentLanguage],
  );

  const addMessage = useCallback(
    (message: Omit<Message, "id" | "timestamp">) => {
      const newMessage: Message = {
        ...message,
        id: Date.now().toString(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
    },
    [],
  );

  return {
    messages,
    isLoading,
    currentLanguage,
    sendMessage,
    clearChat,
    changeLanguage,
    addMessage,
  };
};
