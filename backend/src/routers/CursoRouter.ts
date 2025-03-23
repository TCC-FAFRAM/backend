import express from 'express';
import { CursoController } from '../controllers/CursoController';
import { adminOnly, auth } from '../middleware/auth';

const cursoController = new CursoController();
const CursoRouter = express.Router();

CursoRouter
  .get('/', auth, adminOnly, cursoController.getAll)
  //.get('/:id', auth, adminOnly, cursoController.getById);
  .post('/', auth, adminOnly, cursoController.create)
  .post('/', auth, adminOnly, cursoController.update)
  .post('/', auth, adminOnly, cursoController.delete);

export default CursoRouter;