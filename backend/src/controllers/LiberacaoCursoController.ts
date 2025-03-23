import { LiberacaoCurso } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { LiberacaoCursoService } from "../services/LiberacaoCursoService";

interface ILiberacaoCursoController extends IBaseController {}

export class LiberacaoCursoController extends BaseController<LiberacaoCurso> implements ILiberacaoCursoController{
  constructor() {
    super(new LiberacaoCursoService());
  }
}