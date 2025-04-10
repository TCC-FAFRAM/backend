# Testes do Projeto

Este diretório contém os testes automatizados para o projeto. Utilizamos o framework Vitest para executar os testes e a biblioteca Supertest para testar as APIs.

## Estrutura

- `BaseTest.spec.ts`: Classe abstrata base para todos os testes de controllers
- `setup.ts`: Arquivo de configuração global para os testes
- `UsuarioTest.spec.ts`: Exemplo de teste para o UsuarioController
- `CursoTest.spec.ts`: Exemplo de teste para o CursoController

## Como Criar Novos Testes

Para criar um novo teste para um controller, siga estes passos:

1. Crie uma nova classe que estenda `BaseTest`
2. No construtor, passe a URL base do controller (ex: '/api/usuario')
3. Implemente os testes usando os métodos herdados de `BaseTest`

Exemplo:

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { BaseTest } from './BaseTest.spec';

class MeuControllerTest extends BaseTest {
  constructor() {
    super('/api/meu-controller');
  }
}

describe('MeuController Tests', () => {
  let meuControllerTest: MeuControllerTest;

  beforeAll(async () => {
    meuControllerTest = new MeuControllerTest();
  });

  afterAll(async () => {
    await meuControllerTest.cleanup();
  });

  it('should get all items', async () => {
    const response = await meuControllerTest.testGetAll();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // Adicione mais testes conforme necessário
});
```

## Métodos Disponíveis

A classe `BaseTest` fornece os seguintes métodos:

- `testGetAll(queryParams?)`: Testa o endpoint GET (getAll)
- `testGetById(id)`: Testa o endpoint GET por ID
- `testCreate(data)`: Testa o endpoint POST (create)
- `testUpdate(id, data)`: Testa o endpoint PUT (update)
- `testDelete(id)`: Testa o endpoint DELETE
- `authenticate(credentials)`: Autentica um usuário e retorna um token JWT
- `authenticatedRequest(token)`: Cria uma requisição autenticada com o token JWT
- `cleanup()`: Limpa recursos após os testes

## Executando os Testes

Para executar os testes, use o comando:

```bash
npm test
```

Para executar os testes em modo de observação (watch):

```bash
npm run test:watch
```

Para gerar um relatório de cobertura de testes:

```bash
npm run test:coverage
``` 