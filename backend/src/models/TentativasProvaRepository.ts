import { PrismaClient, TentativasProva } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface ITentativasProvaRepository extends IBaseRepository<TentativasProva> {}

const prisma = new PrismaClient();

export class TentativasProvaRepository extends BaseRepository<TentativasProva> implements ITentativasProvaRepository {
  constructor() {
    super(prisma, prisma.tentativasProva);
  }
}