import { PrismaClient, FuncaoCurso, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class FuncaoCursoRepository {
  // Criar uma nova associação entre função e curso
  static async createFuncaoCurso(funcaoCursoData: Prisma.FuncaoCursoCreateInput): Promise<FuncaoCurso> {
    try {
      return await prisma.funcaoCurso.create({ data: funcaoCursoData });
    } catch (error) {
      console.error('Erro ao criar associação entre função e curso:', error);
      throw error;
    }
  }

  // Obter todas as associações entre funções e cursos
  static async getAllFuncaoCursos(): Promise<FuncaoCurso[]> {
    try {
      return await prisma.funcaoCurso.findMany();
    } catch (error) {
      console.error('Erro ao obter todas as associações entre funções e cursos:', error);
      throw error;
    }
  }

  // Obter associação entre função e curso por IDs
  static async getFuncaoCursoByIds(fk_id_funcao: number, fk_id_curso: number): Promise<FuncaoCurso | null> {
    try {
      return await prisma.funcaoCurso.findUnique({
        where: {
          fk_id_funcao_fk_id_curso: {
            fk_id_funcao,
            fk_id_curso,
          },
        },
      });
    } catch (error) {
      console.error('Erro ao buscar associação entre função e curso por IDs:', error);
      throw error;
    }
  }

  // Atualizar uma associação entre função e curso
  static async updateFuncaoCurso(
    fk_id_funcao: number,
    fk_id_curso: number,
    funcaoCursoData: Partial<Prisma.FuncaoCursoUpdateInput>
  ): Promise<FuncaoCurso> {
    try {
      return await prisma.funcaoCurso.update({
        where: {
          fk_id_funcao_fk_id_curso: {
            fk_id_funcao,
            fk_id_curso,
          },
        },
        data: funcaoCursoData,
      });
    } catch (error) {
      console.error('Erro ao atualizar associação entre função e curso:', error);
      throw error;
    }
  }

  // Excluir uma associação entre função e curso
  static async deleteFuncaoCurso(fk_id_funcao: number, fk_id_curso: number): Promise<FuncaoCurso> {
    try {
      return await prisma.funcaoCurso.delete({
        where: {
          fk_id_funcao_fk_id_curso: {
            fk_id_funcao,
            fk_id_curso,
          },
        },
      });
    } catch (error) {
      console.error('Erro ao excluir associação entre função e curso:', error);
      throw error;
    }
  }
}
