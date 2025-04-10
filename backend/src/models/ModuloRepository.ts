import { Modulo, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface IModuloRepository extends IBaseRepository<Modulo> { }

const prisma = new PrismaClient();

export class ModuloRepository extends BaseRepository<Modulo> implements IModuloRepository {
  constructor() {
    super(prisma, prisma.modulo, 'id_modulo');
  }
}