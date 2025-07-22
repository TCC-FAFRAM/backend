#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Configuração de Ambiente - Platform Education Backend\n');

// Função para fazer perguntas ao usuário
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// Função para gerar JWT secret
function generateJWTSecret() {
  return crypto.randomBytes(64).toString('hex');
}

// Função para criar o arquivo .env
function createEnvFile(answers) {
  const envContent = `# ========================================
# CONFIGURAÇÕES DO SERVIDOR
# ========================================
PORT=${answers.port}
NODE_ENV=${answers.environment}

# ========================================
# CONFIGURAÇÕES DO BANCO DE DADOS
# ========================================
# URL de conexão com o PostgreSQL
DATABASE_URL="${answers.databaseUrl}"

# ========================================
# CONFIGURAÇÕES DE AUTENTICAÇÃO JWT
# ========================================
# Chave secreta para assinar tokens JWT
JWT_SECRET="${answers.jwtSecret}"

# ========================================
# CONFIGURAÇÕES DE SEGURANÇA
# ========================================
# Salt rounds para bcrypt (recomendado: 10-12)
BCRYPT_SALT_ROUNDS=10

# ========================================
# CONFIGURAÇÕES DE CORS
# ========================================
# URLs permitidas para CORS (separadas por vírgula)
CORS_ORIGIN="${answers.corsOrigin}"

# ========================================
# CONFIGURAÇÕES DE LOGS
# ========================================
# Nível de log (debug, info, warn, error)
LOG_LEVEL="${answers.logLevel}"

# ========================================
# CONFIGURAÇÕES DE TESTES
# ========================================
# URL do banco de dados para testes
TEST_DATABASE_URL="${answers.testDatabaseUrl}"

# ========================================
# CONFIGURAÇÕES DE UPLOAD DE ARQUIVOS
# ========================================
# Diretório para upload de arquivos
UPLOAD_DIR="./uploads"

# Tamanho máximo de upload (em bytes) - 5MB
MAX_FILE_SIZE=5242880

# ========================================
# CONFIGURAÇÕES DE EMAIL (OPCIONAL)
# ========================================
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=seu_email@gmail.com
# SMTP_PASS=sua_senha_de_app

# ========================================
# CONFIGURAÇÕES DE REDIS (OPCIONAL)
# ========================================
# REDIS_URL=redis://localhost:6379

# ========================================
# CONFIGURAÇÕES DE MONITORAMENTO (OPCIONAL)
# ========================================
# SENTRY_DSN=sua_url_do_sentry

# ========================================
# CONFIGURAÇÕES DE API EXTERNA (OPCIONAL)
# ========================================
# API_KEY=sua_chave_de_api_externa
# API_BASE_URL=https://api.externa.com
`;

  fs.writeFileSync('.env', envContent);
}

async function main() {
  try {
    console.log('📋 Vamos configurar seu ambiente de desenvolvimento!\n');

    // Verificar se .env já existe
    if (fs.existsSync('.env')) {
      const overwrite = await question('⚠️  O arquivo .env já existe. Deseja sobrescrever? (y/N): ');
      if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
        console.log('❌ Configuração cancelada.');
        rl.close();
        return;
      }
    }

    // Coletar informações do usuário
    const answers = {};

    answers.port = await question('🔌 Porta do servidor (padrão: 3000): ') || '3000';
    
    answers.environment = await question('🌍 Ambiente (development/production/test, padrão: development): ') || 'development';
    
    console.log('\n🗄️  Configuração do Banco de Dados:');
    answers.dbHost = await question('   Host do PostgreSQL (padrão: localhost): ') || 'localhost';
    answers.dbPort = await question('   Porta do PostgreSQL (padrão: 5432): ') || '5432';
    answers.dbUser = await question('   Usuário do PostgreSQL (padrão: postgres): ') || 'postgres';
    answers.dbPassword = await question('   Senha do PostgreSQL: ');
    answers.dbName = await question('   Nome do banco de dados (padrão: platform_education): ') || 'platform_education';
    
    answers.databaseUrl = `postgresql://${answers.dbUser}:${answers.dbPassword}@${answers.dbHost}:${answers.dbPort}/${answers.dbName}`;
    answers.testDatabaseUrl = `postgresql://${answers.dbUser}:${answers.dbPassword}@${answers.dbHost}:${answers.dbPort}/${answers.dbName}_test`;

    console.log('\n🔐 Configuração de Segurança:');
    const generateJWT = await question('   Gerar chave JWT automaticamente? (Y/n): ');
    
    if (generateJWT.toLowerCase() !== 'n' && generateJWT.toLowerCase() !== 'no') {
      answers.jwtSecret = generateJWTSecret();
      console.log('   ✅ Chave JWT gerada automaticamente');
    } else {
      answers.jwtSecret = await question('   Digite sua chave JWT secreta: ');
    }

    console.log('\n🌐 Configuração de CORS:');
    answers.corsOrigin = await question('   URLs permitidas para CORS (separadas por vírgula, padrão: http://localhost:3000,http://localhost:3001,http://localhost:5173): ') || 'http://localhost:3000,http://localhost:3001,http://localhost:5173';

    console.log('\n📝 Configuração de Logs:');
    answers.logLevel = await question('   Nível de log (debug/info/warn/error, padrão: debug): ') || 'debug';

    // Criar o arquivo .env
    createEnvFile(answers);

    console.log('\n✅ Arquivo .env criado com sucesso!');
    console.log('\n📋 Próximos passos:');
    console.log('1. Instale as dependências: npm install');
    console.log('2. Execute as migrações: npm run migrate');
    console.log('3. Inicie o servidor: npm run dev');
    console.log('\n📚 Para mais informações, consulte o arquivo ENV_SETUP.md');

  } catch (error) {
    console.error('❌ Erro durante a configuração:', error.message);
  } finally {
    rl.close();
  }
}

// Executar o script
if (require.main === module) {
  main();
}

module.exports = { createEnvFile, generateJWTSecret }; 