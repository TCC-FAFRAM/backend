import express from 'express';
import { adminOnly, auth } from '../../middleware/auth';
import { CursoController } from './CursoController';

const cursoController = new CursoController();
const cursoRouter = express.Router();

cursoRouter.get('/', auth, adminOnly, cursoController.getAll);
cursoRouter.get('/:id', auth, adminOnly, cursoController.getAll);
cursoRouter.post('/', auth, adminOnly, cursoController.getAll);
cursoRouter.post('/', auth, adminOnly, cursoController.getAll);

export default cursoRouter;