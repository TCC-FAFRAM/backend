import { TentativasProva } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { TentativasProvaService } from "../services/TentativasProvaService";
import { Request, Response } from "express"; // Importante!
import { returnSessionUsuario } from "../middleware/sessionUserMid";


interface ITentativasProvaController extends IBaseController {
  saveBlocRespostaQuestao(req: Request, res: Response): Promise<void>;
}

export class TentativasProvaController extends BaseController<TentativasProva> implements ITentativasProvaController {
private service: TentativasProvaService;
    
constructor() {
  const service = new TentativasProvaService();
  super(service);
  this.service = service;
  this.saveBlocRespostaQuestao = this.saveBlocRespostaQuestao.bind(this);
}
  
  protected getSearchFields(): string[] {
    return ["nome", "email"];
  }

  protected getInclude(): any {
    return {
      Funcao: true,
      Fazenda: true,
      Certificados: true,
      TentativasProva: true,
      CursosConcluidos: true,
      LiberacoesCursoFuncionario: true,
      LiberacoesCursoAdmin: true,
    };
  }

  
 async saveBlocRespostaQuestao(req: Request, res: Response): Promise<void> {
   try {
    const usuario = returnSessionUsuario(req);
    
     const {tentativa, respostasQuestoes } = req.body;
     if (!tentativa || !respostasQuestoes) {
       res.status(400).json({ error: "Informe as questões da prova!" });
       return;
     }
    
     const questoes = await this.service.saveBlocTentativaAndRespostasQuestoes(tentativa, respostasQuestoes, usuario.email );
     res.status(200).json(questoes);
   } catch (error: any) {
     if (!res.headersSent) {
       res.status(500).json({ error: error.message });
     }
   }
 }
}