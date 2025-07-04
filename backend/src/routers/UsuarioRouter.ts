import express from 'express';
import { UsuarioController } from '../controllers/UsuarioController';
import { adminOnly, auth } from '../middleware/auth';

const usuarioController = new UsuarioController();
const UsuarioRouter = express.Router();

UsuarioRouter
  .get('/', auth, adminOnly, usuarioController.getAll)
  //.get('/:id', auth, adminOnly, usuarioController.getById);
  .post('/', usuarioController.create)
  .put('/:id', auth, adminOnly, usuarioController.update)
  .delete('/', auth, adminOnly, usuarioController.delete);

export default UsuarioRouter;