import { PrismaClient, CursosConcluidos, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class CursosConcluidosRepository {
  // Criar um novo registro de curso concluído
  static async createCursoConcluido(cursoConcluidoData: Prisma.CursosConcluidosCreateInput): Promise<CursosConcluidos> {
    try {
      return await prisma.cursosConcluidos.create({ data: cursoConcluidoData });
    } catch (error) {
      console.error('Erro ao criar registro de curso concluído:', error);
      throw error;
    }
  }

  // Obter todos os registros de cursos concluídos
  static async getAllCursosConcluidos(): Promise<CursosConcluidos[]> {
    try {
      return await prisma.cursosConcluidos.findMany();
    } catch (error) {
      console.error('Erro ao obter todos os cursos concluídos:', error);
      throw error;
    }
  }

  // Obter um curso concluído por ID
  static async getCursoConcluidoById(id_concluidos: number): Promise<CursosConcluidos | null> {
    try {
      return await prisma.cursosConcluidos.findUnique({ where: { id_concluidos } });
    } catch (error) {
      console.error('Erro ao buscar curso concluído por ID:', error);
      throw error;
    }
  }

  // Obter todos os cursos concluídos por um usuário específico
  static async getCursosConcluidosByUsuarioId(fk_id_usuario: number): Promise<CursosConcluidos[]> {
    try {
      return await prisma.cursosConcluidos.findMany({
        where: { fk_id_usuario },
      });
    } catch (error) {
      console.error('Erro ao buscar cursos concluídos por usuário:', error);
      throw error;
    }
  }

  // Atualizar um registro de curso concluído
  static async updateCursoConcluido(
    id_concluidos: number,
    cursoConcluidoData: Partial<Prisma.CursosConcluidosUpdateInput>
  ): Promise<CursosConcluidos> {
    try {
      return await prisma.cursosConcluidos.update({
        where: { id_concluidos },
        data: cursoConcluidoData,
      });
    } catch (error) {
      console.error('Erro ao atualizar registro de curso concluído:', error);
      throw error;
    }
  }

  // Excluir um registro de curso concluído
  static async deleteCursoConcluido(id_concluidos: number): Promise<CursosConcluidos> {
    try {
      return await prisma.cursosConcluidos.delete({
        where: { id_concluidos },
      });
    } catch (error) {
      console.error('Erro ao excluir registro de curso concluído:', error);
      throw error;
    }
  }
}
