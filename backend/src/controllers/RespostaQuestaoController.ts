import { RespostaQuestao } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { RespostaQuestaoService } from "../services/RespostaQuestaoService";
import { Request, Response } from "express"; // Importante!


interface IRespostaQuestaoController extends IBaseController { 
  saveBlocRespostaQuestao(req: Request, res: Response): Promise<void>;
}

export class RespostaQuestaoController extends BaseController<RespostaQuestao> implements IRespostaQuestaoController {
    private service: RespostaQuestaoService;
  
    constructor() {
      const service = new RespostaQuestaoService();
      super(service);
      this.service = service;
      this.saveBlocRespostaQuestao = this.saveBlocRespostaQuestao.bind(this);
    }

   async saveBlocRespostaQuestao(req: Request, res: Response): Promise<void> {
      try {
        const data = req.body;
        if (!data) {
          res.status(400).json({ error: "Informe as questões da prova!" });
          return;
        }
       
        const questoes = await this.service.saveBlocRespostaQuestao(data);
        res.status(200).json(questoes);
      } catch (error: any) {
        if (!res.headersSent) {
          res.status(500).json({ error: error.message });
        }
      }
    }
}