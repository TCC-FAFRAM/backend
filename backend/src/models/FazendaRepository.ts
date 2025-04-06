import { Fazenda, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface IFazendaRepository extends IBaseRepository<Fazenda> { }

const prisma = new PrismaClient();

export class FazendaRepository extends BaseRepository<Fazenda> implements IFazendaRepository {
  constructor() {
    super(prisma, prisma.fazenda);
  }
}