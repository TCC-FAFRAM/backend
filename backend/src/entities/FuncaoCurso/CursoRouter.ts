import express from 'express';
import { adminOnly, auth } from '../../middleware/auth';
import { FuncaoCursoController } from './FuncaoCursoController';

const funcaoCursoController = new FuncaoCursoController();
const funcaoCursoRouter = express.Router();

funcaoCursoRouter.get('/', auth, adminOnly, funcaoCursoController.getAll);
funcaoCursoRouter.get('/:id', auth, adminOnly, funcaoCursoController.getAll);
funcaoCursoRouter.post('/', auth, adminOnly, funcaoCursoController.getAll);
funcaoCursoRouter.post('/', auth, adminOnly, funcaoCursoController.getAll);

export default funcaoCursoRouter;