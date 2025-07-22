import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { BaseTest } from './Bases/BaseTest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Teste abrangente para todos os endpoints CRUD da API
 * Este arquivo testa todas as rotas disponíveis no sistema
 */
describe('All Endpoints CRUD Tests', () => {
  let adminToken: string;
  let userToken: string;
  let testIds: Record<string, number> = {};

  // Dados de teste para criação
  const testData = {
    usuario: {
      nome: 'Teste Usuario',
      sobre_nome: 'Silva',
      email: 'teste@example.com',
      senha: '123456',
      cpf: '12345678901',
      tipo: 'USER' as const,
      complemento: 'Complemento teste'
    },
    funcao: {
      nome: 'Função Teste',
      descricao: 'Descrição da função teste'
    },
    fazenda: {
      nome: 'Fazenda Teste',
      proprietario: 'Proprietário Teste',
      descricao: 'Descrição da fazenda teste',
      complemento: 'Complemento fazenda'
    },
    curso: {
      titulo: 'Curso Teste',
      descricao: 'Descrição do curso teste',
      url_img: 'https://example.com/image.jpg'
    },
    modulo: {
      titulo: 'Módulo Teste',
      descricao: 'Descrição do módulo teste',
      ordem: 1,
      concluido: false
    },
    aula: {
      titulo: 'Aula Teste',
      url_video: 'https://example.com/video.mp4',
      duracao: 60,
      descricao: 'Descrição da aula teste'
    },
    prova: {
      nota_minima: 7.0,
      total_perguntas: 10
    },
    questao: {
      pergunta: 'Pergunta teste?',
      opcoes: ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
      resposta_correta: 0,
      peso: 1
    },
    certificado: {
      url_certificado: 'https://example.com/certificado.pdf',
      status: 'INATIVO' as const
    }
  };

  beforeAll(async () => {
    // Criar tokens de autenticação
    const authTest = new BaseTest('/api/auth');
    
    // Criar usuário admin para testes
    await authTest.testCreate({
      ...testData.usuario,
      email: 'admin@test.com',
      cpf: '11111111111',
      tipo: 'ADMIN'
    });

    // Criar usuário comum para testes
    await authTest.testCreate({
      ...testData.usuario,
      email: 'user@test.com',
      cpf: '22222222222',
      tipo: 'USER'
    });

    // Fazer login para obter tokens
    const adminResponse = await authTest.testCreate({
      email: 'admin@test.com',
      senha: '123456'
    });
    adminToken = adminResponse.body.token;

    const userResponse = await authTest.testCreate({
      email: 'user@test.com',
      senha: '123456'
    });
    userToken = userResponse.body.token;

    await authTest.cleanup();
  });

  afterAll(async () => {
    // Limpar dados de teste
    try {
      await prisma.respostaQuestao.deleteMany({ where: {} });
      await prisma.tentativasProva.deleteMany({ where: {} });
      await prisma.questao.deleteMany({ where: {} });
      await prisma.prova.deleteMany({ where: {} });
      await prisma.aulasConcluidas.deleteMany({ where: {} });
      await prisma.cursosConcluidos.deleteMany({ where: {} });
      await prisma.certificado.deleteMany({ where: {} });
      await prisma.aula.deleteMany({ where: {} });
      await prisma.modulo.deleteMany({ where: {} });
      await prisma.liberacaoCurso.deleteMany({ where: {} });
      await prisma.funcaoCurso.deleteMany({ where: {} });
      await prisma.usuario.deleteMany({ where: {} });
      await prisma.funcao.deleteMany({ where: {} });
      await prisma.fazenda.deleteMany({ where: {} });
      await prisma.curso.deleteMany({ where: {} });
      await prisma.distrito.deleteMany({ where: {} });
      await prisma.municipio.deleteMany({ where: {} });
      await prisma.estado.deleteMany({ where: {} });
    } catch (error) {
      console.error('Erro ao limpar dados de teste:', error);
    } finally {
      await prisma.$disconnect();
    }
  });

  describe('🔐 Auth Endpoints', () => {
    let authTest: BaseTest;

    beforeEach(() => {
      authTest = new BaseTest('/api/auth');
    });

    afterEach(async () => {
      await authTest.cleanup();
    });

    it('should register a new user', async () => {
      const response = await authTest.testCreate({
        ...testData.usuario,
        email: 'newuser@test.com',
        cpf: '33333333333'
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe('newuser@test.com');
    });

    it('should login with valid credentials', async () => {
      const response = await authTest.testCreate({
        email: 'admin@test.com',
        senha: '123456'
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('refreshToken');
      expect(response.body).toHaveProperty('user');
    });

    it('should refresh token', async () => {
      const refreshResponse = await authTest.request.post('/api/auth/refresh-token').send({
        refreshToken: 'valid_refresh_token_here'
      });

      expect(refreshResponse.status).toBe(200);
      expect(refreshResponse.body).toHaveProperty('token');
    });
  });

  describe('👥 Usuario Endpoints', () => {
    let usuarioTest: BaseTest;

    beforeEach(() => {
      usuarioTest = new BaseTest('/api/usuario');
    });

    afterEach(async () => {
      await usuarioTest.cleanup();
    });

    it('should get all users (admin only)', async () => {
      const response = await usuarioTest.authenticatedRequest(adminToken)
        .get('/api/usuario');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should create a new user', async () => {
      const response = await usuarioTest.testCreate({
        ...testData.usuario,
        email: 'createuser@test.com',
        cpf: '44444444444'
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id_usuario');
      testIds.usuario = response.body.id_usuario;
    });

    it('should update a user (admin only)', async () => {
      const updateData = { nome: 'Nome Atualizado' };
      const response = await usuarioTest.authenticatedRequest(adminToken)
        .put(`/api/usuario/${testIds.usuario}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.nome).toBe('Nome Atualizado');
    });

    it('should delete a user (admin only)', async () => {
      const response = await usuarioTest.authenticatedRequest(adminToken)
        .delete('/api/usuario')
        .send({ id: testIds.usuario });

      expect(response.status).toBe(200);
    });
  });

  describe('🏢 Funcao Endpoints', () => {
    let funcaoTest: BaseTest;

    beforeEach(() => {
      funcaoTest = new BaseTest('/api/funcao');
    });

    afterEach(async () => {
      await funcaoTest.cleanup();
    });

    it('should get all funcoes (admin only)', async () => {
      const response = await funcaoTest.authenticatedRequest(adminToken)
        .get('/api/funcao');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should create a new funcao (admin only)', async () => {
      const response = await funcaoTest.authenticatedRequest(adminToken)
        .post('/api/funcao')
        .send(testData.funcao);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id_funcao');
      testIds.funcao = response.body.id_funcao;
    });

    it('should update a funcao (admin only)', async () => {
      const updateData = { nome: 'Função Atualizada' };
      const response = await funcaoTest.authenticatedRequest(adminToken)
        .put(`/api/funcao/${testIds.funcao}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.nome).toBe('Função Atualizada');
    });

    it('should delete a funcao (admin only)', async () => {
      const response = await funcaoTest.authenticatedRequest(adminToken)
        .delete('/api/funcao')
        .send({ id: testIds.funcao });

      expect(response.status).toBe(200);
    });
  });

  describe('🏞️ Fazenda Endpoints', () => {
    let fazendaTest: BaseTest;

    beforeEach(() => {
      fazendaTest = new BaseTest('/api/fazenda');
    });

    afterEach(async () => {
      await fazendaTest.cleanup();
    });

    it('should get all fazendas (admin only)', async () => {
      const response = await fazendaTest.authenticatedRequest(adminToken)
        .get('/api/fazenda');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should create a new fazenda (admin only)', async () => {
      const response = await fazendaTest.authenticatedRequest(adminToken)
        .post('/api/fazenda')
        .send(testData.fazenda);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id_fazenda');
      testIds.fazenda = response.body.id_fazenda;
    });

    it('should update a fazenda (admin only)', async () => {
      const updateData = { nome: 'Fazenda Atualizada' };
      const response = await fazendaTest.authenticatedRequest(adminToken)
        .put(`/api/fazenda/${testIds.fazenda}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.nome).toBe('Fazenda Atualizada');
    });

    it('should delete a fazenda (admin only)', async () => {
      const response = await fazendaTest.authenticatedRequest(adminToken)
        .delete('/api/fazenda')
        .send({ id: testIds.fazenda });

      expect(response.status).toBe(200);
    });
  });

  describe('📚 Curso Endpoints', () => {
    let cursoTest: BaseTest;

    beforeEach(() => {
      cursoTest = new BaseTest('/api/curso');
    });

    afterEach(async () => {
      await cursoTest.cleanup();
    });

    it('should get all cursos (admin only)', async () => {
      const response = await cursoTest.authenticatedRequest(adminToken)
        .get('/api/curso');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get cursos disponíveis para usuário (admin only)', async () => {
      const response = await cursoTest.authenticatedRequest(adminToken)
        .get('/api/curso/usuario');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should create a new curso (admin only)', async () => {
      const response = await cursoTest.authenticatedRequest(adminToken)
        .post('/api/curso')
        .send(testData.curso);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id_curso');
      testIds.curso = response.body.id_curso;
    });

    it('should update a curso (admin only)', async () => {
      const updateData = { titulo: 'Curso Atualizado' };
      const response = await cursoTest.authenticatedRequest(adminToken)
        .put(`/api/curso/${testIds.curso}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.titulo).toBe('Curso Atualizado');
    });

    it('should delete a curso (admin only)', async () => {
      const response = await cursoTest.authenticatedRequest(adminToken)
        .delete('/api/curso')
        .send({ id: testIds.curso });

      expect(response.status).toBe(200);
    });
  });

  describe('📖 Modulo Endpoints', () => {
    let moduloTest: BaseTest;

    beforeEach(() => {
      moduloTest = new BaseTest('/api/modulo');
    });

    afterEach(async () => {
      await moduloTest.cleanup();
    });

    it('should get all modulos (authenticated)', async () => {
      const response = await moduloTest.authenticatedRequest(userToken)
        .get('/api/modulo');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get modulo by id (authenticated)', async () => {
      const response = await moduloTest.authenticatedRequest(userToken)
        .get(`/api/modulo/${testIds.modulo || 1}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id_modulo');
    });

    it('should get modulos by curso id (authenticated)', async () => {
      const response = await moduloTest.authenticatedRequest(userToken)
        .get(`/api/modulo/all/${testIds.curso || 1}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should create a new modulo (admin only)', async () => {
      const moduloData = {
        ...testData.modulo,
        fk_id_curso: testIds.curso
      };

      const response = await moduloTest.authenticatedRequest(adminToken)
        .post('/api/modulo')
        .send(moduloData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id_modulo');
      testIds.modulo = response.body.id_modulo;
    });

    it('should update a modulo (admin only)', async () => {
      const updateData = { titulo: 'Módulo Atualizado' };
      const response = await moduloTest.authenticatedRequest(adminToken)
        .put(`/api/modulo/${testIds.modulo}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.titulo).toBe('Módulo Atualizado');
    });

    it('should delete a modulo (admin only)', async () => {
      const response = await moduloTest.authenticatedRequest(adminToken)
        .delete('/api/modulo')
        .send({ id: testIds.modulo });

      expect(response.status).toBe(200);
    });
  });

  describe('🎥 Aula Endpoints', () => {
    let aulaTest: BaseTest;

    beforeEach(() => {
      aulaTest = new BaseTest('/api/aula');
    });

    afterEach(async () => {
      await aulaTest.cleanup();
    });

    it('should get all aulas (authenticated)', async () => {
      const response = await aulaTest.authenticatedRequest(userToken)
        .get('/api/aula');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get aula by id (authenticated)', async () => {
      const response = await aulaTest.authenticatedRequest(userToken)
        .get(`/api/aula/${testIds.aula || 1}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id_aula');
    });

    it('should create a new aula (admin only)', async () => {
      const aulaData = {
        ...testData.aula,
        fk_id_modulo: testIds.modulo
      };

      const response = await aulaTest.authenticatedRequest(adminToken)
        .post('/api/aula')
        .send(aulaData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id_aula');
      testIds.aula = response.body.id_aula;
    });

    it('should update a aula (admin only)', async () => {
      const updateData = { titulo: 'Aula Atualizada' };
      const response = await aulaTest.authenticatedRequest(adminToken)
        .put(`/api/aula/${testIds.aula}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.titulo).toBe('Aula Atualizada');
    });

    it('should delete a aula (admin only)', async () => {
      const response = await aulaTest.authenticatedRequest(adminToken)
        .delete('/api/aula')
        .send({ id: testIds.aula });

      expect(response.status).toBe(200);
    });
  });

  describe('📝 Prova Endpoints', () => {
    let provaTest: BaseTest;

    beforeEach(() => {
      provaTest = new BaseTest('/api/prova');
    });

    afterEach(async () => {
      await provaTest.cleanup();
    });

    it('should get all provas (authenticated)', async () => {
      const response = await provaTest.authenticatedRequest(userToken)
        .get('/api/prova');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get prova by id (authenticated)', async () => {
      const response = await provaTest.authenticatedRequest(userToken)
        .get(`/api/prova/${testIds.prova || 1}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id_prova');
    });

    it('should create a new prova (admin only)', async () => {
      const provaData = {
        ...testData.prova,
        fk_id_modulo: testIds.modulo
      };

      const response = await provaTest.authenticatedRequest(adminToken)
        .post('/api/prova')
        .send(provaData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id_prova');
      testIds.prova = response.body.id_prova;
    });

    it('should update a prova (admin only)', async () => {
      const updateData = { nota_minima: 8.0 };
      const response = await provaTest.authenticatedRequest(adminToken)
        .put(`/api/prova/${testIds.prova}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.nota_minima).toBe(8.0);
    });

    it('should delete a prova (admin only)', async () => {
      const response = await provaTest.authenticatedRequest(adminToken)
        .delete('/api/prova')
        .send({ id: testIds.prova });

      expect(response.status).toBe(200);
    });
  });

  describe('❓ Questao Endpoints', () => {
    let questaoTest: BaseTest;

    beforeEach(() => {
      questaoTest = new BaseTest('/api/questao');
    });

    afterEach(async () => {
      await questaoTest.cleanup();
    });

    it('should get all questoes (authenticated)', async () => {
      const response = await questaoTest.authenticatedRequest(userToken)
        .get('/api/questao');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get questao by id (authenticated)', async () => {
      const response = await questaoTest.authenticatedRequest(userToken)
        .get(`/api/questao/${testIds.questao || 1}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id_questao');
    });

    it('should create a new questao (admin only)', async () => {
      const questaoData = {
        ...testData.questao,
        fk_id_prova: testIds.prova
      };

      const response = await questaoTest.authenticatedRequest(adminToken)
        .post('/api/questao')
        .send(questaoData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id_questao');
      testIds.questao = response.body.id_questao;
    });

    it('should update a questao (admin only)', async () => {
      const updateData = { pergunta: 'Pergunta Atualizada?' };
      const response = await questaoTest.authenticatedRequest(adminToken)
        .put(`/api/questao/${testIds.questao}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.pergunta).toBe('Pergunta Atualizada?');
    });

    it('should delete a questao (admin only)', async () => {
      const response = await questaoTest.authenticatedRequest(adminToken)
        .delete('/api/questao')
        .send({ id: testIds.questao });

      expect(response.status).toBe(200);
    });
  });

  describe('📋 Certificado Endpoints', () => {
    let certificadoTest: BaseTest;

    beforeEach(() => {
      certificadoTest = new BaseTest('/api/certificado');
    });

    afterEach(async () => {
      await certificadoTest.cleanup();
    });

    it('should get all certificados (authenticated)', async () => {
      const response = await certificadoTest.authenticatedRequest(userToken)
        .get('/api/certificado');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get certificado by id (authenticated)', async () => {
      const response = await certificadoTest.authenticatedRequest(userToken)
        .get(`/api/certificado/${testIds.certificado || 1}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id_certificado');
    });

    it('should create a new certificado (authenticated)', async () => {
      const certificadoData = {
        ...testData.certificado,
        fk_id_usuario: testIds.usuario,
        fk_id_curso: testIds.curso
      };

      const response = await certificadoTest.authenticatedRequest(userToken)
        .post('/api/certificado')
        .send(certificadoData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id_certificado');
      testIds.certificado = response.body.id_certificado;
    });

    it('should update a certificado (authenticated)', async () => {
      const updateData = { status: 'GERADO' };
      const response = await certificadoTest.authenticatedRequest(userToken)
        .put(`/api/certificado/${testIds.certificado}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('GERADO');
    });

    it('should delete a certificado (authenticated)', async () => {
      const response = await certificadoTest.authenticatedRequest(userToken)
        .delete('/api/certificado')
        .send({ id: testIds.certificado });

      expect(response.status).toBe(200);
    });
  });

  describe('📍 Localizacao Endpoints', () => {
    let localizacaoTest: BaseTest;

    beforeEach(() => {
      localizacaoTest = new BaseTest('/api/localizacao');
    });

    afterEach(async () => {
      await localizacaoTest.cleanup();
    });

    it('should get all distritos (authenticated)', async () => {
      const response = await localizacaoTest.authenticatedRequest(userToken)
        .get('/api/localizacao');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get distrito by id (authenticated)', async () => {
      const response = await localizacaoTest.authenticatedRequest(userToken)
        .get(`/api/localizacao/${testIds.distrito || 1}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id_distrito');
    });
  });

  describe('🔗 Relacionamentos Endpoints', () => {
    describe('FuncaoCurso Endpoints', () => {
      let funcaoCursoTest: BaseTest;

      beforeEach(() => {
        funcaoCursoTest = new BaseTest('/api/funcaocurso');
      });

      afterEach(async () => {
        await funcaoCursoTest.cleanup();
      });

      it('should get all funcao-cursos (admin only)', async () => {
        const response = await funcaoCursoTest.authenticatedRequest(adminToken)
          .get('/api/funcaocurso');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      it('should create funcao-curso relationship (admin only)', async () => {
        const response = await funcaoCursoTest.authenticatedRequest(adminToken)
          .post('/api/funcaocurso')
          .send({
            fk_id_funcao: testIds.funcao,
            fk_id_curso: testIds.curso
          });

        expect(response.status).toBe(201);
      });
    });

    describe('UsuarioFuncao Endpoints', () => {
      let usuarioFuncaoTest: BaseTest;

      beforeEach(() => {
        usuarioFuncaoTest = new BaseTest('/api/usuariofuncao');
      });

      afterEach(async () => {
        await usuarioFuncaoTest.cleanup();
      });

      it('should get all usuario-funcoes (admin only)', async () => {
        const response = await usuarioFuncaoTest.authenticatedRequest(adminToken)
          .get('/api/usuariofuncao');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      it('should create usuario-funcao relationship (admin only)', async () => {
        const response = await usuarioFuncaoTest.authenticatedRequest(adminToken)
          .post('/api/usuariofuncao')
          .send({
            fk_id_usuario: testIds.usuario,
            fk_id_funcao: testIds.funcao
          });

        expect(response.status).toBe(201);
      });
    });

    describe('LiberacaoCurso Endpoints', () => {
      let liberacaoCursoTest: BaseTest;

      beforeEach(() => {
        liberacaoCursoTest = new BaseTest('/api/liberacaocurso');
      });

      afterEach(async () => {
        await liberacaoCursoTest.cleanup();
      });

      it('should get all liberacoes (admin only)', async () => {
        const response = await liberacaoCursoTest.authenticatedRequest(adminToken)
          .get('/api/liberacaocurso');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      it('should create liberacao (admin only)', async () => {
        const response = await liberacaoCursoTest.authenticatedRequest(adminToken)
          .post('/api/liberacaocurso')
          .send({
            fk_id_curso: testIds.curso,
            fk_id_usuario_admin: testIds.usuario,
            fk_id_usuario_funcionario: testIds.usuario,
            data_liberacao: new Date().toISOString()
          });

        expect(response.status).toBe(201);
      });
    });
  });

  describe('📊 Progresso Endpoints', () => {
    describe('AulasConcluidas Endpoints', () => {
      let aulasConcluidasTest: BaseTest;

      beforeEach(() => {
        aulasConcluidasTest = new BaseTest('/api/aulasconcluidas');
      });

      afterEach(async () => {
        await aulasConcluidasTest.cleanup();
      });

      it('should get all aulas concluidas (authenticated)', async () => {
        const response = await aulasConcluidasTest.authenticatedRequest(userToken)
          .get('/api/aulasconcluidas');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      it('should create aula concluida (authenticated)', async () => {
        const response = await aulasConcluidasTest.authenticatedRequest(userToken)
          .post('/api/aulasconcluidas')
          .send({
            fk_id_aula: testIds.aula,
            fk_id_modulo: testIds.modulo
          });

        expect(response.status).toBe(201);
      });
    });

    describe('CursosConcluidos Endpoints', () => {
      let cursosConcluidosTest: BaseTest;

      beforeEach(() => {
        cursosConcluidosTest = new BaseTest('/api/cursosconcluidos');
      });

      afterEach(async () => {
        await cursosConcluidosTest.cleanup();
      });

      it('should get all cursos concluidos (authenticated)', async () => {
        const response = await cursosConcluidosTest.authenticatedRequest(userToken)
          .get('/api/cursosconcluidos');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      it('should create curso concluido (authenticated)', async () => {
        const response = await cursosConcluidosTest.authenticatedRequest(userToken)
          .post('/api/cursosconcluidos')
          .send({
            fk_id_aula: testIds.aula
          });

        expect(response.status).toBe(201);
      });
    });

    describe('TentativasProva Endpoints', () => {
      let tentativasProvaTest: BaseTest;

      beforeEach(() => {
        tentativasProvaTest = new BaseTest('/api/tentativasprova');
      });

      afterEach(async () => {
        await tentativasProvaTest.cleanup();
      });

      it('should get all tentativas (authenticated)', async () => {
        const response = await tentativasProvaTest.authenticatedRequest(userToken)
          .get('/api/tentativasprova');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      it('should create tentativa (authenticated)', async () => {
        const response = await tentativasProvaTest.authenticatedRequest(userToken)
          .post('/api/tentativasprova')
          .send({
            fk_id_prova: testIds.prova,
            fk_id_ciclo_modulo: 1,
            nota: 8.5,
            data_tentativa: new Date().toISOString()
          });

        expect(response.status).toBe(201);
      });
    });

    describe('RespostaQuestao Endpoints', () => {
      let respostaQuestaoTest: BaseTest;

      beforeEach(() => {
        respostaQuestaoTest = new BaseTest('/api/respostaQuestao');
      });

      afterEach(async () => {
        await respostaQuestaoTest.cleanup();
      });

      it('should get all respostas (authenticated)', async () => {
        const response = await respostaQuestaoTest.authenticatedRequest(userToken)
          .get('/api/respostaQuestao');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      it('should create resposta (authenticated)', async () => {
        const response = await respostaQuestaoTest.authenticatedRequest(userToken)
          .post('/api/respostaQuestao')
          .send({
            fk_id_questao: testIds.questao,
            fk_id_tentativa_prova: 1,
            resposta_selecionada: 0,
            correta: true
          });

        expect(response.status).toBe(201);
      });
    });
  });

  describe('🔒 Authorization Tests', () => {
    it('should deny access to admin endpoints for regular users', async () => {
      const cursoTest = new BaseTest('/api/curso');
      
      try {
        const response = await cursoTest.authenticatedRequest(userToken)
          .get('/api/curso');

        expect(response.status).toBe(403);
      } finally {
        await cursoTest.cleanup();
      }
    });

    it('should deny access to protected endpoints without token', async () => {
      const usuarioTest = new BaseTest('/api/usuario');
      
      try {
        const response = await usuarioTest.request.get('/api/usuario');

        expect(response.status).toBe(401);
      } finally {
        await usuarioTest.cleanup();
      }
    });

    it('should allow access to public endpoints without token', async () => {
      const authTest = new BaseTest('/api/auth');
      
      try {
        const response = await authTest.testCreate({
          email: 'test@example.com',
          senha: '123456'
        });

        expect(response.status).toBe(401); // Login falha com credenciais inválidas
      } finally {
        await authTest.cleanup();
      }
    });
  });

  describe('📈 Performance Tests', () => {
    it('should handle multiple concurrent requests', async () => {
      const usuarioTest = new BaseTest('/api/usuario');
      
      try {
        const promises = Array(10).fill(null).map(() =>
          usuarioTest.authenticatedRequest(adminToken).get('/api/usuario')
        );

        const responses = await Promise.all(promises);
        
        responses.forEach(response => {
          expect(response.status).toBe(200);
        });
      } finally {
        await usuarioTest.cleanup();
      }
    });

    it('should handle large data sets', async () => {
      const cursoTest = new BaseTest('/api/curso');
      
      try {
        // Criar múltiplos cursos
        const createPromises = Array(5).fill(null).map((_, index) =>
          cursoTest.authenticatedRequest(adminToken)
            .post('/api/curso')
            .send({
              ...testData.curso,
              titulo: `Curso ${index + 1}`,
              descricao: `Descrição do curso ${index + 1}`
            })
        );

        await Promise.all(createPromises);

        // Buscar todos os cursos
        const response = await cursoTest.authenticatedRequest(adminToken)
          .get('/api/curso');

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBeGreaterThanOrEqual(5);
      } finally {
        await cursoTest.cleanup();
      }
    });
  });
}); 