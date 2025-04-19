import { Request, Response } from "express";
import { Funcao, PrismaClient } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { FuncaoService, IFuncaoService } from "../services/FuncaoService";

const prisma = new PrismaClient();

interface IFuncaoController extends IBaseController {}

export class FuncaoController extends BaseController<Funcao> implements IFuncaoController {
  protected baseService: IFuncaoService;

  constructor() {
    const service = new FuncaoService();
    super(service);
    this.baseService = service;
  }

  protected getSearchFields(): string[] {
    return ["nome", "descricao"];
  }

  protected getInclude(): any {
    return {
      FuncaoCurso: {
        include: {
          Curso: true, 
        },
      },
    };
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { cursos, ...dadosFuncao } = req.body;

      // Cria a função
      const funcaoCriada = await this.baseService.create(dadosFuncao);

      // Se houver cursos, vincula
      if (Array.isArray(cursos) && cursos.length > 0) {
        await this.baseService.vincularCursos(funcaoCriada.id_funcao, cursos);
      }

      res.status(201).json(funcaoCriada);
    } catch (error) {
      console.error("Erro ao criar função:", error);
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { cursos, ...dadosFuncao } = req.body;
  
      // Atualiza os dados principais da função
      const funcaoAtualizada = await this.baseService.update(id, dadosFuncao);
  
      // Atualiza os cursos vinculados (remove todos e insere os novos)
      if (Array.isArray(cursos)) {
        // Remove vínculos antigos
        await prisma.funcaoCurso.deleteMany({
          where: {
            fk_id_funcao: id
          }
        });
  
        // Cria vínculos novos
        if (cursos.length > 0) {
          await this.baseService.vincularCursos(id, cursos);
        }
      }
  
      res.status(200).json(funcaoAtualizada);
    } catch (error) {
      console.error("Erro ao atualizar função:", error);
      res.status(500).json({ error: (error as Error).message });
    }
  }
  


}
