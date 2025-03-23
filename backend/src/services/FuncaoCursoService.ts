import { FuncaoCurso } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { FuncaoCursoRepository } from "../models/FuncaoCursoRepository";

interface IFuncaoCursoService extends IBaseService<FuncaoCurso> {}

export class FuncaoCursoService extends BaseService<FuncaoCurso> implements IFuncaoCursoService {
  constructor() {
    super(new FuncaoCursoRepository());
  }
}