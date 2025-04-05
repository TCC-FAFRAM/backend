import { TentativasProva } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { TentativasProvaService } from "../services/TentativasProvaService";

interface ITentativasProvaController extends IBaseController {}

export class TentativasProvaController extends BaseController<TentativasProva> implements ITentativasProvaController {
  constructor() {
    super(new TentativasProvaService());
  }

  protected getSearchFields(): string[] {
    return ["nome", "email"];
  }

  protected getInclude(): any {
    return {
      Funcao: true,
      Fazenda: true,
      Certificados: true,
      TentativasProva: true,
      CursosConcluidos: true,
      LiberacoesCursoFuncionario: true,
      LiberacoesCursoAdmin: true,

    };
  }
}