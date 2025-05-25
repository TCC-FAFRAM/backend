import { Questao } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { QuestaoService } from "../services/QuestaoService";
import { Request, Response } from "express"; // Importante!

interface IQuestaoController extends IBaseController {
  getByIdProva(req: Request, res: Response): Promise<void>;
}

export class QuestaoController extends BaseController<Questao> implements IQuestaoController {
  constructor() {
    super(new QuestaoService());
    this.getByIdProva = this.getByIdProva.bind(this); // Faz o bind para usar na rota
  }

  // Endpoint: GET /questoes/prova/:idProva
  async getByIdProva(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: "Informe o id da prova." });
        return;
      }
      // @ts-ignore
      const questoes = await this.baseService.getByIdProva(Number(id));
      res.status(200).json(questoes);
    } catch (error: any) {
      if (!res.headersSent) {
        res.status(500).json({ error: error.message });
      }
    }
  }
}
