import { PrismaClient, Curso, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class CursoRepository {
  // Criar um novo curso
  static async createCurso(cursoData: Prisma.CursoCreateInput): Promise<Curso> {
    try {
      return await prisma.curso.create({ data: cursoData });
    } catch (error) {
      console.error('Erro ao criar curso:', error);
      throw error;
    }
  }

  // Obter todos os cursos
  static async getAllCursos(): Promise<Curso[]> {
    try {
      return await prisma.curso.findMany();
    } catch (error) {
      console.error('Erro ao obter todos os cursos:', error);
      throw error;
    }
  }

  // Obter um curso por ID
  static async getCursoById(id_curso: number): Promise<Curso | null> {
    try {
      return await prisma.curso.findUnique({
        where: { id_curso },
      });
    } catch (error) {
      console.error('Erro ao buscar curso por ID:', error);
      throw error;
    }
  }

  // Atualizar um curso
  static async updateCurso(
    id_curso: number,
    cursoData: Partial<Prisma.CursoUpdateInput>
  ): Promise<Curso> {
    try {
      return await prisma.curso.update({
        where: { id_curso },
        data: cursoData,
      });
    } catch (error) {
      console.error('Erro ao atualizar curso:', error);
      throw error;
    }
  }

  // Excluir um curso
  static async deleteCurso(id_curso: number): Promise<Curso> {
    try {
      return await prisma.curso.delete({
        where: { id_curso },
      });
    } catch (error) {
      console.error('Erro ao excluir curso:', error);
      throw error;
    }
  }
}
