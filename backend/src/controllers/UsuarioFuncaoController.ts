import { UsuarioFuncao } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { UsuarioFuncaoService } from "../services/UsuarioFuncaoService";

interface IUsuarioFuncaoController extends IBaseController {}

export class UsuarioFuncaoController extends BaseController<UsuarioFuncao> implements IUsuarioFuncaoController{
  constructor() {
    super(new UsuarioFuncaoService());
  }
}