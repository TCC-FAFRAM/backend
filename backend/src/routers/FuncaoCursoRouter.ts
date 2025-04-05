import express from 'express';
import { FuncaoCursoController } from '../controllers/FuncaoCursoController';
import { adminOnly, auth } from '../middleware/auth';

const funcaoCursoController = new FuncaoCursoController();
const FuncaoCursoRouter = express.Router();

FuncaoCursoRouter
  .get('/', auth, adminOnly, funcaoCursoController.getAll)
  //.get('/:id', auth, adminOnly, funcaoCursoController.getById);
  .post('/', auth, adminOnly, funcaoCursoController.create)
  .put('/:id', auth, adminOnly, funcaoCursoController.update)
  .delete('/', auth, adminOnly, funcaoCursoController.delete);

export default FuncaoCursoRouter;