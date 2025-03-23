import { Funcao, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface IFuncaoRepository extends IBaseRepository<Funcao> {}

const prisma = new PrismaClient();

export class FuncaoRepository extends BaseRepository<Funcao> implements IFuncaoRepository {
  constructor() {
    super(prisma, prisma.funcao);
  }
}