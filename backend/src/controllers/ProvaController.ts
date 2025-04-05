import { Prova } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { ProvaService } from "../services/ProvaService";

interface IProvaController extends IBaseController {}

export class ProvaController extends BaseController<Prova> implements IProvaController{
  constructor() {
    super(new ProvaService());
  }

  protected getSearchFields(): string[] {
    return ["nota_minima", "total_perguntas"];
  }

  protected getInclude(): any {
    return {
      Curso: true,
    };
  }
}