import { TentativasProva } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { TentativasProvaService } from "../services/TentativasProvaService";

interface ITentativasProvaController extends IBaseController {}

export class TentativasProvaController extends BaseController<TentativasProva> implements ITentativasProvaController {
  constructor() {
    super(new TentativasProvaService());
  }
}