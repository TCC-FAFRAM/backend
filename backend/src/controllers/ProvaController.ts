import { Prova } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { ProvaService } from "../services/ProvaService";
import { Request, Response } from "express";

interface IProvaController extends IBaseController {
   getByModuloId(req: Request, res: Response): Promise<void>;
}

export class ProvaController extends BaseController<Prova> implements IProvaController{
  service = new ProvaService();
  constructor() {
    super(new ProvaService());
    this.getByModuloId = this.getByModuloId.bind(this);
  }

  protected getSearchFields(): string[] {
    return ["nota_minima", "total_perguntas"];
  }

  protected getInclude(): any {
    return {
      Modulo: true,
    };
  }

 async getByModuloId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: "Informe o id do módulo." });
        return;
      }
      const provas = await this.service.buscarPorModuloId(Number(id));
      res.status(200).json(provas[0]);
    } catch (error: any) {
      if (!res.headersSent) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  
}