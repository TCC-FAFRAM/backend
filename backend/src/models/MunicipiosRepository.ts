import {   Municipio, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface IMunicipiosRepository extends IBaseRepository<Municipio> {
}

const prisma = new PrismaClient();

export class MunicipiosRepository extends BaseRepository<Municipio> implements IMunicipiosRepository {
  constructor() {
    super(prisma, prisma.municipio, "id_municipio");
  }


}
