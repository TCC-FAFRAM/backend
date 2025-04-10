import { AulasConcluidas } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { AulasConcluidasRepository } from "../models/AulasConcluidasRepository";

interface IAulasConcluidasService extends IBaseService<AulasConcluidas> { }

export class AulasConcluidasService extends BaseService<AulasConcluidas> implements IAulasConcluidasService {
  constructor() {
    super(new AulasConcluidasRepository());
  }
}