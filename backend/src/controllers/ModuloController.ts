import { Modulo } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { ModuloService } from "../services/ModuloService";

interface IModuloController extends IBaseController { }

export class ModuloController extends BaseController<Modulo> implements IModuloController {
  constructor() {
    super(new ModuloService());
  }

  protected getSearchFields(): string[] {
    return ["titulo", "descricao"];
  }

  protected getInclude(): any {
    return {
      Curso: true,
    };
  }
}