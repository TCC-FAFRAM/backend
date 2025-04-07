import { Usuario } from "@prisma/client";
import { BaseService, IBaseService, PagedResult } from "../bases/BaseService";
import { UsuarioRepository } from "../models/UsuarioRepository";
import { maskCPF, validarCPF } from "../utils/FuncsUtils";

interface IUsuarioService extends IBaseService<Usuario> {
  findByEmail(userEmail: string): Promise<Usuario | null>
}

export class UsuarioService extends BaseService<Usuario> implements IUsuarioService {
  constructor() {
    super(new UsuarioRepository());
  }

  async create(data: Usuario): Promise<Usuario> {
    if (!validarCPF(data.cpf)) {
      throw new Error('Invalid CPF');
    }
    return super.create(data);
  }

  async getAll(params?: any): Promise<PagedResult<Usuario>> {
    const result = await super.getAll(params);
    if (result.data) {
      result.data = result.data.map(user => ({
        ...user,
        cpf: maskCPF(user.cpf)
      }));
    }
    return result;
  }

  async getById(id: number): Promise<Usuario | null> {
    const user = await super.getById(id);

    if (user) {
      const maskedUser = { ...user };
      maskedUser.cpf = maskCPF(user.cpf);
      return maskedUser;
    }

    return null;
  }

  async findByEmail(userEmail: string): Promise<Usuario | null> {
    const result = await new UsuarioRepository().findByEmail(userEmail);
    if (!result) {
      throw new Error('Error on List by email');
    }
    return result;
  }
}