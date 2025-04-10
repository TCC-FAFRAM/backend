import { Funcao } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { FuncaoService } from "../services/FuncaoService";

interface IFuncaoController extends IBaseController {}

export class FuncaoController extends BaseController<Funcao> implements IFuncaoController{
  constructor() {
    super(new FuncaoService());
  }


  protected getSearchFields(): string[] {
    return ["nome", "descricao"];
  }

  protected getInclude(): any {
    return {
    };
  }
}