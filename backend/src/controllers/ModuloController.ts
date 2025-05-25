import { Request, Response } from "express";
import { Modulo } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { ModuloService } from "../services/ModuloService";
import { returnSessionUsuario } from "../middleware/sessionUserMid";

interface IModuloController extends IBaseController {
getModulosByIdCurso(req: Request, res: Response): Promise<void>;

 }

export class ModuloController extends BaseController<Modulo> implements IModuloController {
  service = new ModuloService();
  constructor() {
    super(new ModuloService());
    this.getModulosByIdCurso = this.getModulosByIdCurso.bind(this);
  }


  protected getSearchFields(): string[] {
    return ["titulo", "descricao"];
  }

  protected getInclude(): any {
    return {
      Aulas:true,
      Curso:true
    };
  }

  async getModulosByIdCurso(req: Request, res: Response): Promise<void> {
    try {
      var email = returnSessionUsuario(req).email;
      const take = req.query.take ? parseInt(req.query.take as string) : undefined;
      const skip = req.query.skip ? parseInt(req.query.skip as string) : undefined;
      const search = req.query.search?.toString();
      const id = Number(req.params.id);

      const searchFields = this.getSearchFields();
      const include = this.getInclude();

      const data = await this.service.getByIdCurso({
        id,
        email,
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

}