import { Aula, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface IAulaRepository extends IBaseRepository<Aula> {}

const prisma = new PrismaClient();

export class AulaRepository extends BaseRepository<Aula> implements IAulaRepository {
  constructor() {
    super(prisma, prisma.aula);
  }
}