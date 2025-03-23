import { PrismaClient, UsuarioFuncao } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface IUsuarioFuncaoRepository extends IBaseRepository<UsuarioFuncao> {}

const prisma = new PrismaClient();

export class UsuarioFuncaoRepository extends BaseRepository<UsuarioFuncao> implements IUsuarioFuncaoRepository {
  constructor() {
    super(prisma, prisma.usuarioFuncao);
  }
}