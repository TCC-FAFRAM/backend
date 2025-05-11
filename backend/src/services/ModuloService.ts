import { Modulo } from "@prisma/client";
import { BaseService, IBaseService, PagedResult } from "../bases/BaseService";
import { ModuloRepository } from "../models/ModuloRepository";

interface IModuloService extends IBaseService<Modulo> {
  getByIdCurso(params?: any): Promise<PagedResult<Modulo>>;
 }

export class ModuloService extends BaseService<Modulo> implements IModuloService {
    repository2 = new ModuloRepository();
  constructor() {
    super(new ModuloRepository());
  }

   async getByIdCurso(params?: any): Promise<PagedResult<Modulo>> {
      return await this.repository2.getByIdCurso(params);
    }

}