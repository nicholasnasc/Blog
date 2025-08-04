#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🌍 Sistema de Tradução Automática - Demonstração\n');

async function showTranslations() {
  const localesDir = path.join(__dirname, '../src/i18n/locales');
  
  try {
    const files = await fs.readdir(localesDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    console.log('📁 Arquivos de tradução encontrados:');
    for (const file of jsonFiles) {
      const lang = file.replace('.json', '');
      const content = await fs.readFile(path.join(localesDir, file), 'utf-8');
      const data = JSON.parse(content);
      
      console.log(`\n🏴 ${lang.toUpperCase()} - ${file}`);
      console.log(`   Título: ${data.home?.title || 'N/A'}`);
      console.log(`   Navegação: ${Object.values(data.nav || {}).join(' | ')}`);
      console.log(`   Total de chaves: ${JSON.stringify(data).match(/"/g)?.length / 2 || 0}`);
    }
    
    console.log('\n✅ Sistema de i18n configurado com sucesso!');
    console.log('\n📖 Como usar:');
    console.log('1. npm run dev - Inicia o servidor');
    console.log('2. Acesse http://localhost:4321');
    console.log('3. Use o seletor de idioma no cabeçalho');
    console.log('4. npm run i18n:generate - Gera novas traduções');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

showTranslations();
