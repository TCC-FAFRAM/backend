import { PrismaClient, LiberacaoCurso, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class LiberacaoCursoRepository {
  // Criar uma nova liberação de curso
  static async createLiberacaoCurso(liberacaoData: Prisma.LiberacaoCursoCreateInput): Promise<LiberacaoCurso> {
    try {
      return await prisma.liberacaoCurso.create({ data: liberacaoData });
    } catch (error) {
      console.error('Erro ao criar liberação de curso:', error);
      throw error;
    }
  }

  // Obter todas as liberações de cursos
  static async getAllLiberacoesCursos(): Promise<LiberacaoCurso[]> {
    try {
      return await prisma.liberacaoCurso.findMany();
    } catch (error) {
      console.error('Erro ao obter todas as liberações de cursos:', error);
      throw error;
    }
  }

  // Obter uma liberação de curso por ID
  static async getLiberacaoCursoById(id_liberacao_curso: number): Promise<LiberacaoCurso | null> {
    try {
      return await prisma.liberacaoCurso.findUnique({ where: { id_liberacao_curso } });
    } catch (error) {
      console.error('Erro ao buscar liberação de curso por ID:', error);
      throw error;
    }
  }

  // Obter liberações de curso por ID do funcionário
  static async getLiberacoesByFuncionario(fk_id_funcionario: number): Promise<LiberacaoCurso[]> {
    try {
      return await prisma.liberacaoCurso.findMany({ where: { fk_id_funcionario } });
    } catch (error) {
      console.error('Erro ao buscar liberações de curso por ID de funcionário:', error);
      throw error;
    }
  }

  // Atualizar uma liberação de curso
  static async updateLiberacaoCurso(
    id_liberacao_curso: number,
    liberacaoData: Partial<Prisma.LiberacaoCursoUpdateInput>
  ): Promise<LiberacaoCurso> {
    try {
      return await prisma.liberacaoCurso.update({
        where: { id_liberacao_curso },
        data: liberacaoData,
      });
    } catch (error) {
      console.error('Erro ao atualizar liberação de curso:', error);
      throw error;
    }
  }

  // Excluir uma liberação de curso
  static async deleteLiberacaoCurso(id_liberacao_curso: number): Promise<LiberacaoCurso> {
    try {
      return await prisma.liberacaoCurso.delete({
        where: { id_liberacao_curso },
      });
    } catch (error) {
      console.error('Erro ao excluir liberação de curso:', error);
      throw error;
    }
  }
}
