import { Funcao } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { FuncaoRepository } from "../models/FuncaoRepository";

interface IFuncaoService extends IBaseService<Funcao> {}

export class FuncaoService extends BaseService<Funcao> implements IFuncaoService {
  constructor() {
    super(new FuncaoRepository());
  }
}