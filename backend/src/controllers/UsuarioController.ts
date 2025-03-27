import { Usuario } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { UsuarioService } from "../services/UsuarioService";

interface IUsuarioController extends IBaseController {}

export class UsuarioController extends BaseController<Usuario> implements IUsuarioController{
  constructor() {
    super(new UsuarioService());
  }

  protected getSearchFields(): string[] {
    return ['nome', 'email']; 
  }
}