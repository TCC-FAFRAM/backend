import { Request, Response } from "express";
import { AulasConcluidas } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { AulasConcluidasService } from "../services/AulasConcluidasService";

import { PrismaClient } from "@prisma/client";
import { returnSessionUsuario } from "../middleware/sessionUserMid";

const prisma = new PrismaClient();

interface IAulasConcluidasController extends IBaseController { }

export class AulasConcluidasController extends BaseController<AulasConcluidas> implements IAulasConcluidasController {
  constructor() {
    super(new AulasConcluidasService());
    this.create = this.create.bind(this);
  }

  // Sobrescreve o create
  async create(req: Request, res: Response): Promise<void> {
    try {
      // 1. Extrai e-mail do JWT
      const usuario = returnSessionUsuario(req);

      // 2. Busca o id_usuario no banco
      const usuarioDb = await prisma.usuario.findUnique({
        where: { email: usuario.email },
        select: { id_usuario: true }
      });

      if (!usuarioDb) {
        res.status(404).json({ error: "Usuário não encontrado pelo e-mail do token!" });
        return;
      }

      // 3. Monta o objeto de criação
      const data = {
        ...req.body,
        fk_id_usuario: usuarioDb.id_usuario, // força usar o id correto
      };

      // 4. Chama o service para criar
      const result = await this.baseService.create(data);
      res.status(201).json(result);

    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
