import express from 'express';
import { FazendaController } from '../controllers/FazendaController';
import { adminOnly, auth } from '../middleware/auth';

const fazendaController = new FazendaController();
const FazendaRouter = express.Router();

FazendaRouter
  .get('/', fazendaController.getAll)
  //.get('/:id', auth, adminOnly, fazendaController.getById);
  .post('/', fazendaController.create)
  .put('/:id', auth, adminOnly, fazendaController.update)
  .delete('/', auth, adminOnly, fazendaController.delete);

export default FazendaRouter;