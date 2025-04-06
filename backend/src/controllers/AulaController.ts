import { Request, Response } from "express";
import { Aula } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { AulaService } from "../services/AulaService";

interface IAulaController extends IBaseController {
  getByIdCurso(req: Request, res: Response): Promise<void>;
}

export class AulaController extends BaseController<Aula> implements IAulaController {
  service = new AulaService();
  constructor() {
    super(new AulaService());
    this.getByIdCurso = this.getByIdCurso.bind(this);
  }


  async getByIdCurso(req: Request, res: Response): Promise<void> {
    try {
      const take = req.query.take ? parseInt(req.query.take as string) : undefined;
      const skip = req.query.skip ? parseInt(req.query.skip as string) : undefined;
      const search = req.query.search?.toString();
      const id = Number(req.query.id);
      const searchFields = this.getSearchFields();
      const include = this.getInclude();

      const data = await this.service.getbyCursos({
        id,
        take,
        skip,
        search,
        searchFields,
        include
      });

      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }


  protected getInclude(): any {
    return {
      Curso: true,
    };
  }
}
