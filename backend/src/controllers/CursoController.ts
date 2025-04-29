import { Curso } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { CursoService } from "../services/CursoService";
import { Request, Response } from "express";
import { returnSessionUsuario } from "../middleware/sessionUser";

interface ICursoController extends IBaseController {
  listarCursosDisponiveisParaUsuario(req: Request, res: Response): Promise<void>;
}

export class CursoController extends BaseController<Curso> implements ICursoController {
  private cursoService: CursoService;

  constructor() {
    const service = new CursoService();
    super(service);
    this.cursoService = service;

    // Bind do novo método para não perder o "this"
    this.listarCursosDisponiveisParaUsuario = this.listarCursosDisponiveisParaUsuario.bind(this);
  }

  

  async listarCursosDisponiveisParaUsuario(req: Request, res: Response): Promise<void> {
    try {
      const usuario = returnSessionUsuario(req);

      const take = req.query.take ? parseInt(req.query.take as string) : 10;
      const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;
      const search = req.query.search?.toString() ?? '';

      const cursos = await this.cursoService.listarCursosDisponiveisParaUsuario(
       usuario.email, 
       take,
       skip, 
       search
     );
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  protected getSearchFields(): string[] {
    return ["status"];
  }
  
  protected getInclude(): any {
    return {
      Certificados    :true,
      FuncaoCurso     :true,
      LiberacoesCurso :true,
      Modulos         :true,

    };
}
}
