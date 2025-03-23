import { TentativasProva } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { TentativasProvaRepository } from "../models/TentativasProvaRepository";

interface ITentativasProvaService extends IBaseService<TentativasProva> {}

export class TentativasProvaService extends BaseService<TentativasProva> implements ITentativasProvaService {
  constructor() {
    super(new TentativasProvaRepository());
  }
}