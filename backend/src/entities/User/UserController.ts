import { Usuario } from "@prisma/client";
import { BaseController, IBaseController } from "../../bases/BaseController";
import { UserService } from "./UserService";

interface IUserController extends IBaseController {}

export class UserController extends BaseController<Usuario> implements IUserController{
  constructor() {
    super(new UserService());
  }
}