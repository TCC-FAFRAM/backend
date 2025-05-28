import { Prova } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { ProvaRepository } from "../models/ProvaRepository";

interface IProvaService extends IBaseService<Prova> {
   buscarPorModuloId(idModulo: number): Promise<Prova[]>;
}

export class ProvaService extends BaseService<Prova> implements IProvaService {
  constructor() {
    super(new ProvaRepository());
  }

    async buscarPorModuloId(idModulo: number): Promise<Prova[]> {
    return (this.repository as ProvaRepository).findByModuloId(idModulo);
  }
}