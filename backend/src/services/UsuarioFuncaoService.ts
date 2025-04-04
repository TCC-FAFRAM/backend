import { Funcao } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { UsuarioFuncaoRepository } from "../models/UsuarioFuncaoRepository";

interface IUsuarioFuncaoService extends IBaseService<Funcao> {}

export class UsuarioFuncaoService extends BaseService<Funcao> implements IUsuarioFuncaoService {
  constructor() {
    super(new UsuarioFuncaoRepository());
  }
}