import express from 'express';
import { CursosConcluidosController } from '../controllers/CursosConcluidosController';
import { adminOnly, auth } from '../middleware/auth';

const cursosConcluidosController = new CursosConcluidosController();
const CursosConcluidosRouter = express.Router();

CursosConcluidosRouter
  .get('/', auth, adminOnly, cursosConcluidosController.getAll)
  //.get('/:id', auth, adminOnly, cursosConcluidosController.getById);
  .post('/', auth, adminOnly, cursosConcluidosController.create)
  .put('/:id', auth, adminOnly, cursosConcluidosController.update)
  .delete('/', auth, adminOnly, cursosConcluidosController.delete);

export default CursosConcluidosRouter;