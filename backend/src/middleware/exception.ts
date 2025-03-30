import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { AppError } from '../utils/app_error';


const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Erro capturado:', err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        res.status(409).json({ success: false, message: 'Valor duplicado.' });
        return;
      case 'P2003':
        res.status(400).json({ success: false, message: 'Chave estrangeira inválida.' });
        return;
      case 'P2025':
        res.status(404).json({ success: false, message: 'Registro não encontrado.' });
        return;
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({ success: false, message: 'Erro de validação dos dados.' });
    return;
  }

  res.status(500).json({ success: false, message: err.message || 'Erro interno.' });
};

export default errorHandler;
