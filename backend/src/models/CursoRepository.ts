import { Curso, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface ICursoRepository extends IBaseRepository<Curso> {}

const prisma = new PrismaClient();

export class CursoRepository extends BaseRepository<Curso> implements ICursoRepository {
  constructor() {
    super(prisma, prisma.curso, 'id_curso');
  }
}