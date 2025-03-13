import { PrismaClient, Funcao } from '@prisma/client';

const prisma = new PrismaClient();

export class FuncaoRepository {
  // Criar uma nova função
  static async createFuncao(funcaoData: Omit<Funcao, 'id_funcao'>): Promise<Funcao> {
    try {
      return await prisma.funcao.create({ data: funcaoData });
    } catch (error) {
      console.error('Erro ao criar função:', error);
      throw error;
    }
  }

  // Obter todas as funções
  static async getAllFuncoes(): Promise<Funcao[]> {
    try {
      return await prisma.funcao.findMany();
    } catch (error) {
      console.error('Erro ao obter todas as funções:', error);
      throw error;
    }
  }

  // Obter uma função por ID
  static async getByIdFuncao(id_funcao: number): Promise<Funcao | null> {
    try {
      return await prisma.funcao.findUnique({ where: { id_funcao } });
    } catch (error) {
      console.error('Erro ao buscar função por ID:', error);
      throw error;
    }
  }

  // Atualizar uma função existente
  static async updateFuncao(id_funcao: number, funcaoData: Partial<Omit<Funcao, 'id_funcao'>>): Promise<Funcao> {
    try {
      return await prisma.funcao.update({
        where: { id_funcao },
        data: funcaoData
      });
    } catch (error) {
      console.error('Erro ao atualizar função:', error);
      throw error;
    }
  }

  // Excluir uma função por ID
  static async deleteFuncao(id_funcao: number): Promise<Funcao> {
    try {
      return await prisma.funcao.delete({ where: { id_funcao } });
    } catch (error) {
      console.error('Erro ao excluir função:', error);
      throw error;
    }
  }
}
