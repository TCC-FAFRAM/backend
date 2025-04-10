import { Modulo } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { ModuloRepository } from "../models/ModuloRepository";

interface IModuloService extends IBaseService<Modulo> { }

export class ModuloService extends BaseService<Modulo> implements IModuloService {
  constructor() {
    super(new ModuloRepository());
  }
}