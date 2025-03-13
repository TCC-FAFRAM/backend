import { Prisma, PrismaClient, Prova } from '@prisma/client';

const prisma = new PrismaClient();

export class ProvaRepository {
  // Criar uma nova prova
  static async createProva(provaData: Prisma.ProvaCreateInput): Promise<Prova> {
    try {
      return await prisma.prova.create({ data: provaData });
    } catch (error) {
      console.error('Erro ao criar prova:', error);
      throw error;
    }
  }

  // Obter todas as provas
  static async getAllProvas(): Promise<Prova[]> {
    try {
      return await prisma.prova.findMany();
    } catch (error) {
      console.error('Erro ao obter todas as provas:', error);
      throw error;
    }
  }

  // Obter uma prova por ID
  static async getProvaById(id_prova: number): Promise<Prova | null> {
    try {
      return await prisma.prova.findUnique({ where: { id_prova } });
    } catch (error) {
      console.error('Erro ao buscar prova por ID:', error);
      throw error;
    }
  }

  // Obter uma prova por ID do curso
  static async getProvaByCursoId(fk_id_curso: number): Promise<Prova | null> {
    try {
      return await prisma.prova.findUnique({ where: { fk_id_curso } });
    } catch (error) {
      console.error('Erro ao buscar prova por ID de curso:', error);
      throw error;
    }
  }

  // Atualizar uma prova
  static async updateProva(
    id_prova: number,
    provaData: Partial<Prisma.ProvaUpdateInput>
  ): Promise<Prova> {
    try {
      return await prisma.prova.update({
        where: { id_prova },
        data: provaData,
      });
    } catch (error) {
      console.error('Erro ao atualizar prova:', error);
      throw error;
    }
  }

  // Excluir uma prova
  static async deleteProva(id_prova: number): Promise<Prova> {
    try {
      return await prisma.prova.delete({
        where: { id_prova },
      });
    } catch (error) {
      console.error('Erro ao excluir prova:', error);
      throw error;
    }
  }
}
