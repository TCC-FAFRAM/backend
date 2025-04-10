import { AulasConcluidas, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface IAulasConcluidasRepository extends IBaseRepository<AulasConcluidas> { }

const prisma = new PrismaClient();

export class AulasConcluidasRepository extends BaseRepository<AulasConcluidas> implements IAulasConcluidasRepository {
  constructor() {
    super(prisma, prisma.aulasConcluidas, 'id_aula_concluida');
  }
}