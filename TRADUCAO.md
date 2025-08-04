# 🌍 Sistema de Tradução Automática

Este portfólio agora possui um sistema completo de tradução automática que suporta múltiplos idiomas sem necessidade de tradução manual.

## 🚀 Funcionalidades

- **Tradução Automática**: Sistema que traduz automaticamente do português para outros idiomas
- **Suporte a 4 idiomas**: Português (padrão), Inglês, Espanhol e Francês
- **Seletor de Idioma**: Interface intuitiva para mudança de idioma
- **PWA Multilíngue**: O webapp funciona em qualquer idioma
- **Cache Inteligente**: Traduções são armazenadas em cache para melhor performance

## 📁 Estrutura dos Arquivos

```
src/i18n/
├── config.js              # Configuração dos idiomas
├── utils.js               # Utilitários de tradução
├── auto-translator.js     # Sistema de tradução automática
└── locales/
    ├── pt.json            # Traduções em português (fonte)
    ├── en.json            # Traduções em inglês
    ├── es.json            # Traduções em espanhol
    └── fr.json            # Traduções em francês
```

## 🛠️ Como Usar

### 1. Em Componentes Astro

```astro
---
import { t } from "../i18n/utils.js";

const title = await t('home.title');
const description = await t('home.description');
---

<h1>{title}</h1>
<p>{description}</p>
```

### 2. Adicionando Novas Traduções

Edite o arquivo `src/i18n/locales/pt.json` (português é o idioma fonte):

```json
{
  "nova_secao": {
    "titulo": "Meu Novo Título",
    "descricao": "Minha nova descrição"
  }
}
```

Execute o comando para gerar as traduções automaticamente:

```bash
npm run i18n:generate
```

### 3. Usando no JavaScript

```javascript
import { t, setLanguage, getCurrentLanguage } from '../i18n/utils.js';

// Obter tradução
const texto = await t('home.title');

// Mudar idioma
setLanguage('en');

// Obter idioma atual
const idioma = getCurrentLanguage();
```

## 🎯 Comandos Disponíveis

- `npm run i18n:generate` - Gera traduções automáticas para todos os idiomas
- `npm run i18n:update` - Atualiza as traduções (alias para generate)

## 🌐 API de Tradução

O sistema usa a API gratuita MyMemory para tradução automática:
- **Limite**: 1000 traduções por dia
- **Qualidade**: Boa para textos gerais
- **Cache**: Traduções são armazenadas para evitar chamadas repetidas

## 📱 PWA Multilíngue

O portfólio agora pode ser instalado como webapp em qualquer idioma:

1. Acesse o site em qualquer idioma
2. Clique no botão "Instalar App" (ou equivalente no idioma)
3. O app será instalado com as traduções do idioma selecionado

## 🎨 Personalização

### Adicionando Novos Idiomas

1. **Configure em `config.js`**:
```javascript
export const languages = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch'  // Novo idioma
};
```

2. **Adicione a bandeira no `language-selector.astro`**:
```javascript
const flags = {
  'pt': '🇧🇷',
  'en': '🇺🇸',
  'es': '🇪🇸',
  'fr': '🇫🇷',
  'de': '🇩🇪'  // Nova bandeira
};
```

3. **Execute a geração de traduções**:
```bash
npm run i18n:generate
```

### Melhorando Traduções

As traduções automáticas podem ser ajustadas manualmente editando os arquivos JSON em `src/i18n/locales/`.

## 🔧 Solução de Problemas

### Tradução não aparece
- Verifique se a chave existe em `pt.json`
- Execute `npm run i18n:generate` novamente
- Verifique o console do navegador por erros

### Erro de API de tradução
- A API tem limite diário, aguarde um tempo
- Traduções já feitas ficam no cache
- Edite manualmente o arquivo JSON se necessário

### Idioma não muda
- Limpe o cache do navegador
- Verifique se o localStorage está funcionando
- Recarregue a página após mudança

## 🎉 Benefícios

- ✅ **Sem trabalho manual**: Traduções são geradas automaticamente
- ✅ **Fácil manutenção**: Apenas edite o arquivo português
- ✅ **Performance**: Cache evita traduções repetidas
- ✅ **SEO friendly**: URLs podem ser traduzidas
- ✅ **Acessibilidade**: Interface em múltiplos idiomas
- ✅ **PWA completo**: Webapp funciona em qualquer idioma

---

**Desenvolvido com ❤️ para facilitar a internacionalização do seu portfólio!**
