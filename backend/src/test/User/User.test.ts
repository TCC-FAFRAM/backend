import { describe, expect, it } from 'vitest';
import { UserService } from '../../entities/User/UserService';

const service = new UserService();

const user_1 = { 
  nome: 'João Silva',
  email: 'joao.silva@email.com',
  senha: 'senha123',
}

const user_2 =
{ 
  nome: 'Maria Oliveira',
  email: 'maria.oliveira@email.com',
  senha: 'senha456',
}

const user_3 =
{ 
  nome: 'Carlos Souza',
  email: 'carlos.souza@email.com',
  senha: 'senha789',
}

describe("Testes do CRUD de Usuários", () => {
  it("Deve criar um novo usuário", async () => {
    const result_user_1 = await service.create(user_1);
    expect(result_user_1.status).toBe(201);
    const result_user_2 = await service.create(user_2);
    expect(result_user_2.status).toBe(201);
    const result_user_3 = await service.create(user_3);
    expect(result_user_3.status).toBe(201);
  });

  // it("Deve listar todos os usuários", async () => {
  //   const res = await service.getAll();
  //   expect(res.status).toBe(200);
  //   expect(Array.isArray(res.data)).toBe(true);
  // });

  // it("Deve atualizar um usuário existente", async () => {
  //   const res = await request(app).put(`/users/${userId}`).send({ name: "Carlos" });
  //   expect(res.status).toBe(200);
  //   expect(res.body.name).toBe("Carlos");
  // });

  // it("Deve deletar um usuário", async () => {
  //   const res = await service.delete();
  //   expect(res.status).toBe(204);

  //   // Verifica se realmente foi excluído
  //   const checkRes = await request(app).get(`/users/${userId}`);
  //   expect(checkRes.status).not.toBe(200);
  // });
});