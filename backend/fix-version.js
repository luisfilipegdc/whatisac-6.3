#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configurações
const WBOT_FILE_PATH = path.join(__dirname, 'src', 'libs', 'wbot.ts');

// Versões predefinidas do WhatsApp
const WHATSAPP_VERSIONS = {
  'latest': [2, 3000, 1027400486]
};

function showUsage() {
  console.log('\n📱 WhatsApp Version Fix Tool');
  console.log('=============================');
  console.log('\nUso:');
  console.log('  node fix-version.js latest');
  console.log('  node fix-version.js <major> <minor> <patch>');
  console.log('\nVersões predefinidas disponíveis:');
  Object.entries(WHATSAPP_VERSIONS).forEach(([name, version]) => {
    console.log(`  ${name}: [${version.join(', ')}]`);
  });
  console.log('\nExemplos:');
  console.log('  node fix-version.js latest');
  console.log('  node fix-version.js 2 3000 1027400486');
  console.log('\nPara ver a versão atual:');
  console.log('  node fix-version.js --current');
  console.log('\n💡 Para encontrar versões funcionais, visite:');
  console.log('  https://wppconnect.io/pt-BR/whatsapp-versions/');
  console.log('');
}

function getCurrentVersion() {
  try {
    const content = fs.readFileSync(WBOT_FILE_PATH, 'utf8');
    
    // Primeiro tenta encontrar versão no formato version: [x, y, z]
    let versionMatch = content.match(/version:\s*\[(\d+),\s*(\d+),\s*(\d+)\]/);
    
    if (versionMatch) {
      return [
        parseInt(versionMatch[1]),
        parseInt(versionMatch[2]),
        parseInt(versionMatch[3])
      ];
    }
    
    // Se não encontrar, procura por version como variável (version,)
    const variableMatch = content.match(/version\s*,/);
    if (variableMatch) {
      // Procura pela declaração da variável version via desestruturação
      const destructuringMatch = content.match(/const\s*\{\s*version\s*,\s*isLatest\s*\}\s*=\s*await\s+fetchLatestBaileysVersion\(\)/);
      if (destructuringMatch) {
        // Se encontrou a desestruturação, procura por uma declaração manual da versão
        const manualVersionMatch = content.match(/(?:const|let|var)\s+version\s*=\s*\[(\d+),\s*(\d+),\s*(\d+)\]/);
        if (manualVersionMatch) {
          return [
            parseInt(manualVersionMatch[1]),
            parseInt(manualVersionMatch[2]),
            parseInt(manualVersionMatch[3])
          ];
        }
        // Se não tem versão manual, retorna null (usando a versão do Baileys)
        return null;
      }
      
      // Procura pela declaração da variável version normal
      const versionVarMatch = content.match(/(?:const|let|var)\s+version\s*=\s*\[(\d+),\s*(\d+),\s*(\d+)\]/);
      if (versionVarMatch) {
        return [
          parseInt(versionVarMatch[1]),
          parseInt(versionVarMatch[2]),
          parseInt(versionVarMatch[3])
        ];
      }
    }
    
    return null;
  } catch (error) {
    console.error('❌ Erro ao ler o arquivo:', error.message);
    return null;
  }
}

