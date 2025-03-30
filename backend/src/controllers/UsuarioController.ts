import { Usuario } from "@prisma/client";
import { BaseController } from "../bases/BaseController";
import { UsuarioService } from "../services/UsuarioService";

export class UsuarioController extends BaseController<Usuario> {
  constructor() {
    super(new UsuarioService());
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
