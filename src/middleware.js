import { defineMiddleware } from 'astro:middleware';
import { languages, defaultLanguage } from './i18n/config.js';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = context.url;
  const pathname = url.pathname;
  
  // Detecta o idioma da URL
  const pathSegments = pathname.split('/').filter(Boolean);
  const possibleLang = pathSegments[0];
  
  // Se não há idioma na URL ou é um idioma inválido
  if (!Object.keys(languages).includes(possibleLang)) {
    // Detecta idioma preferido do navegador
    const acceptLanguage = context.request.headers.get('accept-language');
    let detectedLang = defaultLanguage;
    
    if (acceptLanguage) {
      const browserLangs = acceptLanguage
        .split(',')
        .map(lang => lang.split(';')[0].split('-')[0].trim())
        .filter(lang => Object.keys(languages).includes(lang));
      
      if (browserLangs.length > 0) {
        detectedLang = browserLangs[0];
      }
    }
    
    // Se não é o idioma padrão, redireciona
    if (detectedLang !== defaultLanguage) {
      const newUrl = new URL(`/${detectedLang}${pathname}`, url);
      return Response.redirect(newUrl, 302);
    }
  }
  
  // Continua com a requisição
  return next();
});
