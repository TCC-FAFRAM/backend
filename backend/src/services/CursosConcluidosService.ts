import { CursosConcluidos } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { CursosConcluidosRepository } from "../models/CursosConcluidosRepository";

interface ICursosConcluidosService extends IBaseService<CursosConcluidos> {}

export class CursosConcluidosService extends BaseService<CursosConcluidos> implements ICursosConcluidosService {
  constructor() {
    super(new CursosConcluidosRepository());
  }
}