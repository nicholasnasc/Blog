/**
 * Sistema de tradução automática usando API gratuita
 * Traduz automaticamente do português para outros idiomas
 */

class AutoTranslator {
  constructor() {
    this.cache = new Map();
    this.apiUrl = 'https://api.mymemory.translated.net/get';
  }

  async translateText(text, fromLang = 'pt', toLang = 'en') {
    const cacheKey = `${text}-${fromLang}-${toLang}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(
        `${this.apiUrl}?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`
      );
      
      const data = await response.json();
      const translatedText = data.responseData.translatedText;
      
      this.cache.set(cacheKey, translatedText);
      return translatedText;
    } catch (error) {
      console.warn(`Erro ao traduzir "${text}":`, error);
      return text; // Retorna o texto original em caso de erro
    }
  }

  async translateObject(obj, fromLang = 'pt', toLang = 'en') {
    const translated = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        translated[key] = await this.translateText(value, fromLang, toLang);
        // Pequeno delay para não sobrecarregar a API
        await new Promise(resolve => setTimeout(resolve, 100));
      } else if (typeof value === 'object' && value !== null) {
        translated[key] = await this.translateObject(value, fromLang, toLang);
      } else {
        translated[key] = value;
      }
    }
    
    return translated;
  }

  async generateTranslations(sourceFile, targetLanguages = ['en', 'es', 'fr']) {
    try {
      const sourceData = await import(sourceFile);
      const translations = {};
      
      for (const lang of targetLanguages) {
        console.log(`Gerando traduções para ${lang}...`);
        translations[lang] = await this.translateObject(sourceData.default || sourceData, 'pt', lang);
      }
      
      return translations;
    } catch (error) {
      console.error('Erro ao gerar traduções:', error);
      return {};
    }
  }
}

export default AutoTranslator;
