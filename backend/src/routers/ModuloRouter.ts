import express from 'express';
import { ModuloController } from '../controllers/ModuloController';
import { adminOnly, auth } from '../middleware/auth';

const moduloController = new ModuloController();
const ModuloRouter = express.Router();

ModuloRouter
  .get('/', auth, moduloController.getAll)
  .get('/:id', auth, moduloController.getById)
  .get('/all/:id', auth, moduloController.getModulosByIdCurso)
  .post('/', auth, adminOnly, moduloController.create)
  .put('/:id', auth, adminOnly, moduloController.update)
  .delete('/', auth, adminOnly, moduloController.delete);

export default ModuloRouter;