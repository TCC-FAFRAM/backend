import { Fazenda } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { FazendaRepository } from "../models/FazendaRepository";

interface IFazendaService extends IBaseService<Fazenda> { }

export class FazendaService extends BaseService<Fazenda> implements IFazendaService {
  constructor() {
    super(new FazendaRepository());
  }
}