import express from 'express';

import { auth } from '../middleware/auth';
import { LocalizacaoController } from '../controllers/distritoController';

const DitritoRouter = express.Router();
const controller = new LocalizacaoController();

DitritoRouter.get('/uf', auth, controller.getUFs)
.get('/:uf/municipios', auth, controller.getMunicipios)
.get('/:idMunicipio/distritos', auth, controller.getDistritos);

export default DitritoRouter;
