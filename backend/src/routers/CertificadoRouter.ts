import express from 'express';
import { CertificadoController } from '../controllers/CertificadoController';
import { adminOnly, auth } from '../middleware/auth';

const certificadoController = new CertificadoController();
const CertificadoRouter = express.Router();

CertificadoRouter
  .get('/', auth, adminOnly, certificadoController.getAll)
  //.get('/:id', auth, adminOnly, certificadoController.getById);
  .post('/', auth, adminOnly, certificadoController.create)
  .put('/:id', auth, adminOnly, certificadoController.update)
  .delete('/', auth, adminOnly, certificadoController.delete);

export default CertificadoRouter;