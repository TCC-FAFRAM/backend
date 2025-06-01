import { Fazenda } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { FazendaService } from "../services/FazendaService";

interface IFazendaController extends IBaseController { }

export class FazendaController extends BaseController<Fazenda> implements IFazendaController {
  constructor() {
    super(new FazendaService());
  }



protected getSearchFields(): string[] {
    return ["nome"];
  }

protected getInclude(): any {
  return {
    Municipio: true,
    Distrito: true
  };
}
}



