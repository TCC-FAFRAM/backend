import express from 'express';
import { UsuarioFuncaoController } from '../controllers/UsuarioFuncaoController';
import { adminOnly, auth } from '../middleware/auth';

const usuarioFuncaoController = new UsuarioFuncaoController();
const UsuarioFuncaoRouter = express.Router();

UsuarioFuncaoRouter
  .get('/', auth, adminOnly, usuarioFuncaoController.getAll)
  //.get('/:id', auth, adminOnly, usuarioFuncaoController.getById);
  .post('/', auth, adminOnly, usuarioFuncaoController.create)
  .put('/', auth, adminOnly, usuarioFuncaoController.update)
  .delete('/', auth, adminOnly, usuarioFuncaoController.delete);

export default UsuarioFuncaoRouter;