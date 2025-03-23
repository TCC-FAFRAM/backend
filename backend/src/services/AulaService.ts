import { Aula } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { AulaRepository } from "../models/AulaRepository";

interface IAulaService extends IBaseService<Aula> {}

export class AulaService extends BaseService<Aula> implements IAulaService {
  constructor() {
    super(new AulaRepository());
  }
}