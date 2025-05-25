import express from 'express';
import { QuestaoController } from '../controllers/QuestaoController';
import { adminOnly, auth } from '../middleware/auth';

const questaoController = new QuestaoController();
const QuestaoRouter = express.Router();

QuestaoRouter
  .get('/', auth, adminOnly, questaoController.getAll)
  .get('/:id', auth, adminOnly, questaoController.getByIdProva)
  .post('/', auth, adminOnly, questaoController.create)
  .put('/', auth, adminOnly, questaoController.update)
  .delete('/', auth, adminOnly, questaoController.delete);

export default QuestaoRouter;