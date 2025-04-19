import { Funcao } from "@prisma/client";
import { FuncaoRepository } from "../models/FuncaoRepository";
import { BaseService, IBaseService } from "../bases/BaseService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface IFuncaoService extends IBaseService<Funcao> {
  vincularCursos(fk_id_funcao: number, cursos: number[]): Promise<void>;
  atualizarCursos(fk_id_funcao: number, cursos: number[]): Promise<void>;
}


export class FuncaoService extends BaseService<Funcao> implements IFuncaoService {
  constructor() {
    super(new FuncaoRepository());
  }

  async vincularCursos(fk_id_funcao: number, cursos: number[]) {
    const data = cursos.map(fk_id_curso => ({ fk_id_funcao, fk_id_curso }));
    await prisma.funcaoCurso.createMany({ data });
  }

  async atualizarCursos(fk_id_funcao: number, cursos: number[]) {
    // Remove vínculos antigos
    await prisma.funcaoCurso.deleteMany({
      where: { fk_id_funcao }
    });

    // Adiciona vínculos novos (se houver)
    if (Array.isArray(cursos) && cursos.length > 0) {
      await this.vincularCursos(fk_id_funcao, cursos);
    }
  }
}
