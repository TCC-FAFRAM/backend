import { Request } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  email: string;
  nome: string;
  role: 'USER' | 'ADMIN' | 'MASTER';
}

/**
 * Função utilitária para extrair o payload do token JWT a partir do Request
 * @param req Objeto da requisição Express
 * @returns TokenPayload decodificado
 * @throws Error se o token for inválido ou ausente
 */
export function returnSessionUsuario(req: Request): TokenPayload {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Token de autorização ausente ou inválido.');
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    return decoded;
  } catch (err) {
    console.error('Erro ao verificar token:', err);
    throw new Error('Token inválido ou expirado.');
  }
}
