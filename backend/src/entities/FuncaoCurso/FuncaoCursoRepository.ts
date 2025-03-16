import { FuncaoCurso, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../../bases/BaseRepository";

interface IFuncaoCursoRepository extends IBaseRepository<FuncaoCurso> {}

const prisma = new PrismaClient();

export class FuncaoCursoRepository extends BaseRepository<FuncaoCurso> implements IFuncaoCursoRepository {
  constructor() {
    super(prisma, prisma.curso);
  }
}