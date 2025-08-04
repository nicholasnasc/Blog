import { languages, defaultLanguage } from './config.js';

// Traduções estáticas incorporadas
const staticTranslations = {
  pt: {
    "nav": {
      "home": "Início",
      "about": "Sobre",
      "posts": "Posts",
      "projects": "Projetos"
    },
    "home": {
      "title": "Olá, sou Nicholas",
      "subtitle": "Desenvolvedor Full Stack",
      "description": "Apaixonado por tecnologia e criação de soluções inovadoras"
    }
  },
  en: {
    "nav": {
      "home": "Home",
      "about": "About",
      "posts": "Posts",
      "projects": "Projects"
    },
    "home": {
      "title": "Hello, I'm Nicholas",
      "subtitle": "Full Stack Developer",
      "description": "Passionate about technology and creating innovative solutions"
    }
  },
  es: {
    "nav": {
      "home": "Inicio",
      "about": "Acerca",
      "posts": "Publicaciones",
      "projects": "Proyectos"
    },
    "home": {
      "title": "Hola, soy Nicholas",
      "subtitle": "Desarrollador Full Stack",
      "description": "Apasionado por la tecnología y la creación de soluciones innovadoras"
    }
  },
  fr: {
    "nav": {
      "home": "Accueil",
      "about": "À propos",
      "posts": "Articles",
      "projects": "Projets"
    },
    "home": {
      "title": "Bonjour, je suis Nicholas",
      "subtitle": "Développeur Full Stack",
      "description": "Passionné par la technologie et la création de solutions innovantes"
    }
  }
};

/**
 * Obtém o idioma atual
 */
export function getCurrentLanguage() {
  if (typeof window === 'undefined') return defaultLanguage;
  
  const savedLang = localStorage.getItem('preferred-language');
  if (savedLang && Object.keys(languages).includes(savedLang)) {
    return savedLang;
  }
  
  return defaultLanguage;
}

/**
 * Função principal de tradução
 */
export async function t(key, lang = null) {
  const currentLang = lang || getCurrentLanguage();
  const translations = staticTranslations[currentLang] || staticTranslations[defaultLanguage];
  
  const keys = key.split('.');
  let value = translations;
  
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) break;
  }
  
  return value || key;
}

/**
 * Muda o idioma
 */
export function setLanguage(lang) {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('preferred-language', lang);
  window.location.reload();
}

/**
 * Hook para usar traduções
 */
export function useTranslations(lang = null) {
  const currentLang = lang || getCurrentLanguage();
  
  return {
    t: (key) => t(key, currentLang),
    currentLang,
    languages,
    setLanguage
  };
}
