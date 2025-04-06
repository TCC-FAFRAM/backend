import { Aula } from "@prisma/client";
import { BaseService, IBaseService, PagedResult } from "../bases/BaseService";
import { AulaRepository } from "../models/AulaRepository";

interface IAulaService extends IBaseService<Aula> {
  getbyCursos(params?: any): Promise<PagedResult<Aula>>;
}

export class AulaService extends BaseService<Aula> implements IAulaService {
  repository2 = new AulaRepository();
  constructor() {
    super(new AulaRepository());
  }


  async getbyCursos(params?: any): Promise<PagedResult<Aula>> {
    return await this.repository2.getItemsByCurso(params);
  }
}