import { PrismaClient, Funcao } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface IUsuarioFuncaoRepository extends IBaseRepository<Funcao> {}

const prisma = new PrismaClient();

export class UsuarioFuncaoRepository extends BaseRepository<Funcao> implements IUsuarioFuncaoRepository {
  constructor() {
    super(prisma, prisma.usuario, 'id_funcao'); 
    
  }
}