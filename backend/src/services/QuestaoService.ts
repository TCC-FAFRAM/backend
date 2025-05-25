import { Questao } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { QuestaoRepository } from "../models/QuestaoRepository";

interface IQuestaoService extends IBaseService<Questao> {
  getByIdProva(idProva: number): Promise<Questao[]>;
}

export class QuestaoService extends BaseService<Questao> implements IQuestaoService {
  constructor() {
    super(new QuestaoRepository());
  }

  async getByIdProva(idProva: number): Promise<Questao[]> {
    // @ts-ignore
    return (this.repository as QuestaoRepository).findByProvaId(idProva);
  }
}
