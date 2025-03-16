import { Usuario } from "@prisma/client";
import { BaseService, IBaseService } from "../../bases/BaseService";
import { UserRepository } from "./UserRepository";

interface IUserService extends IBaseService<Usuario> {
  findByEmail(userEmail:string): Promise<Usuario | null>
}

export class UserService extends BaseService<Usuario> implements IUserService {
  constructor() {
    super(new UserRepository());
  }

  async findByEmail(userEmail:string): Promise<Usuario | null> {
    const result = await new UserRepository().findByEmail(userEmail);
    if (!result) {
      throw new Error('Error on List by email');
    }
    return result;
  }
}