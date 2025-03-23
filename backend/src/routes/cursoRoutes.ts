import express from 'express';

import { auth, adminOnly, masterOnly } from '../middleware/auth';
import CursoController from '../controllers/CursoController';

const router = express.Router();

// Criar um novo curso (Apenas Admin e Master podem criar)
router.post('/', auth, adminOnly, masterOnly, CursoController.createCurso);

// Obter todos os cursos (Acesso para usuários autenticados)
router.get('/', auth, CursoController.getAllCursos);

// Obter um curso pelo ID (Acesso para usuários autenticados)
router.get('/:id', auth, CursoController.getCursoById);

// Atualizar um curso (Apenas Admin e Master podem atualizar)
router.put('/:id', auth, adminOnly, masterOnly, CursoController.updateCurso);

// Excluir um curso (Apenas Admin e Master podem excluir)
router.delete('/:id', auth, adminOnly,masterOnly, CursoController.deleteCurso);

// Obter cursos pelo email do usuário (Usuário autenticado pode ver seus cursos)
router.get('/usuario/:email', auth, CursoController.getCursosByEmail);

export default router;
