import { FuncaoCurso } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { FuncaoCursoService } from "../services/FuncaoCursoService";

interface IFuncaoCursoController extends IBaseController {}

export class FuncaoCursoController extends BaseController<FuncaoCurso> implements IFuncaoCursoController{
  constructor() {
    super(new FuncaoCursoService());
  }

  protected getSearchFields(): string[] {
    return ["nota_minima"];
  }

  protected getInclude(): any {
    return {
       Curso: true
    };
  }
}