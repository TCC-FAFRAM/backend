import { PrismaClient, Prova } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

// Interface com o novo método
export interface IProvaRepository extends IBaseRepository<Prova> {
  findByModuloId(idModulo: number): Promise<Prova[]>;
}

const prisma = new PrismaClient();

export class ProvaRepository extends BaseRepository<Prova> implements IProvaRepository {
  constructor() {
    super(prisma, prisma.prova, 'id_prova');
  }

async findByModuloId(idModulo: number): Promise<Prova[]> {
  return await this.model.findMany({
    where: { fk_id_modulo: idModulo },
    include: {
      Modulo: true,
      Questoes: true,  // <- PLURAL, MAIÚSCULO
    },
  });
}
  
}
