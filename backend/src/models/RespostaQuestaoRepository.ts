import { PrismaClient, RespostaQuestao } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface IRespostaQuestaoRepository extends IBaseRepository<RespostaQuestao> { }

const prisma = new PrismaClient();

export class RespostaQuestaoRepository extends BaseRepository<RespostaQuestao> implements IRespostaQuestaoRepository {
  constructor() {
    super(prisma, prisma.respostaQuestao, 'id_resposta');
  }

}