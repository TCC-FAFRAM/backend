import express from 'express';

import { LocalizacaoController } from '../controllers/DistritoController';
import { auth } from '../middleware/auth';

const DitritoRouter = express.Router();
const controller = new LocalizacaoController();

DitritoRouter.get('/uf',  controller.getAll)
  .get('/:uf/municipios',  controller.getMunicipiosPorEstado)
  .get('/:idMunicipio/distritos', controller.getDistritosPorMunicipio);

export default DitritoRouter;
