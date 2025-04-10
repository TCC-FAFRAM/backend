import { Questao } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { QuestaoService } from "../services/QuestaoService";

interface IQuestaoController extends IBaseController { }

export class QuestaoController extends BaseController<Questao> implements IQuestaoController {
  constructor() {
    super(new QuestaoService());
  }
} 