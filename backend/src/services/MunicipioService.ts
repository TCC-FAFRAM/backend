import { Municipio } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { MunicipiosRepository } from "../models/MunicipiosRepository";

interface IMunicipiosService extends IBaseService<Municipio> {}

export class MunicipiosService extends BaseService<Municipio> implements IMunicipiosService {
  private mRepository: MunicipiosRepository;

  constructor() {
    const repository = new MunicipiosRepository();
    super(repository);
    this.mRepository = repository;
  }

  // NOVO: Listar municípios de um estado (id_estado)
  async listarPorEstado(id_estado: number) {
    return this.getAll({
      where: { fk_id_estado: id_estado },
    });
  }
}
