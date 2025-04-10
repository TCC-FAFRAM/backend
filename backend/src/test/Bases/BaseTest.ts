import express, { Express } from 'express';
import { Server } from 'http';
import supertest, { SuperTest, Test } from 'supertest';
import errorHandler from '../../middleware/exception';
import routes from '../../routers';

/**
 * Classe abstrata BaseTest que serve como base para os testes
 * Gerenciando a instanciação do servidor e fornecendo métodos para testar os controllers
 */
export abstract class BaseTest {
  protected app: Express;
  protected server: Server;
  protected request: SuperTest<Test>;
  protected baseUrl: string;

  /**
   * Construtor da classe BaseTest
   * @param baseUrl - URL base para os testes (ex: '/api/usuario')
   */
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.app = express();
    this.setupApp();
    this.server = this.app.listen(0); // Porta 0 para usar uma porta disponível
    this.request = supertest(this.app);
  }

  /**
   * Configura a aplicação Express para os testes
   */
  private setupApp(): void {
    this.app.use(express.json());
    this.app.use('/api', routes);
    this.app.use(errorHandler);
  }

  /**
   * Método para limpar recursos após os testes
   */
  public async cleanup(): Promise<void> {
    this.server.close();
  }

  /**
   * Método para testar o endpoint GET (getAll)
   * @param queryParams - Parâmetros de consulta opcionais
   * @returns Promise com a resposta da requisição
   */
  public async testGetAll(queryParams?: Record<string, string>): Promise<Test> {
    let url = this.baseUrl;

    if (queryParams) {
      const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      url += `?${queryString}`;
    }

    return this.request.get(url);
  }

  /**
   * Método para testar o endpoint GET por ID
   * @param id - ID do recurso
   * @returns Promise com a resposta da requisição
   */
  public async testGetById(id: number): Promise<Test> {
    return this.request.get(`${this.baseUrl}/${id}`);
  }

  /**
   * Método para testar o endpoint POST (create)
   * @param data - Dados para criar o recurso
   * @returns Promise com a resposta da requisição
   */
  public async testCreate(data: any): Promise<Test> {
    return this.request.post(this.baseUrl).send(data);
  }

  /**
   * Método para testar o endpoint PUT (update)
   * @param id - ID do recurso
   * @param data - Dados para atualizar o recurso
   * @returns Promise com a resposta da requisição
   */
  public async testUpdate(id: number, data: any): Promise<Test> {
    return this.request.put(`${this.baseUrl}/${id}`).send(data);
  }

  /**
   * Método para testar o endpoint DELETE
   * @param id - ID do recurso
   * @returns Promise com a resposta da requisição
   */
  public async testDelete(id: number): Promise<Test> {
    return this.request.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * Método para autenticar um usuário e obter um token JWT
   * @param credentials - Credenciais do usuário (email e senha)
   * @returns Promise com o token JWT
   */
  public async authenticate(): Promise<string> {
    const credentials = {
      email: 'admin@example.com',
      password: 'admin123'
    };

    const response = await this.request.post('/api/auth/login').send(credentials);
    return response.body.token;
  }

  /**
   * Método para criar uma requisição autenticada
   * @param token - Token JWT
   * @returns SuperTest com o token de autenticação
   */
  public authenticatedRequest(token: string): SuperTest<Test> {
    return supertest(this.app).set('Authorization', `Bearer ${token}`);
  }
} 