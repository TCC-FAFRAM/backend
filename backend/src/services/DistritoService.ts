import { Distrito } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { DistritoRepository } from "../models/DistritoRepository";

interface IDistritoService extends IBaseService<Distrito> {}

export class DistritoService extends BaseService<Distrito> implements IDistritoService {
  private DistritoRepository: DistritoRepository;

  constructor() {
    const repository = new DistritoRepository();
    super(repository);
    this.DistritoRepository = repository;
  }

  // NOVO: Listar distritos de um município (id_municipio)
  async listarPorMunicipio(id_municipio: number) {
    return this.getAll({
      where: { fk_id_municipio: id_municipio },
    });
  }
}
