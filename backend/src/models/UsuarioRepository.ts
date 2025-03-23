import { PrismaClient, Usuario } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface IUsuarioRepository extends IBaseRepository<Usuario> {
  findByEmail(email: string): Promise<any>
}

const prisma = new PrismaClient();

export class UsuarioRepository extends BaseRepository<Usuario> implements IUsuarioRepository {
  constructor() {
    super(prisma, prisma.usuario);
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    try {
      return await prisma.usuario.findUnique({ where: {email} });
    } catch (error) {
      console.error(`Error on getAll ${prisma.usuario}`, error);
      throw error;
    }
  }
}