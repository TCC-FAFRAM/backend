import { Request, Response } from "express";
import { Aula } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { AulaService } from "../services/AulaService";
import { returnSessionUsuario } from "../middleware/sessionUser";

interface IAulaController extends IBaseController {
  getByIdModulo(req: Request, res: Response): Promise<void>;
}
// teste
export class AulaController extends BaseController<Aula> implements IAulaController {
  service = new AulaService();
  constructor() {
    super(new AulaService());
    this.getByIdModulo = this.getByIdModulo.bind(this);
  }


  protected getSearchFields(): string[] {
    return ["titulo", "descricao"];
  }

  async getByIdModulo(req: Request, res: Response): Promise<void> {
    try {
      const usuario = returnSessionUsuario(req);
      const take = req.query.take ? parseInt(req.query.take as string) : undefined;
      const skip = req.query.skip ? parseInt(req.query.skip as string) : undefined;
      const search = req.query.search?.toString();
      const id = Number(req.query.id);
      const searchFields = this.getSearchFields();
      const include = this.getInclude();

      const data = await this.service.getByIdModulo({
        id,
        take,
        skip,
        search,
        searchFields,
        include,
        email: usuario.email,
      });

      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }


  protected getInclude(): any {
    return {
      Modulo: true,
      AulasConcluidas: true
    };
  }
}
