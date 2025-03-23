import { CursosConcluidos } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { CursosConcluidosService } from "../services/CursosConcluidosService";

interface ICursosConcluidosController extends IBaseController {}

export class CursosConcluidosController extends BaseController<CursosConcluidos> implements ICursosConcluidosController{
  constructor() {
    super(new CursosConcluidosService());
  }
}