import { Request, Response } from "express";
import { IBaseService } from "./BaseService";

export interface IBaseController {
  getAll(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}

export abstract class BaseController<TypeData> implements IBaseController {

  protected readonly baseService: IBaseService<TypeData>;

  constructor(baseService: IBaseService<TypeData>) {
    this.baseService = baseService;

    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const take = req.query.take ? parseInt(req.query.take as string) : undefined;
      const skip = req.query.skip ? parseInt(req.query.skip as string) : undefined;
      const search = req.query.search?.toString();
  
      const searchFields = this.getSearchFields();
  
      const data = await this.baseService.getAll({
        take,
        skip,
        search,
        searchFields
      });
  
      res.status(200).json(data); // <-- sem return
    } catch (error: any) {
      res.status(500).json({ error: error.message }); // <-- sem return
    }
  }
  

  // Método sobrescrevível por controllers concretos
  protected getSearchFields(): string[] {
    return []; // Por padrão nenhum campo é pesquisado
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const result = await this.baseService.create(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const result = await this.baseService.update(id, data);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.baseService.delete(req.body.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
