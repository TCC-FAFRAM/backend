import { Curso } from "@prisma/client";
import { BaseController, IBaseController } from "../../bases/BaseController";
import { CursoService } from "./CursoService";

interface ICursoController extends IBaseController {}

export class CursoController extends BaseController<Curso> implements ICursoController{
  constructor() {
    super(new CursoService());
  }
}