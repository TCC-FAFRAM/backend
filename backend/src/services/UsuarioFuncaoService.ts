import { UsuarioFuncao } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { UsuarioFuncaoRepository } from "../models/UsuarioFuncaoRepository";

interface IUsuarioFuncaoService extends IBaseService<UsuarioFuncao> {}

export class UsuarioFuncaoService extends BaseService<UsuarioFuncao> implements IUsuarioFuncaoService {
  constructor() {
    super(new UsuarioFuncaoRepository());
  }
}