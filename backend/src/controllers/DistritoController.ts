import { Request, Response } from 'express';
import { DistritoService } from '../services/DistritoService';

export class LocalizacaoController {
  private readonly distritoService: DistritoService;

  constructor() {
    this.distritoService = new DistritoService();

    this.getUFs = this.getUFs.bind(this);
    this.getMunicipios = this.getMunicipios.bind(this);
    this.getDistritos = this.getDistritos.bind(this);
  }

  async getUFs(req: Request, res: Response) {
    try {
      const estados = await this.distritoService.listarUFs();
      res.json(estados);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar UFs' });
    }
  }

  async getMunicipios(req: Request, res: Response) {
    const { uf } = req.params;
    try {
      const municipios = await this.distritoService.listarMunicipiosPorUF(uf);
      res.json(municipios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar municípios' });
    }
  }

  async getDistritos(req: Request, res: Response) {
    const { idMunicipio } = req.params;
    try {
      const distritos = await this.distritoService.listarDistritosPorMunicipio(idMunicipio);
      res.json(distritos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar distritos' });
    }
  }
}
