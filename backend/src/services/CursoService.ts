import { Curso } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { CursoRepository } from "../models/CursoRepository";

interface ICursoService extends IBaseService<Curso> {
  listarCursosDisponiveisParaUsuario(email: string,
    take: number,
    skip: number,
    search: string): Promise<Curso[]>;
}

export class CursoService extends BaseService<Curso> implements ICursoService {
  private cursoRepository: CursoRepository;

  constructor() {
    const repository = new CursoRepository();
    super(repository);
    this.cursoRepository = repository;
  }

  async listarCursosDisponiveisParaUsuario(email: string,
    take: number,
    skip: number,
    search: string): Promise<Curso[]> {
    return await this.cursoRepository.listarCursosDisponiveisParaUsuario(email, take, skip, search);
  }
}
