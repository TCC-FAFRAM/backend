import { User } from '@prisma/client'; // Se você estiver usando Prisma

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: 'USER' | 'ADMIN';
      }; // Aqui estamos definindo a propriedade user no Request
    }
  }
}
