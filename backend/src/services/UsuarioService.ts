import { Usuario } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { UsuarioRepository } from "../models/UsuarioRepository";

interface IUsuarioService extends IBaseService<Usuario> {
  findByEmail(userEmail: string): Promise<Usuario | null>
}

export class UsuarioService extends BaseService<Usuario> implements IUsuarioService {
  constructor() {
    super(new UsuarioRepository());
  }

  async findByEmail(userEmail: string): Promise<Usuario | null> {
    const result = await new UsuarioRepository().findByEmail(userEmail);
    if (!result) {
      throw new Error('Error on List by email');
    }
    return result;
  }
}