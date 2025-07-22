# 🚀 Configuração de Ambiente - Platform Education Backend

Este guia explica como configurar as variáveis de ambiente necessárias para executar o projeto backend.

## 📋 Pré-requisitos

- Node.js 20.x
- PostgreSQL
- npm ou yarn

## 🔧 Configuração Inicial

### 1. Copie o arquivo de exemplo

```bash
cp env.example .env
```

### 2. Configure as variáveis obrigatórias

Edite o arquivo `.env` e configure as seguintes variáveis:

#### 🔐 Configurações Essenciais

```env
# Porta do servidor
PORT=3000

# Ambiente (development, production, test)
NODE_ENV=development

# URL do banco de dados PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/platform_education"

# Chave secreta para JWT (GERE UMA CHAVE FORTE!)
JWT_SECRET="sua_chave_secreta_super_forte_aqui_2024_platform_education"
```

## 🗄️ Configuração do Banco de Dados

### 1. Instale o PostgreSQL

- **macOS**: `brew install postgresql`
- **Ubuntu**: `sudo apt-get install postgresql postgresql-contrib`
- **Windows**: Baixe do [site oficial](https://www.postgresql.org/download/windows/)

### 2. Crie o banco de dados

```sql
-- Conecte ao PostgreSQL
psql -U postgres

-- Crie o banco de dados
CREATE DATABASE platform_education;

-- Crie um usuário (opcional)
CREATE USER platform_user WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE platform_education TO platform_user;
```

### 3. Configure a DATABASE_URL

```env
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/platform_education"
```

## 🔑 Geração de Chaves JWT

### Para Desenvolvimento

Use uma chave simples (NÃO use em produção):

```env
JWT_SECRET="dev_secret_key_2024_platform_education"
```

### Para Produção

Gere uma chave forte usando Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Use a saída como sua `JWT_SECRET`.

## 🧪 Configuração para Testes

Crie um banco de dados separado para testes:

```sql
CREATE DATABASE platform_education_test;
```

Configure no `.env`:

```env
TEST_DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/platform_education_test"
```

## 🚀 Executando o Projeto

### 1. Instale as dependências

```bash
npm install
```

### 2. Execute as migrações

```bash
npm run migrate
```

### 3. Inicie o servidor

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## 🔍 Verificação da Configuração

### 1. Teste a conexão com o banco

```bash
npx prisma db pull
```

### 2. Execute os testes

```bash
npm test
```

### 3. Verifique o healthcheck

```bash
curl http://localhost:3000/healthcheck
```

## 📝 Variáveis Opcionais

### Configurações de CORS

```env
CORS_ORIGIN="http://localhost:3000,http://localhost:3001,http://localhost:5173"
```

### Configurações de Upload

```env
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE=5242880
```

### Configurações de Email (para funcionalidades futuras)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_de_app
```

## 🛡️ Segurança

### ⚠️ Importante para Produção

1. **NUNCA** commite o arquivo `.env` no repositório
2. Use chaves JWT fortes e únicas
3. Configure HTTPS em produção
4. Use variáveis de ambiente seguras
5. Configure firewalls adequadamente

### Exemplo de `.env` para Produção

```env
NODE_ENV=production
PORT=3000
DATABASE_URL="postgresql://user:strong_password@prod-db-host:5432/platform_education"
JWT_SECRET="chave_super_forte_gerada_aleatoriamente_com_64_caracteres"
CORS_ORIGIN="https://seu-dominio.com"
LOG_LEVEL="error"
```

## 🔧 Troubleshooting

### Erro de conexão com banco

```bash
# Verifique se o PostgreSQL está rodando
sudo systemctl status postgresql

# Teste a conexão
psql -h localhost -U postgres -d platform_education
```

### Erro de JWT

```bash
# Verifique se JWT_SECRET está definido
echo $JWT_SECRET
```

### Erro de porta em uso

```bash
# Mude a porta no .env
PORT=3001
```

## 📚 Recursos Adicionais

- [Documentação do Prisma](https://www.prisma.io/docs)
- [Documentação do Express](https://expressjs.com/)
- [Documentação do JWT](https://jwt.io/)
- [Documentação do PostgreSQL](https://www.postgresql.org/docs/)

---

## 🤝 Suporte

Se encontrar problemas, verifique:

1. Se todas as variáveis obrigatórias estão configuradas
2. Se o PostgreSQL está rodando
3. Se as migrações foram executadas
4. Se as dependências estão instaladas

Para mais ajuda, consulte a documentação do projeto ou abra uma issue no repositório. 