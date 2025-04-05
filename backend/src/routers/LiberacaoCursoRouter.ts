import express from 'express';
import { LiberacaoCursoController } from '../controllers/LiberacaoCursoController';
import { adminOnly, auth } from '../middleware/auth';

const liberacaoCursoController = new LiberacaoCursoController();
const LiberacaoCursoRouter = express.Router();

LiberacaoCursoRouter
  .get('/', auth, adminOnly, liberacaoCursoController.getAll)
  //.get('/:id', auth, adminOnly, liberacaoCursoController.getById);
  .post('/', auth, adminOnly, liberacaoCursoController.create)
  .put('/', auth, adminOnly, liberacaoCursoController.update)
  .delete('/', auth, adminOnly, liberacaoCursoController.delete);

export default LiberacaoCursoRouter;