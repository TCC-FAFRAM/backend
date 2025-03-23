import { Curso } from '@prisma/client';
import { CursoRepository } from '../repositories/CursoRepository';

class CursoService {
  // Criar um novo curso
  static async createCurso(titulo: string, descricao: string): Promise<Curso> {
    try {
      return await CursoRepository.createCurso({ titulo, descricao });
    } catch (error) {
      console.error('Erro no serviço ao criar curso:', error);
      throw error;
    }
  }

  // Obter todos os cursos
  static async getAllCursos(): Promise<Curso[]> {
    try {
      return await CursoRepository.getAllCursos();
    } catch (error) {
      console.error('Erro no serviço ao obter todos os cursos:', error);
      throw error;
    }
  }

  // Obter um curso pelo ID
  static async getCursoById(id_curso: number): Promise<Curso | null> {
    try {
      return await CursoRepository.getCursoById(id_curso);
    } catch (error) {
      console.error('Erro no serviço ao buscar curso por ID:', error);
      throw error;
    }
  }

  // Atualizar um curso
  static async updateCurso(
    id_curso: number,
    cursoData: Partial<Curso>
  ): Promise<Curso> {
    try {
      return await CursoRepository.updateCurso(id_curso, cursoData);
    } catch (error) {
      console.error('Erro no serviço ao atualizar curso:', error);
      throw error;
    }
  }

  // Excluir um curso
  static async deleteCurso(id_curso: number): Promise<Curso> {
    try {
      return await CursoRepository.deleteCurso(id_curso);
    } catch (error) {
      console.error('Erro no serviço ao excluir curso:', error);
      throw error;
    }
  }

  // Obter cursos pelo email do usuário
  static async getCursosByEmail(email: string): Promise<Curso[]> {
    try {
      return await CursoRepository.getCursosByEmail(email);
    } catch (error) {
      console.error('Erro no serviço ao obter cursos do usuário pelo email:', error);
      throw error;
    }
  }
}

export default CursoService;
