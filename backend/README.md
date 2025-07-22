# 🎓 Platform Education Backend

Backend da plataforma de educação desenvolvido com Node.js, Express, TypeScript e Prisma.

## 📋 Pré-requisitos

- Node.js 20.x
- PostgreSQL
- npm ou yarn

## 🚀 Configuração Rápida

### Opção 1: Configuração Automática (Recomendada)

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd backend

# Execute o setup automático
npm run setup
```

O comando `npm run setup` irá:
1. Configurar as variáveis de ambiente interativamente
2. Instalar as dependências
3. Executar as migrações do banco de dados

### Opção 2: Configuração Manual

```bash
# 1. Instale as dependências
npm install

# 2. Configure o ambiente
npm run setup:env

# 3. Execute as migrações
npm run migrate

# 4. Inicie o servidor
npm run dev
```

## 🔧 Configuração de Ambiente

### Variáveis Obrigatórias

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Servidor
PORT=3000
NODE_ENV=development

# Banco de Dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/platform_education"

# Autenticação
JWT_SECRET="sua_chave_secreta_super_forte_aqui_2024_platform_education"

# CORS
CORS_ORIGIN="http://localhost:3000,http://localhost:3001,http://localhost:5173"
```

### Configuração do Banco de Dados

1. **Instale o PostgreSQL**
2. **Crie o banco de dados:**
   ```sql
   CREATE DATABASE platform_education;
   ```
3. **Configure a DATABASE_URL no .env**

Para mais detalhes, consulte o arquivo `ENV_SETUP.md`.

## 🏗️ Estrutura do Projeto

```
backend/
├── src/
│   ├── bases/           # Classes base (BaseController, BaseService, etc.)
│   ├── controllers/     # Controladores da API
│   ├── middleware/      # Middlewares (auth, exception, etc.)
│   ├── models/          # Repositórios (camada de acesso a dados)
│   ├── routers/         # Rotas da API
│   ├── services/        # Lógica de negócio
│   ├── test/           # Testes automatizados
│   ├── types/          # Definições de tipos TypeScript
│   ├── utils/          # Utilitários
│   └── server.ts       # Arquivo principal do servidor
├── prisma/
│   ├── schema.prisma   # Schema do banco de dados
│   ├── migrations/     # Migrações do banco
│   └── sql/           # Scripts SQL adicionais
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

## 🚀 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia o servidor em modo desenvolvimento
npm run build           # Compila o projeto TypeScript
npm start              # Inicia o servidor em produção

# Banco de Dados
npm run migrate         # Executa migrações e triggers
npm run deploy:migrate  # Aplica migrações em produção

# Testes
npm test               # Executa todos os testes
npm run test:watch     # Executa testes em modo watch
npm run test:coverage  # Executa testes com cobertura

# Configuração
npm run setup:env      # Configura variáveis de ambiente
npm run setup          # Setup completo do projeto
```

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação.

### Endpoints de Autenticação

- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/refresh` - Renovar token
- `POST /api/auth/register` - Registro de usuário

### Proteção de Rotas

Use o middleware `auth` para proteger rotas:

```typescript
import { auth } from '../middleware/auth';

router.get('/protected', auth, (req, res) => {
  // Rota protegida
});
```

## 📊 Modelos de Dados

### Principais Entidades

- **Usuario**: Usuários do sistema
- **Curso**: Cursos disponíveis
- **Modulo**: Módulos dos cursos
- **Aula**: Aulas dos módulos
- **Prova**: Provas dos módulos
- **Certificado**: Certificados dos usuários
- **Fazenda**: Fazendas dos usuários
- **Funcao**: Funções dos usuários

### Relacionamentos

- Usuário → Função (1:N)
- Usuário → Fazenda (1:N)
- Curso → Módulo (1:N)
- Módulo → Aula (1:N)
- Módulo → Prova (1:1)
- Usuário → Certificado (1:N)

## 🧪 Testes

O projeto utiliza Vitest para testes automatizados.

### Executando Testes

```bash
# Todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Testes com cobertura
npm run test:coverage
```

### Estrutura de Testes

- `src/test/Bases/BaseTest.ts` - Classe base para testes
- `src/test/Usuario/UsuarioTest.spec.ts` - Testes do UsuarioController
- `src/test/Curso/CursoTest.spec.ts` - Testes do CursoController

## 🔍 API Endpoints

### Autenticação
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/register`

