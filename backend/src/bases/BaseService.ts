import { IBaseRepository } from "./BaseRepository";

// BaseService.ts
export interface IBaseService<TypeData> {
  getAll(params?: {
    take?: number;
    skip?: number;
    search?: string;
    searchFields?: string[];
  }): Promise<TypeData[]>;
  create(data: any): Promise<TypeData>;
  update(id: number, data: any): Promise<TypeData>;
  delete(id: number): Promise<TypeData>;
}

export abstract class BaseService<TypeData> implements IBaseService<TypeData>{
  
  protected readonly repository: IBaseRepository<TypeData>;

  constructor(repository: IBaseRepository<TypeData>) {
    this.repository = repository;
  }


  async getAll(params?: any): Promise<TypeData[]> {
    return await this.repository.getAllItems(params);
  }
  

  async create(data: any): Promise<any> {
    return await this.repository.createItem(data);
  }

  async getById(id: number): Promise<TypeData | null> {
    const result = await this.repository.getItemById(id);
    if (!result) {
      throw new Error('Error on List by id');
    }
    return result;
  }

  async update(id: number, data: any): Promise<TypeData> {
    return await this.repository.updateItem(id, data);
  }

  async delete(id: number): Promise<TypeData> {
    return await this.repository.deleteItem(id);
  }
}