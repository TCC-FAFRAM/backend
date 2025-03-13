import { PrismaClient, Aula, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class AulaRepository {
  // Criar uma nova aula
  static async createAula(aulaData: Prisma.AulaCreateInput): Promise<Aula> {
    try {
      return await prisma.aula.create({ data: aulaData });
    } catch (error) {
      console.error('Erro ao criar aula:', error);
      throw error;
    }
  }

  // Obter todas as aulas
  static async getAllAulas(): Promise<Aula[]> {
    try {
      return await prisma.aula.findMany();
    } catch (error) {
      console.error('Erro ao obter todas as aulas:', error);
      throw error;
    }
  }

  // Obter uma aula por ID
  static async getAulaById(id_aula: number): Promise<Aula | null> {
    try {
      return await prisma.aula.findUnique({ where: { id_aula } });
    } catch (error) {
      console.error('Erro ao buscar aula por ID:', error);
      throw error;
    }
  }

  // Atualizar uma aula existente
  static async updateAula(
    id_aula: number,
    aulaData: Partial<Prisma.AulaUpdateInput>
  ): Promise<Aula> {
    try {
      return await prisma.aula.update({
        where: { id_aula },
        data: aulaData,
      });
    } catch (error) {
      console.error('Erro ao atualizar aula:', error);
      throw error;
    }
  }

  // Excluir uma aula
  static async deleteAula(id_aula: number): Promise<Aula> {
    try {
      return await prisma.aula.delete({
        where: { id_aula },
      });
    } catch (error) {
      console.error('Erro ao excluir aula:', error);
      throw error;
    }
  }
}
