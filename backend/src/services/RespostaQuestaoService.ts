import { RespostaQuestao } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { RespostaQuestaoRepository } from "../models/RespostaQuestaoRepository";

interface IRespostaQuestaoService extends IBaseService<RespostaQuestao> { }

export class RespostaQuestaoService extends BaseService<RespostaQuestao> implements IRespostaQuestaoService {
  constructor() {
    super(new RespostaQuestaoRepository());
  }
}