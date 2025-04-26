import express from 'express';
import { AulaController } from '../controllers/AulaController';
import { adminOnly, auth } from '../middleware/auth';

const aulaController = new AulaController();
const AulaRouter = express.Router();

AulaRouter
  .get('/', auth, adminOnly, aulaController.getAll) 
  .get('/id', auth, adminOnly, aulaController.getByIdModulo)
  .post('/', auth, adminOnly, aulaController.create)
  .put('/:id', auth, adminOnly, aulaController.update)
  .delete('/', auth, adminOnly, aulaController.delete);

export default AulaRouter;