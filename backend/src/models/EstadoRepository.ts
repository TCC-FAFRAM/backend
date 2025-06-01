import {   Estado, Municipio, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface IEstadoRepository extends IBaseRepository<Estado> {
}

const prisma = new PrismaClient();

export class EstadoRepository extends BaseRepository<Estado> implements IEstadoRepository {
  constructor() {
    super(prisma, prisma.estado, "id_estado");
  }

}
