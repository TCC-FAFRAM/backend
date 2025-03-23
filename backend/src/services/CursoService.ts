import { Curso } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { CursoRepository } from "../models/CursoRepository";

interface ICursoService extends IBaseService<Curso> {}

export class CursoService extends BaseService<Curso> implements ICursoService {
  constructor() {
    super(new CursoRepository());
  }
}