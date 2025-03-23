import { PrismaClient, Prova } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface IProvaRepository extends IBaseRepository<Prova> {}

const prisma = new PrismaClient();

export class ProvaRepository extends BaseRepository<Prova> implements IProvaRepository {
  constructor() {
    super(prisma, prisma.prova);
  }
}