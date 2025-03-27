import { Prisma, PrismaClient } from "@prisma/client";

export interface IBaseRepository<TypeData> {
  createItem(data: any): Promise<TypeData>
  getAllItems(params?: any): Promise<TypeData[]>
  getItemById(id: number): Promise<TypeData | null>
  updateItem(id: number, data: any): Promise<TypeData>
  deleteItem(id: number): Promise<TypeData>
}

export abstract class BaseRepository<TypeData> implements IBaseRepository<TypeData> {
  
  protected prisma: PrismaClient;
  protected model: any;
  
  constructor(prisma: PrismaClient, model: any) {
    this.prisma = prisma;
    this.model = model;
  }

  async createItem(data: Prisma.Args<typeof this.model, 'create'>['data']): Promise<TypeData> {
    try {
      return await this.model.create({ data: data });
    } catch (error) {
      console.error(`Error on create ${this.model}`, error);
      throw error;
    }
  }

  async getAllItems(params?: {
    take?: number,
    skip?: number,
    search?: string,
    searchFields?: string[]
  }): Promise<TypeData[]> {
    try {
      const { take, skip, search, searchFields } = params || {};
  
      const where = search && searchFields?.length
        ? {
            OR: searchFields.map((field) => ({
              [field]: {
                contains: search,
                mode: 'insensitive',
              },
            })),
          }
        : {};
  
      return await this.model.findMany({
        take,
        skip,
        where,
      });
    } catch (error) {
      console.error(`Error on getAll ${this.model}`, error);
      throw error;
    }
  }
  

  async getItemById(id: number): Promise<TypeData | null> {
    try {
      return await this.model.findUnique({ where: {id} });
    } catch (error) {
      console.error(`Error on getAll ${this.model}`, error);
      throw error;
    }
  }

  async updateItem(id: number, data: Prisma.Args<typeof this.model, 'update'>['data']): Promise<TypeData> {
    try {
      return await this.model.update({
        where: {id},
        data: {data},
      })
    } catch (error) {
      console.error(`Error on update ${this.model}`, error);
      throw error;
    }
  }

  async deleteItem(id: number): Promise<TypeData> {
    try {
      return await this.model.delete({
        where: { id },
      });
    } catch (error) {
      console.error(`Error on delete ${this.model}`, error);
      throw error;
    }
  }
}