import { RespostaQuestao } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { RespostaQuestaoService } from "../services/RespostaQuestaoService";

interface IRespostaQuestaoController extends IBaseController { }

export class RespostaQuestaoController extends BaseController<RespostaQuestao> implements IRespostaQuestaoController {
  constructor() {
    super(new RespostaQuestaoService());
  }
}