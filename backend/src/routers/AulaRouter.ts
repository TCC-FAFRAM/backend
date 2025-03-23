import express from 'express';
import { AulaController } from '../controllers/AulaController';
import { adminOnly, auth } from '../middleware/auth';

const aulaController = new AulaController();
const AulaRouter = express.Router();

AulaRouter
  .get('/', auth, adminOnly, aulaController.getAll)
  //.get('/:id', auth, adminOnly, aulaController.getById);
  .post('/', auth, adminOnly, aulaController.create)
  .post('/', auth, adminOnly, aulaController.update)
  .post('/', auth, adminOnly, aulaController.delete);

export default AulaRouter;