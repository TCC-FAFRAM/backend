import express from 'express';
import { TentativasProvaController } from '../controllers/TentativasProvaController';
import { adminOnly, auth } from '../middleware/auth';

const tentativasProvaController = new TentativasProvaController();
const TentativasProvaRouter = express.Router();

TentativasProvaRouter
  .get('/', auth, adminOnly, tentativasProvaController.getAll)
  //.get('/:id', auth, adminOnly, tentativasProvaController.getById);
  .post('/', auth, adminOnly, tentativasProvaController.create)
  .post('/', auth, adminOnly, tentativasProvaController.update)
  .post('/', auth, adminOnly, tentativasProvaController.delete);

export default TentativasProvaRouter;