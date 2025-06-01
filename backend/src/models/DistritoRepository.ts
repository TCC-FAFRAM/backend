import {  Distrito, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface IDistritoRepository extends IBaseRepository<Distrito> {
}

const prisma = new PrismaClient();

export class DistritoRepository extends BaseRepository<Distrito> implements IDistritoRepository {
  constructor() {
    super(prisma, prisma.distrito, "id_distrito");
  }


}
