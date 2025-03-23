import { CursosConcluidos, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface ICursosConcluidosRepository extends IBaseRepository<CursosConcluidos> {}

const prisma = new PrismaClient();

export class CursosConcluidosRepository extends BaseRepository<CursosConcluidos> implements ICursosConcluidosRepository {
  constructor() {
    super(prisma, prisma.cursosConcluidos);
  }
}