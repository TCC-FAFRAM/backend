import { AulasConcluidas } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { AulasConcluidasService } from "../services/AulasConcluidasService";

interface IAulasConcluidasController extends IBaseController { }

export class AulasConcluidasController extends BaseController<AulasConcluidas> implements IAulasConcluidasController {
  constructor() {
    super(new AulasConcluidasService());
  }
}