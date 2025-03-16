import express from 'express';
import { adminOnly, auth } from '../../middleware/auth';
import { AulaController } from './AulaController';

const aulaController = new AulaController();
const aulaRouter = express.Router();

aulaRouter.get('/', auth, adminOnly, aulaController.getAll);
aulaRouter.get('/:id', auth, adminOnly, aulaController.getAll);
aulaRouter.post('/', auth, adminOnly, aulaController.getAll);
aulaRouter.post('/', auth, adminOnly, aulaController.getAll);

export default aulaRouter;