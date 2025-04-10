import express from 'express';
import { AulasConcluidasController } from '../controllers/AulasConcluidasController';
import { adminOnly, auth } from '../middleware/auth';

const aulasConcluidasController = new AulasConcluidasController();
const AulasConcluidasRouter = express.Router();

AulasConcluidasRouter
  .get('/', auth, adminOnly, aulasConcluidasController.getAll)
  //.get('/:id', auth, adminOnly, aulasConcluidasController.getById);
  .post('/', auth, adminOnly, aulasConcluidasController.create)
  .put('/:id', auth, adminOnly, aulasConcluidasController.update)
  .delete('/', auth, adminOnly, aulasConcluidasController.delete);

export default AulasConcluidasRouter;