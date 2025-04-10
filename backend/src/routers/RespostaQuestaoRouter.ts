import express from 'express';
import { RespostaQuestaoController } from '../controllers/RespostaQuestaoController';
import { adminOnly, auth } from '../middleware/auth';

const respostaQuestaoController = new RespostaQuestaoController();
const RespostaQuestaoRouter = express.Router();

RespostaQuestaoRouter
  .get('/', auth, adminOnly, respostaQuestaoController.getAll)
  //.get('/:id', auth, adminOnly, respostaQuestaoController.getById);
  .post('/', auth, adminOnly, respostaQuestaoController.create)
  .put('/', auth, adminOnly, respostaQuestaoController.update)
  .delete('/', auth, adminOnly, respostaQuestaoController.delete);

export default RespostaQuestaoRouter;