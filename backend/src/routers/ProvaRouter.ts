import express from 'express';
import { ProvaController } from '../controllers/ProvaController';
import { adminOnly, auth } from '../middleware/auth';

const provaController = new ProvaController();
const ProvaRouter = express.Router();

ProvaRouter
  .get('/', auth, adminOnly, provaController.getAll)
  //.get('/:id', auth, adminOnly, provaController.getById);
  .post('/', auth, adminOnly, provaController.create)
  .post('/', auth, adminOnly, provaController.update)
  .post('/', auth, adminOnly, provaController.delete);

export default ProvaRouter;