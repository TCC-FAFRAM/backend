import express from 'express';

import { LocalizacaoController } from '../controllers/DistritoController';
import { auth } from '../middleware/auth';

const DitritoRouter = express.Router();
const controller = new LocalizacaoController();

DitritoRouter.get('/uf', auth, controller.getUFs)
  .get('/:uf/municipios', auth, controller.getMunicipios)
  .get('/:idMunicipio/distritos', auth, controller.getDistritos);

export default DitritoRouter;
