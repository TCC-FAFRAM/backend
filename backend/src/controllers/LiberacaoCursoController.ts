import { LiberacaoCurso } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { LiberacaoCursoService } from "../services/LiberacaoCursoService";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { returnSessionUsuario } from "../middleware/sessionUser";
import { UsuarioService } from "../services/UsuarioService";

interface ILiberacaoCursoController extends IBaseController {}

export class LiberacaoCursoController extends BaseController<LiberacaoCurso> implements ILiberacaoCursoController {
  private liberacaoCursoService: LiberacaoCursoService;
  private usuarioService: UsuarioService;

  constructor() {
    const service = new LiberacaoCursoService();
    super(service);
    this.liberacaoCursoService = service;
    this.usuarioService = new UsuarioService();

    this.create = this.create.bind(this);
  }

  protected getSearchFields(): string[] {
    return ["data_liberacao"];
  }

  protected getInclude(): any {
    return {
      Curso: true,
      Admin: true,
      Funcionario: true,
    };
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const session = returnSessionUsuario(req); 
      const emailAdmin = session.email;
  
      
      const admin = await this.usuarioService.findByEmail(emailAdmin);
  
      if (!admin) {
        res.status(404).json({ error: "Administrador não encontrado." });
        return;
      }

      if (admin.tipo == 'USER'){
        res.status(404).json({ error: "Usuario não atorizado para realizar Liberação" });
        return;
      }
  
      const data = {
        ...req.body,
        fk_id_admin: admin.id_usuario, // agora passa o id correto
      };
  
      const result = await this.liberacaoCursoService.create(data);
  
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
  
}


