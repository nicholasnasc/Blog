#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import AutoTranslator from '../src/i18n/auto-translator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translator = new AutoTranslator();
const localesDir = path.join(__dirname, '../src/i18n/locales');

async function generateAllTranslations() {
  try {
    console.log('🌍 Iniciando geração automática de traduções...');
    
    // Carrega o arquivo português (fonte)
    const ptFile = path.join(localesDir, 'pt.json');
    const ptContent = await fs.readFile(ptFile, 'utf-8');
    const ptData = JSON.parse(ptContent);
    
    // Idiomas alvo
    const targetLanguages = [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' },
      { code: 'fr', name: 'Français' }
    ];
    
    for (const { code, name } of targetLanguages) {
      console.log(`\n📝 Gerando traduções para ${name} (${code})...`);
      
      const translated = await translator.translateObject(ptData, 'pt', code);
      
      // Salva o arquivo traduzido
      const targetFile = path.join(localesDir, `${code}.json`);
      await fs.writeFile(targetFile, JSON.stringify(translated, null, 2), 'utf-8');
      
      console.log(`✅ Traduções para ${name} salvas em ${code}.json`);
    }
    
    console.log('\n🎉 Todas as traduções foram geradas com sucesso!');
    console.log('\n💡 Dica: Revise as traduções geradas e ajuste quando necessário.');
    
  } catch (error) {
    console.error('❌ Erro ao gerar traduções:', error);
    process.exit(1);
  }
}

// Executa apenas se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllTranslations();
}

export default generateAllTranslations;
