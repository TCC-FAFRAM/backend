import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { BaseTest } from '../Bases/BaseTest';

/**
 * Classe de teste para o UsuarioController
 * Estende a classe BaseTest para herdar os métodos de teste
 */
class UsuarioTest extends BaseTest {
  constructor() {
    super('/api/usuario');
  }
}

describe('UsuarioController Tests', () => {
  let service: UsuarioTest;

  // Configuração inicial antes de todos os testes
  beforeAll(async () => {
    service = new UsuarioTest();

  });

  // Limpeza após todos os testes
  afterAll(async () => {
    await service.cleanup();
  });

  // Teste para obter todos os usuários
  it('should get all users', async () => {
    const response = await service.testGetAll();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // Teste para obter usuários com paginação
  it('should get users with pagination', async () => {
    const response = await service.testGetAll({ take: '5', skip: '0' });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeLessThanOrEqual(5);
  });

  // Teste para obter usuários com busca
  it('should get users with search', async () => {
    const response = await service.testGetAll({ search: 'admin' });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // Teste para criar um novo usuário
  it('should create a new user', async () => {
    const newUser = {
      nome: 'Test User',
      email: `test${Date.now()}@example.com`,
      senha: 'password123',
      // Adicione outros campos necessários para criar um usuário
    };

    const response = await service.testCreate(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(newUser.nome);
    expect(response.body.email).toBe(newUser.email);
  });

  // Teste para atualizar um usuário existente
  it('should update an existing user', async () => {
    // Primeiro, crie um usuário para atualizar
    const newUser = {
      nome: 'User To Update',
      email: `update${Date.now()}@example.com`,
      senha: 'password123',
      // Adicione outros campos necessários
    };

    const createResponse = await service.testCreate(newUser);
    const userId = createResponse.body.id;

    // Agora, atualize o usuário
    const updateData = {
      nome: 'Updated User Name',
      // Adicione outros campos que deseja atualizar
    };

    const response = await service.testUpdate(userId, updateData);
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe(updateData.nome);
  });

  // Teste para excluir um usuário
  it('should delete a user', async () => {
    // Primeiro, crie um usuário para excluir
    const newUser = {
      nome: 'User To Delete',
      email: `delete${Date.now()}@example.com`,
      senha: 'password123',
      // Adicione outros campos necessários
    };

    const createResponse = await service.testCreate(newUser);
    const userId = createResponse.body.id;

    // Agora, exclua o usuário
    const response = await service.testDelete(userId);
    expect(response.status).toBe(200);
  });
}); 