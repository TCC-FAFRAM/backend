import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
  role: 'USER' | 'ADMIN' | 'MASTER';
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

// Middleware de autenticação
export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Acesso não autorizado' });
    return; // Retorna antes de continuar
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    req.user = decoded;
    next(); // Chama o próximo middleware
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Middleware de autorização para administradores
export const adminOnly = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'ADMIN') {
    res.status(403).json({ error: 'Acesso restrito a (MASTER)' });
    return; // Retorna antes de continuar
  }
  next(); // Chama o próximo middleware
};


// Middleware de autorização para MASTER
export const masterOnly = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'MASTER') {
    res.status(403).json({ error: 'Não Verificado' });
    return; // Retorna antes de continuar
  }
  next(); // Chama o próximo middleware
};
