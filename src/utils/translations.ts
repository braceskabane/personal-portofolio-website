// ================================
// src/utils/translations.ts
// ================================

import { MultilingualContent, SupportedLanguage } from '@/types/language.types';

export const CHATBOT_TRANSLATIONS: MultilingualContent = {
  // Welcome messages
  'welcome': {
    en: "Hi! I'm Davis's AI assistant. I can answer questions about his experience, skills, projects, and background. What would you like to know?",
    id: "Hai! Saya asisten AI Davis. Saya bisa menjawab pertanyaan tentang pengalaman, keahlian, proyek, dan latar belakangnya. Apa yang ingin Anda ketahui?",
    es: "¡Hola! Soy el asistente de IA de Davis. Puedo responder preguntas sobre su experiencia, habilidades, proyectos y antecedentes. ¿Qué te gustaría saber?",
    fr: "Salut! Je suis l'assistant IA de Davis. Je peux répondre aux questions sur son expérience, ses compétences, ses projets et son parcours. Que souhaitez-vous savoir?",
    de: "Hallo! Ich bin Daviss KI-Assistent. Ich kann Fragen zu seiner Erfahrung, seinen Fähigkeiten, Projekten und seinem Hintergrund beantworten. Was möchten Sie wissen?",
    ja: "こんにちは！私はジョンのAIアシスタントです。彼の経験、スキル、プロジェクト、背景について質問にお答えできます。何をお知りになりたいですか？",
    ko: "안녕하세요! 저는 Davis의 AI 어시스턴트입니다. 그의 경험, 기술, 프로젝트, 배경에 대한 질문에 답할 수 있습니다. 무엇을 알고 싶으신가요?",
    zh: "你好！我是约翰的AI助手。我可以回答关于他的经验、技能、项目和背景的问题。您想了解什么？"
  },

  // Quick action - Experience
  'quickActions.experience': {
    en: "Tell me about Davis's experience",
    id: "Ceritakan tentang pengalaman Davis",
    es: "Háblame de la experiencia de Davis",
    fr: "Parlez-moi de l'expérience de Davis",
    de: "Erzählen Sie mir von Daviss Erfahrung",
    ja: "ジョンの経験について教えて",
    ko: "Davis의 경험에 대해 알려주세요",
    zh: "告诉我约翰的经验"
  },

  // Quick action - Skills
  'quickActions.skills': {
    en: "What are his main skills?",
    id: "Apa keahlian utamanya?",
    es: "¿Cuáles son sus principales habilidades?",
    fr: "Quelles sont ses principales compétences?",
    de: "Was sind seine Hauptfähigkeiten?",
    ja: "彼の主なスキルは何ですか？",
    ko: "그의 주요 기술은 무엇인가요?",
    zh: "他的主要技能是什么？"
  },

  // Quick action - Projects
  'quickActions.projects': {
    en: "Show me his projects",
    id: "Tunjukkan proyek-proyeknya",
    es: "Muéstrame sus proyectos",
    fr: "Montrez-moi ses projets",
    de: "Zeigen Sie mir seine Projekte",
    ja: "彼のプロジェクトを見せて",
    ko: "그의 프로젝트를 보여주세요",
    zh: "给我看看他的项目"
  },

  // Quick action - Contact
  'quickActions.contact': {
    en: "How can I contact him?",
    id: "Bagaimana cara menghubunginya?",
    es: "¿Cómo puedo contactarlo?",
    fr: "Comment puis-je le contacter?",
    de: "Wie kann ich ihn kontaktieren?",
    ja: "どうやって彼に連絡できますか？",
    ko: "어떻게 그에게 연락할 수 있나요?",
    zh: "我如何联系他？"
  },

  // UI title
  'ui.title': {
    en: "Davis's AI Assistant",
    id: "Asisten AI Davis",
    es: "Asistente de IA de Davis",
    fr: "Assistant IA de Davis",
    de: "Daviss KI-Assistent",
    ja: "ジョンのAIアシスタント",
    ko: "Davis의 AI 어시스턴트",
    zh: "约翰的AI助手"
  },

  // UI subtitle
  'ui.subtitle': {
    en: "Ask me anything about Davis",
    id: "Tanyakan apapun tentang Davis",
    es: "Pregúntame cualquier cosa sobre Davis",
    fr: "Demandez-moi tout sur Davis",
    de: "Fragen Sie mich alles über Davis",
    ja: "ジョンについて何でも聞いてください",
    ko: "Davis에 대해 무엇이든 물어보세요",
    zh: "询问关于约翰的任何事情"
  },

  // UI placeholder
  'ui.placeholder': {
    en: "Ask about Davis's experience, skills, projects...",
    id: "Tanyakan tentang pengalaman, keahlian, proyek Davis...",
    es: "Pregunta sobre la experiencia, habilidades, proyectos de Davis...",
    fr: "Demandez à propos de l'expérience, compétences, projets de Davis...",
    de: "Fragen Sie nach Daviss Erfahrung, Fähigkeiten, Projekten...",
    ja: "ジョンの経験、スキル、プロジェクトについて質問...",
    ko: "Davis의 경험, 기술, 프로젝트에 대해 질문...",
    zh: "询问约翰的经验、技能、项目..."
  },

  // UI thinking
  'ui.thinking': {
    en: "Thinking...",
    id: "Sedang berpikir...",
    es: "Pensando...",
    fr: "Réflexion...",
    de: "Denke nach...",
    ja: "考え中...",
    ko: "생각 중...",
    zh: "思考中..."
  },

  // UI error
  'ui.error': {
    en: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
    id: "Maaf, saya mengalami kesulitan merespons saat ini. Silakan coba lagi dalam beberapa saat.",
    es: "Me disculpo, pero tengo problemas para responder ahora. Por favor, inténtalo de nuevo en un momento.",
    fr: "Je m'excuse, mais j'ai des difficultés à répondre maintenant. Veuillez réessayer dans un moment.",
    de: "Entschuldigung, aber ich habe Probleme beim Antworten. Bitte versuchen Sie es in einem Moment erneut.",
    ja: "申し訳ありませんが、現在応答に問題があります。しばらくしてから再度お試しください。",
    ko: "죄송합니다. 현재 응답에 문제가 있습니다. 잠시 후 다시 시도해 주세요.",
    zh: "抱歉，我现在回复有困难。请稍后再试。"
  }
};

export const getTranslation = (key: string, language: SupportedLanguage): string => {
  const translation = CHATBOT_TRANSLATIONS[key];
  
  if (!translation) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  
  return translation[language] || translation['en'] || key;
};
