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

  // ✅ Obter cursos de acordo com o email do usuário
  static async getCursosByEmail(email: string): Promise<Curso[]> {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { email },
        include: { LiberacoesCursoFuncionario: true }, // Traz as liberações de curso do usuário
      });

      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }

      return await prisma.curso.findMany({
        where: {
          LiberacoesCurso: {
            some: {
              fk_id_funcionario: usuario.id_usuario, // Verifica se há liberação para este usuário
            },
          },
        },
        include: {
          Aulas: true, // Inclui as aulas associadas ao curso
          Prova: true, // Inclui a prova associada ao curso, se houver
        },
      });
    } catch (error) {
      console.error('Erro ao obter cursos do usuário pelo email:', error);
      throw error;
    }
  }
}
