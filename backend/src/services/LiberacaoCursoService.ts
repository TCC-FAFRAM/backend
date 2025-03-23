import { LiberacaoCurso } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { LiberacaoCursoRepository } from "../models/LiberacaoCursoRepository";

interface ILiberacaoCursoService extends IBaseService<LiberacaoCurso> {}

export class LiberacaoCursoService extends BaseService<LiberacaoCurso> implements ILiberacaoCursoService {
  constructor() {
    super(new LiberacaoCursoRepository());
  }
}