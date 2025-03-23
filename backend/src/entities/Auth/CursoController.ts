import { Request, Response } from 'express';
import CursoService from '../service/CursoService';

class CursoController {
  static async createCurso(req: Request, res: Response): Promise<void> {
    try {
      const { titulo, descricao } = req.body;
      const curso = await CursoService.createCurso(titulo, descricao);
      res.status(201).json(curso);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getAllCursos(req: Request, res: Response): Promise<void> {
    try {
      const cursos = await CursoService.getAllCursos();
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getCursoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const curso = await CursoService.getCursoById(Number(id));

      if (!curso) {
        res.status(404).json({ error: 'Curso não encontrado' });
        return;
      }

      res.status(200).json(curso);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async updateCurso(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const cursoData = req.body;
      const cursoAtualizado = await CursoService.updateCurso(Number(id), cursoData);

      res.status(200).json(cursoAtualizado);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async deleteCurso(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await CursoService.deleteCurso(Number(id));
      res.status(200).json({ message: 'Curso excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getCursosByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const cursos = await CursoService.getCursosByEmail(email);

      if (!cursos.length) {
        res.status(404).json({ message: 'Nenhum curso encontrado para esse usuário' });
        return;
      }

      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default CursoController;
