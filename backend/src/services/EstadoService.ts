import { Estado } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { EstadoRepository } from "../models/EstadoRepository";

interface IEstadoService extends IBaseService<Estado> {}

export class EstadoService extends BaseService<Estado> implements IEstadoService {
  constructor() {
    super(new EstadoRepository());
  }
}
