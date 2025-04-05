import express from 'express';
import { FuncaoController } from '../controllers/FuncaoController';
import { adminOnly, auth } from '../middleware/auth';

const funcaoController = new FuncaoController();
const FuncaoRouter = express.Router();

FuncaoRouter
  .get('/', auth, adminOnly, funcaoController.getAll)
  //.get('/:id', auth, adminOnly, funcaoController.getById);
  .post('/', auth, adminOnly, funcaoController.create)
  .put('/:id', auth, adminOnly, funcaoController.update)
  .delete('/', auth, adminOnly, funcaoController.delete);

export default FuncaoRouter;