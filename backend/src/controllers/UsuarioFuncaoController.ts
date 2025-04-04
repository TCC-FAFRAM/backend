import { Funcao } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { UsuarioFuncaoService } from "../services/UsuarioFuncaoService";


export class UsuarioFuncaoController extends BaseController<Funcao> {
  constructor() {
    super(new UsuarioFuncaoService());
  }

  protected getSearchFields(): string[] {
    return ["nome"];
  }

  protected getInclude(): any {
    return {
      Usuarios: true,
      FuncaoCurso: true
    };
  }
}
