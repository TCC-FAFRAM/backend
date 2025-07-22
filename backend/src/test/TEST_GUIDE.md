# 🧪 Guia Completo de Testes - Platform Education Backend

Este guia explica como executar e entender os testes da API.

## 📋 Visão Geral

O projeto utiliza **Vitest** como framework de testes e **Supertest** para testar endpoints HTTP. Os testes cobrem todos os endpoints CRUD da API.

## 🚀 Executando Testes

### Comandos Disponíveis

```bash
# Testes básicos
npm test                    # Executa todos os testes
npm run test:watch         # Executa testes em modo watch
npm run test:coverage      # Executa testes com cobertura

# Testes específicos
npm run test:endpoints     # Executa apenas os testes de endpoints
npm run test:all          # Executa todos os testes com relatório
npm run test:specific     # Executa testes específicos organizados
```

### Scripts Avançados

```bash
# Executar com configurações específicas
npm test -- --run         # Executa testes uma vez e sai
npm test -- --reporter=verbose  # Relatório detalhado
npm test -- --timeout=60000     # Timeout personalizado
```

## 📁 Estrutura dos Testes

```
src/test/
├── Bases/
│   └── BaseTest.ts              # Classe base para todos os testes
├── Usuario/
│   └── UsuarioTest.spec.ts      # Testes específicos de usuários
├── Curso/
│   └── CursoTest.spec.ts        # Testes específicos de cursos
├── AllEndpointsTest.spec.ts     # Testes abrangentes de todos os endpoints
├── run-all-tests.js             # Script para executar testes organizados
├── setup.ts                     # Configuração global dos testes
└── TEST_GUIDE.md               # Este arquivo
```

## 🔧 Configuração dos Testes

### Pré-requisitos

1. **Banco de Dados de Teste**
   ```sql
   CREATE DATABASE platform_education_test;
   ```

2. **Variáveis de Ambiente**
   ```env
   TEST_DATABASE_URL="postgresql://user:pass@localhost:5432/platform_education_test"
   ```

3. **Dependências**
   ```bash
   npm install
   npx prisma generate
   ```

### Configuração Automática

```bash
# Setup completo incluindo testes
npm run setup

# Apenas configuração de ambiente
npm run setup:env
```

## 📊 Tipos de Testes

### 1. Testes de Endpoints CRUD

Cada entidade tem testes para:
- **GET** - Listar todos os registros
- **GET /:id** - Buscar por ID
- **POST** - Criar novo registro
- **PUT /:id** - Atualizar registro
- **DELETE** - Remover registro

### 2. Testes de Autenticação

- Login com credenciais válidas
- Login com credenciais inválidas
- Refresh de token
- Registro de usuários
- Proteção de rotas

### 3. Testes de Autorização

- Acesso de usuários comuns
- Acesso de administradores
- Negação de acesso não autorizado
- Middleware de autenticação

### 4. Testes de Relacionamentos

- Função-Curso
- Usuário-Função
- Liberação de Cursos
- Progresso de Aulas
- Tentativas de Prova

### 5. Testes de Performance

- Múltiplas requisições concorrentes
- Grandes volumes de dados
- Timeout de requisições

## 🎯 Exemplos de Testes

### Teste Básico de Endpoint

```typescript
describe('Usuario Endpoints', () => {
  let usuarioTest: BaseTest;

  beforeEach(() => {
    usuarioTest = new BaseTest('/api/usuario');
  });

  afterEach(async () => {
    await usuarioTest.cleanup();
  });

  it('should create a new user', async () => {
    const response = await usuarioTest.testCreate({
      nome: 'Teste',
      email: 'teste@example.com',
      senha: '123456',
      cpf: '12345678901'
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id_usuario');
  });
});
```

### Teste com Autenticação

```typescript
it('should get all users (admin only)', async () => {
  const token = await usuarioTest.authenticate();
  
  const response = await usuarioTest.authenticatedRequest(token)
    .get('/api/usuario');

  expect(response.status).toBe(200);
  expect(Array.isArray(response.body.data)).toBe(true);
});
```

### Teste de Relacionamento

```typescript
it('should create funcao-curso relationship', async () => {
  const response = await funcaoCursoTest.authenticatedRequest(adminToken)
    .post('/api/funcaocurso')
    .send({
      fk_id_funcao: testIds.funcao,
      fk_id_curso: testIds.curso
    });

  expect(response.status).toBe(201);
});
```

## 🔍 Debugging de Testes

### Logs Detalhados

```bash
# Executar com logs detalhados
npm test -- --reporter=verbose

# Executar teste específico
npm test -- --run src/test/Usuario/UsuarioTest.spec.ts
```

### Teste Individual

```bash
# Executar apenas um teste
npm test -- --run -t "should create a new user"
```

