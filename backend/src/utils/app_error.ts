import { Prisma } from '@prisma/client';

export class AppError extends Error {
    public readonly statusCode: number;
  
    constructor(message: string, statusCode = 400) {
      super(message);
      this.statusCode = statusCode;
  
      Object.setPrototypeOf(this, AppError.prototype);
    }
  }


  
  export function handlePrismaError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new AppError('Valor duplicado. Campo único já existe.', 409);
        case 'P2003':
          throw new AppError('Relacionamento inválido. Verifique as chaves estrangeiras.', 400);
        case 'P2025':
          throw new AppError('Registro não encontrado.', 404);
      }
    }
  
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new AppError('Erro de validação dos dados.', 422);
    }
  
    throw new AppError('Erro inesperado ao acessar o banco de dados.', 500);
  }
  