function updateVersion(newVersion) {
  try {
    const content = fs.readFileSync(WBOT_FILE_PATH, 'utf8');
    let updatedContent = content;
    let success = false;
    
    // Cenário 1: version: [x, y, z] - formato direto
    const versionArrayRegex = /version:\s*\[\d+,\s*\d+,\s*\d+\]/;
    if (versionArrayRegex.test(content)) {
      console.log('🔍 Formato detectado: version: [x, y, z]');
      const newVersionString = `version: [${newVersion.join(', ')}]`;
      updatedContent = content.replace(versionArrayRegex, newVersionString);
      success = true;
    }
    
    // Cenário 2: version, - usando variável
    else if (/version\s*,/.test(content)) {
      console.log('🔍 Formato detectado: version, (variável)');
      
      // Verifica se tem a desestruturação do fetchLatestBaileysVersion
      const destructuringMatch = content.match(/const\s*\{\s*version\s*,\s*isLatest\s*\}\s*=\s*await\s+fetchLatestBaileysVersion\(\)/);
      
      if (destructuringMatch) {
        console.log('🔍 Detectado fetchLatestBaileysVersion - substituindo por versão manual');
        
        // Substitui a linha de desestruturação por uma declaração manual da versão
        const destructuringRegex = /const\s*\{\s*version\s*,\s*isLatest\s*\}\s*=\s*await\s+fetchLatestBaileysVersion\(\);?/;
        const newVersionDeclaration = `const version = [${newVersion.join(', ')}];
        const isLatest = false; // Versão manual definida`;
        
        updatedContent = content.replace(destructuringRegex, newVersionDeclaration);
        
        // Agora substitui "version," por "version: [x, y, z]," no makeWASocket
        const versionCommaRegex = /(\s+)version\s*,/;
        const versionCommaMatch = updatedContent.match(versionCommaRegex);
        if (versionCommaMatch) {
          const indentation = versionCommaMatch[1];
          const newVersionString = `${indentation}version: [${newVersion.join(', ')}],`;
          updatedContent = updatedContent.replace(versionCommaRegex, newVersionString);
        }
        
        success = true;
      }
      else {
        // Procura se já existe uma declaração da variável version
        const versionVarRegex = /(?:const|let|var)\s+version\s*=\s*\[\d+,\s*\d+,\s*\d+\]/;
        
        if (versionVarRegex.test(content)) {
          // Atualiza a declaração existente da variável
          const newVersionDeclaration = `const version = [${newVersion.join(', ')}]`;
          updatedContent = content.replace(versionVarRegex, newVersionDeclaration);
        } else {
          // Se não existe declaração, substitui "version," por "version: [x, y, z],"
          const versionCommaRegex = /(\s+)version\s*,/;
          const versionCommaMatch = content.match(versionCommaRegex);
          if (versionCommaMatch) {
            const indentation = versionCommaMatch[1];
            const newVersionString = `${indentation}version: [${newVersion.join(', ')}],`;
            updatedContent = content.replace(versionCommaRegex, newVersionString);
          }
        }
        success = true;
      }
    }
    
    // Cenário 3: Não encontrou nenhum padrão
    else {
      console.error('❌ Não foi possível encontrar a linha de versão no arquivo.');
      console.log('💡 Formatos suportados:');
      console.log('   - version: [2, 3000, 1027400486]');
      console.log('   - version,');
      console.log('   - const {version, isLatest} = await fetchLatestBaileysVersion();');
      return false;
    }
    
    if (!success) {
      return false;
    }
    
    fs.writeFileSync(WBOT_FILE_PATH, updatedContent, 'utf8');
    return true;
  } catch (error) {
    console.error('❌ Erro ao atualizar o arquivo:', error.message);
    return false;
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    showUsage();
    return;
  }

  // Mostrar versão atual
  if (args[0] === '--current' || args[0] === '-c') {
    const currentVersion = getCurrentVersion();
    if (currentVersion) {
      console.log(`\n📱 Versão atual: [${currentVersion.join(', ')}]`);
    } else {
      console.log('❌ Não foi possível obter a versão atual.');
    }
    return;
  }

  let newVersion;

  // Verificar se é uma versão predefinida
  if (args.length === 1 && WHATSAPP_VERSIONS[args[0]]) {
    newVersion = WHATSAPP_VERSIONS[args[0]];
    console.log(`\n🔄 Usando versão predefinida '${args[0]}': [${newVersion.join(', ')}]`);
  }
  // Verificar se são 3 números para versão customizada
  else if (args.length === 3) {
    const [major, minor, patch] = args.map(arg => parseInt(arg));
    
    if (isNaN(major) || isNaN(minor) || isNaN(patch)) {
      console.error('❌ Os valores da versão devem ser números válidos.');
      showUsage();
      return;
    }
    
    newVersion = [major, minor, patch];
    console.log(`\n🔄 Usando versão customizada: [${newVersion.join(', ')}]`);
  }
  else {
    console.error('❌ Argumentos inválidos.');
    showUsage();
    return;
  }

  // Mostrar versão atual antes da mudança
  const currentVersion = getCurrentVersion();
  if (currentVersion) {
    console.log(`📱 Versão atual: [${currentVersion.join(', ')}]`);
  }

  // Verificar se a nova versão é diferente da atual
  if (currentVersion && JSON.stringify(currentVersion) === JSON.stringify(newVersion)) {
    console.log('ℹ️  A versão especificada já está em uso.');
    return;
  }

  // Atualizar versão
  if (updateVersion(newVersion)) {
    console.log(`✅ Versão atualizada com sucesso para: [${newVersion.join(', ')}]`);
    console.log('\n💡 Dicas:');
    console.log('  - Reinicie o servidor para aplicar as mudanças');
    console.log('  - Teste a conexão após a mudança');
    console.log('  - Se houver problemas, use uma versão mais estável');
  } else {
    console.log('❌ Falha ao atualizar a versão.');
  }
}

// Verificar se o arquivo existe
if (!fs.existsSync(WBOT_FILE_PATH)) {
  console.error('❌ Arquivo wbot.ts não encontrado em:', WBOT_FILE_PATH);
  console.error('   Certifique-se de estar executando o script na pasta /backend do projeto.');
  process.exit(1);
}

main();
