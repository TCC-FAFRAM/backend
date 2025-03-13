import { Request, Response } from 'express';
import UserService from '../service/UserService';


class UserController {
  // Método para buscar todos os usuários, com autenticação e restrição de acesso
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      // Chama o serviço para obter todos os usuários
      const users = await UserService.getAllUsers();
      res.json(users); // Retorna os usuários encontrados
    } catch (error) {
      res.status(500).json({ error: (error as Error).message }); // Erro do servidor
    }
  }

  // Método para criar um usuário, recebendo os dados de entrada
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.createUser(req.body); // Chama o serviço para criar o usuário
      res.status(201).json(user); // Retorna o usuário criado com status 201
    } catch (error) {
      res.status(500).json({ error: (error as Error).message }); // Erro do servidor
    }
  }

  // Método para buscar um usuário específico pelo ID
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.getUserById(req.user!.id); // Busca o usuário pelo ID (extraído do token)
      res.json({
        id: user.id_usuario, 
        name: user.nome,
        email: user.email,
        tipo: user.tipo,       
      });
    } catch (error) {
      res.status(404).json({ error: (error as Error).message }); // Usuário não encontrado
    }
  }
}

export default UserController;