### Usuários
- `GET /api/usuario`
- `GET /api/usuario/:id`
- `POST /api/usuario`
- `PUT /api/usuario/:id`
- `DELETE /api/usuario/:id`

### Cursos
- `GET /api/curso`
- `GET /api/curso/:id`
- `POST /api/curso`
- `PUT /api/curso/:id`
- `DELETE /api/curso/:id`

### Módulos
- `GET /api/modulo`
- `GET /api/modulo/:id`
- `POST /api/modulo`
- `PUT /api/modulo/:id`
- `DELETE /api/modulo/:id`

### Aulas
- `GET /api/aula`
- `GET /api/aula/:id`
- `POST /api/aula`
- `PUT /api/aula/:id`
- `DELETE /api/aula/:id`

### Provas
- `GET /api/prova`
- `GET /api/prova/:id`
- `POST /api/prova`
- `PUT /api/prova/:id`
- `DELETE /api/prova/:id`

### Certificados
- `GET /api/certificado`
- `GET /api/certificado/:id`
- `POST /api/certificado`
- `PUT /api/certificado/:id`
- `DELETE /api/certificado/:id`

## 🛡️ Segurança

### Middlewares de Segurança

- **Auth**: Verifica tokens JWT
- **AdminOnly**: Restringe acesso a administradores
- **Exception**: Tratamento global de erros

### Boas Práticas

1. **NUNCA** commite o arquivo `.env`
2. Use chaves JWT fortes em produção
3. Configure HTTPS em produção
4. Valide todas as entradas de dados
5. Use rate limiting para APIs públicas

## 📝 Logs

O sistema inclui um sistema de logs automático que registra:

- Operações de INSERT, UPDATE e DELETE
- Dados antigos e novos (para auditoria)
- Timestamp das operações
- Tabela e operação realizada

## 🔧 Desenvolvimento

### Adicionando Novos Endpoints

1. Crie o repositório em `src/models/`
2. Crie o serviço em `src/services/`
3. Crie o controller em `src/controllers/`
4. Crie as rotas em `src/routers/`
5. Adicione as rotas no `src/routers/index.ts`

### Exemplo de CRUD Completo

```typescript
// Repository
export class MeuRepository extends BaseRepository<MeuModel> {
  constructor() {
    super(prisma.meuModel);
  }
}

// Service
export class MeuService extends BaseService<MeuModel> {
  constructor() {
    super(new MeuRepository());
  }
}

// Controller
export class MeuController extends BaseController<MeuModel> {
  constructor() {
    super(new MeuService());
  }
}

// Router
const router = express.Router();
const controller = new MeuController();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));
```

## 🚀 Deploy

### Produção

1. Configure as variáveis de ambiente para produção
2. Execute `npm run build`
3. Execute `npm start`

### Docker (Futuro)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📚 Documentação Adicional

- [ENV_SETUP.md](./ENV_SETUP.md) - Guia detalhado de configuração de ambiente
- [test/README.md](./src/test/README.md) - Documentação dos testes
- [Prisma Docs](https://www.prisma.io/docs) - Documentação do Prisma
- [Express Docs](https://expressjs.com/) - Documentação do Express

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Se você encontrar problemas:

1. Verifique se todas as variáveis de ambiente estão configuradas
2. Certifique-se de que o PostgreSQL está rodando
3. Execute `npm run migrate` para aplicar as migrações
4. Consulte os logs do servidor para erros
5. Abra uma issue no repositório

---

**Desenvolvido com ❤️ para a Platform Education** 