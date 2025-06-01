import { Request, Response } from 'express';
import { DistritoService } from '../services/DistritoService';
import { MunicipiosService } from '../services/MunicipioService';
import { EstadoService } from '../services/EstadoService';
import { BaseController, IBaseController } from '../bases/BaseController';
import { Estado } from '@prisma/client';

interface IEstadoController extends IBaseController {}

export class LocalizacaoController extends BaseController<Estado> implements IEstadoController {
  private readonly distritoService = new DistritoService();
  private readonly municipioService = new MunicipiosService();


  constructor() {
    super(new EstadoService()); 
    this.getMunicipiosPorEstado = this.getMunicipiosPorEstado.bind(this);
    this.getDistritosPorMunicipio = this.getDistritosPorMunicipio.bind(this);
  }


    protected getSearchFields(): string[] {
    return ["nome"];
  }

protected getInclude(): any {
  return {
    Municipios: {
      include: {
        Distritos: true,
      }
    }
  };
}



  // GET /estados/:id_estado/municipios
  async getMunicipiosPorEstado(req: Request, res: Response) {
    const { uf } = req.params;
    try {
      const result = await this.municipioService.listarPorEstado(Number(uf));
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar municípios" });
    }
  }

  // GET /municipios/:id_municipio/distritos
  async getDistritosPorMunicipio(req: Request, res: Response) {
    const { id_municipio } = req.params;
    try {
      const result = await this.distritoService.listarPorMunicipio(Number(id_municipio));
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar distritos" });
    }
  }
}
