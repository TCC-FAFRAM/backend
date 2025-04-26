import { Aula } from "@prisma/client";
import { BaseService, IBaseService, PagedResult } from "../bases/BaseService";
import { AulaRepository } from "../models/AulaRepository";

interface IAulaService extends IBaseService<Aula> {
  getByIdModulo(params?: any): Promise<PagedResult<Aula>>;
}

export class AulaService extends BaseService<Aula> implements IAulaService {
  repository2 = new AulaRepository();
  constructor() {
    super(new AulaRepository());
  }


  async getByIdModulo(params?: any): Promise<PagedResult<Aula>> {
    return await this.repository2.getByIdModulo(params);
  }
}