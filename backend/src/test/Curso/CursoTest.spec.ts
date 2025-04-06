import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { BaseTest } from '../Bases/BaseTest';

/**
 * Classe de teste para o CursoController
 * Estende a classe BaseTest para herdar os métodos de teste
 */
class CursoTest extends BaseTest {
  constructor() {
    super('/api/curso');
  }
}

describe('CursoController Tests', () => {
  let service: CursoTest;
  let authToken: string;

  // Configuração inicial antes de todos os testes
  beforeAll(async () => {
    service = new CursoTest();
    authToken = await service.authenticate();
  });

  // Limpeza após todos os testes
  afterAll(async () => {
    await service.cleanup();
  });

  // Teste para obter todos os cursos
  it('should get all courses', async () => {
    const response = await service.testGetAll();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // Teste para obter cursos com paginação
  it('should get courses with pagination', async () => {
    const response = await service.testGetAll({ take: '5', skip: '0' });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeLessThanOrEqual(5);
  });

  // Teste para obter cursos com busca
  it('should get courses with search', async () => {
    const response = await service.testGetAll({ search: 'curso' });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // Teste para criar um novo curso
  it('should create a new course', async () => {
    const newCourse = {
      nome: 'Curso de Teste',
      descricao: 'Descrição do curso de teste',
      // Adicione outros campos necessários para criar um curso
    };

    const response = await service.testCreate(newCourse);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(newCourse.nome);
    expect(response.body.descricao).toBe(newCourse.descricao);
  });

  // Teste para atualizar um curso existente
  it('should update an existing course', async () => {
    // Primeiro, crie um curso para atualizar
    const newCourse = {
      nome: 'Curso Para Atualizar',
      descricao: 'Descrição do curso para atualizar',
      // Adicione outros campos necessários
    };

    const createResponse = await service.testCreate(newCourse);
    const courseId = createResponse.body.id;

    // Agora, atualize o curso
    const updateData = {
      nome: 'Curso Atualizado',
      descricao: 'Descrição atualizada do curso',
      // Adicione outros campos que deseja atualizar
    };

    const response = await service.testUpdate(courseId, updateData);
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe(updateData.nome);
    expect(response.body.descricao).toBe(updateData.descricao);
  });

  // Teste para excluir um curso
  it('should delete a course', async () => {
    // Primeiro, crie um curso para excluir
    const newCourse = {
      nome: 'Curso Para Excluir',
      descricao: 'Descrição do curso para excluir',
      // Adicione outros campos necessários
    };

    const createResponse = await service.testCreate(newCourse);
    const courseId = createResponse.body.id;

    // Agora, exclua o curso
    const response = await service.testDelete(courseId);
    expect(response.status).toBe(200);
  });
}); 