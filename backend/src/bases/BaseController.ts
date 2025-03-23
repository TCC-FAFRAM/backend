import { Request, Response } from "express";
import { IBaseService } from "./BaseService";

export interface IBaseController {
  getAll(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  //getById(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}

export abstract class BaseController<TypeData> implements IBaseController {

  protected readonly baseService: IBaseService<TypeData>;

  constructor(baseService: IBaseService<TypeData>) {
    this.baseService = baseService;
    this.getAll = this.getAll.bind(this.getAll);
    this.create = this.create.bind(this.create);
    //this.getById = this.getById.bind(this.getById);
    this.update = this.update.bind(this.update);
    this.delete = this.delete.bind(this.delete);
  }

  // Método para buscar todos os usuários, com autenticação e restrição de acesso
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      // Chama o serviço para obter todos os usuários
      const result = await this.baseService.getAll();
      res.json(result); // Retorna os usuários encontrados
    } catch (error) {
      res.status(500).json({ error: (error as Error).message }); // Erro do servidor
    }
  }

  // Método para criar um usuário, recebendo os dados de entrada
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const result = await this.baseService.create(data) // Chama o serviço para criar o usuário
      res.status(201).json(result); // Retorna o usuário criado com status 201
    } catch (error) {
      res.status(500).json({ error: (error as Error).message }); // Erro do servidor
    }
  }

  // Método para buscar um usuário específico pelo ID
  // async getById(req: Request, res: Response): Promise<void> {
  //   try {
  //     const result = await this.baseService.getById(req.data!.id); // Busca o usuário pelo ID (extraído do token)
      
  //     res.json(result.data);
  //     // res.json({
  //     //   id: user.id_usuario, 
  //     //   name: user.nome,
  //     //   email: user.email,
  //     //   tipo: user.tipo,       
  //     // });
  //   } catch (error) {
  //     res.status(404).json({ error: (error as Error).message }); // Usuário não encontrado
  //   }
  // }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const result = await this.baseService.update(id, data);
      res.json(result)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message }); // Erro do servidor
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.baseService.delete(req.body.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message }); // Erro do servidor
    }
  }

}