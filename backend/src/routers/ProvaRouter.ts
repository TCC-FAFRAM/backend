import express from 'express';
import { ProvaController } from '../controllers/ProvaController';
import { adminOnly, auth } from '../middleware/auth';

const provaController = new ProvaController();
const ProvaRouter = express.Router();

ProvaRouter
  .get('/', auth, provaController.getAll)
  .get('/:id', auth, provaController.getByModuloId)
  .post('/', auth, adminOnly, provaController.create)
  .put('/:id', auth, adminOnly, provaController.update)
  .delete('/', auth, adminOnly, provaController.delete);

export default ProvaRouter;