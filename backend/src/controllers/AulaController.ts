import { Aula } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { AulaService } from "../services/AulaService";

interface IAulaController extends IBaseController {}

export class AulaController extends BaseController<Aula> implements IAulaController{
  constructor() {
    super(new AulaService());
  }
}