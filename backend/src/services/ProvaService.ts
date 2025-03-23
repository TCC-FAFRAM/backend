import { Prova } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { ProvaRepository } from "../models/ProvaRepository";

interface IProvaService extends IBaseService<Prova> {}

export class ProvaService extends BaseService<Prova> implements IProvaService {
  constructor() {
    super(new ProvaRepository());
  }
}