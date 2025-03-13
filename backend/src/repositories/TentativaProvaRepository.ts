import { Prisma, PrismaClient, TentativasProva } from '@prisma/client';

const prisma = new PrismaClient();

export class TentativaProvaRepository {
  // Criar uma nova tentativa de prova
  static async createTentativaProva(tentativaData: Prisma.TentativasProvaCreateInput): Promise<TentativasProva> {
    try {
      return await prisma.tentativasProva.create({ data: tentativaData });
    } catch (error) {
      console.error('Erro ao criar tentativa de prova:', error);
      throw error;
    }
  }

  // Obter todas as tentativas de provas
  static async getAllTentativasProvas(): Promise<TentativasProva[]> {
    try {
      return await prisma.tentativasProva.findMany();
    } catch (error) {
      console.error('Erro ao obter todas as tentativas de provas:', error);
      throw error;
    }
  }

  // Obter uma tentativa de prova por ID
  static async getTentativaProvaById(id_tentativa_prova: number): Promise<TentativasProva | null> {
    try {
      return await prisma.tentativasProva.findUnique({ where: { id_tentativa_prova } });
    } catch (error) {
      console.error('Erro ao buscar tentativa de prova por ID:', error);
      throw error;
    }
  }

  // Obter tentativas de prova por ID do funcionário
  static async getTentativasByFuncionario(fk_id_funcionario: number): Promise<TentativasProva[]> {
    try {
      return await prisma.tentativasProva.findMany({ where: { fk_id_funcionario } });
    } catch (error) {
      console.error('Erro ao buscar tentativas de prova por ID de funcionário:', error);
      throw error;
    }
  }

  // Atualizar uma tentativa de prova
  static async updateTentativaProva(
    id_tentativa_prova: number,
    tentativaData: Partial<Prisma.TentativasProvaUpdateInput>
  ): Promise<TentativasProva> {
    try {
      return await prisma.tentativasProva.update({
        where: { id_tentativa_prova },
        data: tentativaData,
      });
    } catch (error) {
      console.error('Erro ao atualizar tentativa de prova:', error);
      throw error;
    }
  }

  // Excluir uma tentativa de prova
  static async deleteTentativaProva(id_tentativa_prova: number): Promise<TentativasProva> {
    try {
      return await prisma.tentativasProva.delete({
        where: { id_tentativa_prova },
      });
    } catch (error) {
      console.error('Erro ao excluir tentativa de prova:', error);
      throw error;
    }
  }
}
