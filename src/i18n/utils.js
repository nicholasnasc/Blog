import { languages, defaultLanguage } from './config.js';

// Cache para traduções
const translationsCache = new Map();

/**
 * Carrega as traduções para um idioma específico
 */
async function loadTranslations(lang) {
  if (translationsCache.has(lang)) {
    return translationsCache.get(lang);
  }

  try {
    const response = await fetch(`/src/i18n/locales/${lang}.json`);
    if (!response.ok) throw new Error('Não foi possível carregar traduções');
    
    const translations = await response.json();
    translationsCache.set(lang, translations);
    return translations;
  } catch (error) {
    console.warn(`Traduções para ${lang} não encontradas, usando padrão`);
    if (lang !== defaultLanguage) {
      return await loadTranslations(defaultLanguage);
    }
    return {};
  }
}

/**
 * Obtém o idioma atual do localStorage ou navegador
 */
export function getCurrentLanguage() {
  if (typeof window === 'undefined') return defaultLanguage;
  
  // Tenta pegar do localStorage primeiro
  const savedLang = localStorage.getItem('preferred-language');
  if (savedLang && Object.keys(languages).includes(savedLang)) {
    return savedLang;
  }
  
  // Tenta pegar do navegador
  const browserLang = navigator.language.split('-')[0];
  if (Object.keys(languages).includes(browserLang)) {
    return browserLang;
  }
  
  return defaultLanguage;
}
  if (savedLang && Object.keys(languages).includes(savedLang)) {
    return savedLang;
  }
  
  // Tenta pegar do navegador
  const browserLang = navigator.language.split('-')[0];
  if (Object.keys(languages).includes(browserLang)) {
    return browserLang;
  }
  
  return defaultLanguage;
}

/**
 * Função principal de tradução
 */
export async function t(key, lang = null) {
  const currentLang = lang || getCurrentLanguage();
  const translations = await loadTranslations(currentLang);
  
  // Navega pelo objeto usando a chave (ex: "nav.home")
  const keys = key.split('.');
  let value = translations;
  
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) break;
  }
  
  // Se não encontrou a tradução, retorna a chave
  return value || key;
}

/**
 * Muda o idioma e salva a preferência
 */
export function setLanguage(lang) {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('preferred-language', lang);
  
  // Redireciona para a URL com o novo idioma
  const currentPath = window.location.pathname;
  const currentLang = getCurrentLanguage();
  
  let newPath;
  if (currentPath.startsWith(`/${currentLang}/`)) {
    newPath = currentPath.replace(`/${currentLang}/`, `/${lang}/`);
  } else if (currentPath === '/' || !currentPath.startsWith('/')) {
    newPath = lang === defaultLanguage ? '/' : `/${lang}/`;
  } else {
    newPath = lang === defaultLanguage ? currentPath : `/${lang}${currentPath}`;
  }
  
  window.location.href = newPath;
}

/**
 * Hook para usar traduções em componentes Astro
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
