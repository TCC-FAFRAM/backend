import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { Usuario } from '@prisma/client';
import { UserRepository } from '../models/UserRepository';

class AuthService {
  static async login(email: string, password: string): Promise<{ user: Usuario; token: string; refreshToken: string }> {
    const user = await UserRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.senha))) {
      throw new Error('Credenciais inválidas');
    }

    const secret = process.env.JWT_SECRET as string;
    const expiresInValue = '1h';  // Expiração curta para o access token
    const refreshTokenExpiresIn = '7d';  // Expiração longa para o refresh token

    // Gera o access token
    const accessToken = jwt.sign(
      { nome: `${user.nome} ${user.sobre_nome}`, email: user.email, role: user.tipo },
      secret,
      { expiresIn: expiresInValue }
    );

    // Gera o refresh token
    const refreshToken = jwt.sign(
      { id: user.id_usuario },
      secret,
      { expiresIn: refreshTokenExpiresIn }
    );

    return { user, token: accessToken, refreshToken };
  }

  // Função para trocar o refresh token por um novo access token
  static async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const secret = process.env.JWT_SECRET as string;

      // Verifica e decodifica o refresh token
      const decoded: any = jwt.verify(refreshToken, secret);

      // Gera um novo access token
      const accessToken = jwt.sign(
        { id: decoded.id, role: decoded.role },
        secret,
        { expiresIn: '1h' }
      );

      return accessToken;
    } catch (error) {
      throw new Error('Refresh token inválido ou expirado');
    }
  }

  static async register(userData: Omit<Usuario, 'id'>): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(userData.senha, 10);
    return UserRepository.createUser({
      ...userData,
      senha: hashedPassword,
      
    });
  }
}

export default AuthService;
