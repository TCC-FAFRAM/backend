import { PrismaClient, Usuario } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  static async getAllUsers(): Promise<Usuario[]> {
    return prisma.usuario.findMany();
  }

  static async createUser(userData: Omit<Usuario, 'id'>): Promise<Usuario> {
    try {
      const existingUser = await prisma.usuario.findUnique({ where: { email: userData.email } });

      if (existingUser) {
        throw new Error('Usuário já Cadastrado existe!');
      }

      return await prisma.usuario.create({ data: userData });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  static async findByEmail(email: string): Promise<Usuario | null> {
    try {
      return await prisma.usuario.findUnique({ where: { email } });
    } catch (error) {
      console.error('Erro ao buscar usuário por e-mail:', error);
      throw error;
    }
  }

  static async getById(id_usuario: number): Promise<Usuario | null> {
    try {
      return await prisma.usuario.findUnique({ where: { id_usuario } });
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      throw error;
    }
  }
}