### Modo Watch

```bash
# Executar em modo watch para desenvolvimento
npm run test:watch
```

## 📈 Cobertura de Testes

### Gerar Relatório de Cobertura

```bash
npm run test:coverage
```

### Visualizar Cobertura

O relatório será gerado em:
- `coverage/` - Relatório HTML
- `coverage/lcov-report/index.html` - Relatório detalhado

### Metas de Cobertura

- **Linhas**: > 80%
- **Funções**: > 90%
- **Branches**: > 70%
- **Statements**: > 80%

## 🛠️ Criando Novos Testes

### 1. Estrutura Básica

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { BaseTest } from './Bases/BaseTest';

describe('MeuController Tests', () => {
  let meuTest: BaseTest;

  beforeEach(() => {
    meuTest = new BaseTest('/api/meu-endpoint');
  });

  afterEach(async () => {
    await meuTest.cleanup();
  });

  it('should test something', async () => {
    // Seu teste aqui
  });
});
```

### 2. Dados de Teste

```typescript
const testData = {
  meuModelo: {
    campo1: 'valor1',
    campo2: 'valor2'
  }
};
```

### 3. Testes CRUD Completos

```typescript
describe('CRUD Tests', () => {
  it('should create', async () => {
    const response = await meuTest.testCreate(testData.meuModelo);
    expect(response.status).toBe(201);
  });

  it('should get all', async () => {
    const response = await meuTest.testGetAll();
    expect(response.status).toBe(200);
  });

  it('should get by id', async () => {
    const response = await meuTest.testGetById(1);
    expect(response.status).toBe(200);
  });

  it('should update', async () => {
    const response = await meuTest.testUpdate(1, { campo1: 'novo' });
    expect(response.status).toBe(200);
  });

  it('should delete', async () => {
    const response = await meuTest.testDelete(1);
    expect(response.status).toBe(200);
  });
});
```

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Erro de Conexão com Banco

```bash
# Verificar se o banco está rodando
sudo systemctl status postgresql

# Verificar variáveis de ambiente
echo $DATABASE_URL
echo $TEST_DATABASE_URL
```

#### 2. Erro de Autenticação

```bash
# Verificar se JWT_SECRET está configurado
echo $JWT_SECRET

# Verificar se usuários de teste existem
npx prisma studio
```

#### 3. Timeout de Testes

```bash
# Aumentar timeout
npm test -- --timeout=120000

# Executar testes um por vez
npm test -- --run
```

#### 4. Limpeza de Dados

```bash
# Limpar banco de teste
npx prisma migrate reset --force

# Recriar dados de teste
npm run migrate
```

### Logs de Erro

```bash
# Logs detalhados
DEBUG=* npm test

# Logs específicos do Prisma
DEBUG=prisma:* npm test
```

## 📋 Checklist de Testes

### Antes de Executar

- [ ] Banco de dados configurado
- [ ] Variáveis de ambiente definidas
- [ ] Migrações aplicadas
- [ ] Prisma Client gerado
- [ ] Dependências instaladas

### Durante o Desenvolvimento

- [ ] Testes passando localmente
- [ ] Cobertura adequada
- [ ] Testes de edge cases
- [ ] Testes de performance
- [ ] Documentação atualizada

### Antes do Commit

- [ ] Todos os testes passando
- [ ] Cobertura mínima atingida
- [ ] Testes de integração OK
- [ ] Performance aceitável

## 🎯 Boas Práticas

### 1. Organização

- Agrupe testes relacionados
- Use descrições claras
- Mantenha testes independentes
- Limpe dados após cada teste

### 2. Dados de Teste

- Use dados realistas
- Evite dependências entre testes
- Limpe dados após testes
- Use factories quando possível

### 3. Assertions

- Teste comportamento, não implementação
- Use assertions específicas
- Verifique status codes
- Valide estrutura de resposta

### 4. Performance

- Execute testes em paralelo quando possível
- Use timeouts apropriados
- Evite testes lentos desnecessários
- Monitore tempo de execução

## 📚 Recursos Adicionais

- [Documentação do Vitest](https://vitest.dev/)
- [Documentação do Supertest](https://github.com/visionmedia/supertest)
- [Documentação do Prisma](https://www.prisma.io/docs)
- [Guia de Testes do Express](https://expressjs.com/en/advanced/best-practices-performance.html#testing)

---

## 🤝 Suporte

Se encontrar problemas:

1. Verifique a configuração do banco de dados
2. Confirme se todas as variáveis de ambiente estão definidas
3. Execute `npm run setup` para configuração automática
4. Consulte os logs de erro detalhados
5. Abra uma issue no repositório

**Bons testes garantem código de qualidade! 🚀** 