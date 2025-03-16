import { IBaseRepository } from "./BaseRepository";

export interface IBaseService<TypeData> {
  getAll(): Promise<TypeData[]>;
  create(data: any): Promise<void>;
  getById(id: number): Promise<TypeData | null>;
  update(id: number, data: any): Promise<TypeData>;
  delete(id: number): Promise<TypeData>;
}

export abstract class BaseService<TypeData> implements IBaseService<TypeData>{
  
  protected readonly repository: IBaseRepository<TypeData>;

  constructor(repository: IBaseRepository<TypeData>) {
    this.repository = repository;
  }

  async getAll(): Promise<TypeData[]> {
    return this.repository.getAllItems();
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