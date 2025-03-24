import { Request, Response } from 'express';
import AuthService from '../services/AuthService';


class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, senha } = req.body;
      const { user, token, refreshToken  } = await AuthService.login(email, senha);
      
      res.json({ 
        user: {
          id: user.id_usuario,
          nome: user.nome,
          email: user.email,
          tipo: user.tipo
        },
        token ,
        refreshToken
      });
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  }

  static async refresh(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new Error('Refresh token não fornecido');
      }

      // Troca o refresh token por um novo access token
      const newAccessToken = await AuthService.refreshAccessToken(refreshToken);
      
      res.json({ token: newAccessToken });
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  }


  static async register(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      const user = await AuthService.register(userData);
      
      res.status(201).json({
        id: user.id_usuario,
        name: user.nome,
        email: user.email,
        tipo: user.tipo,
        cpf:  user.cpf,
        complemento: user.complemento,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export default AuthController;