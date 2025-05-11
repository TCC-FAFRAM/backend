// BaseService.ts
import { IBaseRepository } from "./BaseRepository";

// Resultado paginado genérico
export interface PagedResult<T> {
  data: T[];
  total: number;
}

// BaseService interface
export interface IBaseService<TypeData> {
  getAll(params?: {
    take?: number;
    skip?: number;
    search?: string;
    searchFields?: string[];
    include?: any; // Novo parâmetro
  }): Promise<PagedResult<TypeData>>;

  getById(id: number, include?: any): Promise<TypeData | null>;
  create(data: any): Promise<TypeData>;
  update(id: number, data: any): Promise<TypeData>;
  delete(id: number): Promise<TypeData>;
}


// BaseService abstrato
export abstract class BaseService<TypeData> implements IBaseService<TypeData> {
  protected readonly repository: IBaseRepository<TypeData>;

  constructor(repository: IBaseRepository<TypeData>) {
    this.repository = repository;
  }

  async getAll(params?: any): Promise<PagedResult<TypeData>> {
    return await this.repository.getAllItems(params);
  }

async getById(id: number, include?: any): Promise<TypeData | null> {
  return await this.repository.getItemById(id, include); 
}


  async create(data: any): Promise<TypeData> {
    return await this.repository.createItem(data);
  }

  async update(id: number, data: any): Promise<TypeData> {
    return await this.repository.updateItem(id, data);
  }

  async delete(id: number): Promise<TypeData> {
    return await this.repository.deleteItem(id);
  }


  
}
