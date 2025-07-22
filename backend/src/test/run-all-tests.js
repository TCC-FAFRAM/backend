#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Executando Todos os Testes da API\n');

// Configurações
const testConfig = {
  timeout: 30000,
  coverage: true,
  verbose: true,
  parallel: false
};

// Função para executar comando
function runCommand(command, description) {
  console.log(`\n🔄 ${description}...`);
  try {
    const result = execSync(command, { 
      stdio: 'inherit',
      timeout: testConfig.timeout 
    });
    console.log(`✅ ${description} - Sucesso!`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} - Falhou!`);
    console.error(`Erro: ${error.message}`);
    return false;
  }
}

// Função para verificar se o banco de dados está configurado
function checkDatabase() {
  console.log('🔍 Verificando configuração do banco de dados...');
  
  try {
    // Verificar se o arquivo .env existe
    if (!fs.existsSync('.env')) {
      console.error('❌ Arquivo .env não encontrado!');
      console.log('💡 Execute: npm run setup:env');
      return false;
    }

    // Verificar se o Prisma está configurado
    execSync('npx prisma generate', { stdio: 'pipe' });
    console.log('✅ Prisma configurado corretamente');
    return true;
  } catch (error) {
    console.error('❌ Erro na configuração do banco de dados');
    console.error('💡 Verifique se o PostgreSQL está rodando e as migrações foram aplicadas');
    return false;
  }
}

// Função para executar testes específicos
function runSpecificTests() {
  const tests = [
    {
      name: 'Testes de Autenticação',
      command: 'npm test -- --run src/test/AllEndpointsTest.spec.ts --reporter=verbose',
      description: 'Executando testes de autenticação e endpoints básicos'
    },
    {
      name: 'Testes de Usuários',
      command: 'npm test -- --run src/test/Usuario/UsuarioTest.spec.ts --reporter=verbose',
      description: 'Executando testes específicos de usuários'
    },
    {
      name: 'Testes de Cursos',
      command: 'npm test -- --run src/test/Curso/CursoTest.spec.ts --reporter=verbose',
      description: 'Executando testes específicos de cursos'
    }
  ];

  let allPassed = true;

  tests.forEach(test => {
    console.log(`\n📋 ${test.name}`);
    console.log(`📝 ${test.description}`);
    
    const success = runCommand(test.command, test.name);
    if (!success) {
      allPassed = false;
    }
  });

  return allPassed;
}

// Função para executar todos os testes
function runAllTests() {
  console.log('🚀 Executando todos os testes...');
  
  const commands = [
    {
      command: 'npm test',
      description: 'Todos os testes'
    },
    {
      command: 'npm run test:coverage',
      description: 'Testes com cobertura'
    }
  ];

  let allPassed = true;

  commands.forEach(({ command, description }) => {
    const success = runCommand(command, description);
    if (!success) {
      allPassed = false;
    }
  });

  return allPassed;
}

// Função para mostrar relatório
function showReport(success) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 RELATÓRIO DE TESTES');
  console.log('='.repeat(60));
  
  if (success) {
    console.log('✅ Todos os testes passaram com sucesso!');
    console.log('🎉 A API está funcionando corretamente.');
  } else {
    console.log('❌ Alguns testes falharam.');
    console.log('🔧 Verifique os erros acima e corrija os problemas.');
  }
  
  console.log('\n📋 Próximos passos:');
  console.log('1. Verifique a cobertura de testes');
  console.log('2. Corrija quaisquer testes que falharam');
  console.log('3. Execute os testes novamente se necessário');
  console.log('4. Faça commit das mudanças após todos os testes passarem');
}

// Função principal
async function main() {
  console.log('🎓 Platform Education - Testes da API');
  console.log('='.repeat(50));

  // Verificar configuração do banco
  if (!checkDatabase()) {
    console.log('\n❌ Configuração do banco de dados falhou!');
    console.log('💡 Execute os seguintes comandos:');
    console.log('   1. npm run setup:env');
    console.log('   2. npm run migrate');
    console.log('   3. npm test');
    process.exit(1);
  }

  // Perguntar qual tipo de teste executar
  const args = process.argv.slice(2);
  let success = false;

  if (args.includes('--all') || args.includes('-a')) {
    success = runAllTests();
  } else if (args.includes('--specific') || args.includes('-s')) {
    success = runSpecificTests();
  } else {
    console.log('\n📋 Escolha o tipo de teste:');
    console.log('1. Todos os testes (--all ou -a)');
    console.log('2. Testes específicos (--specific ou -s)');
    console.log('3. Testes padrão (sem argumentos)');
    
    if (args.length === 0) {
      success = runCommand('npm test', 'Testes padrão');
    } else {
      console.log('❌ Argumento inválido. Use --all, --specific ou nenhum argumento.');
      process.exit(1);
    }
  }

  // Mostrar relatório
  showReport(success);

  // Sair com código apropriado
  process.exit(success ? 0 : 1);
}

// Executar se for o arquivo principal
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Erro inesperado:', error);
    process.exit(1);
  });
}

module.exports = {
  runAllTests,
  runSpecificTests,
  checkDatabase
}; 