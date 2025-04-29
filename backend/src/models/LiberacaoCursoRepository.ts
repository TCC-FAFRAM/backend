import { LiberacaoCurso, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface ILiberacaoCursoRepository extends IBaseRepository<LiberacaoCurso> {}

const prisma = new PrismaClient();

export class LiberacaoCursoRepository extends BaseRepository<LiberacaoCurso> implements ILiberacaoCursoRepository {
  constructor() {
    super(prisma, prisma.liberacaoCurso, 'id_liberacao_curso');
  }
}