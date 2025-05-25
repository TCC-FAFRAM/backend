import { PrismaClient, Questao } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface IQuestaoRepository extends IBaseRepository<Questao> { }

const prisma = new PrismaClient();

export class QuestaoRepository extends BaseRepository<Questao> implements IQuestaoRepository {
  constructor() {
    super(prisma, prisma.questao, 'id_questao');
  }

   async findByProvaId(idProva: number): Promise<Questao[]> {
    return await this.model.findMany({
      where: { fk_id_prova: idProva },
      include: { Prova: true },
    });
  }
}