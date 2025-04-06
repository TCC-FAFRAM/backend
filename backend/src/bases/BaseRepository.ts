import { Prisma, PrismaClient } from "@prisma/client";
import { RepositoryException } from "../exceptions/repository-exception"; // ajuste o caminho se necessário

export interface IBaseRepository<TypeData> {

  createItem(data: any): Promise<TypeData>;
  getAllItems(params?: {
    take?: number;
    skip?: number;
    search?: string;
    searchFields?: string[];
    include?: any;
  }): Promise<{ data: TypeData[]; total: number }>;
  getItemById(id: number, include?: any): Promise<TypeData | null>;
  updateItem(id: number, data: any): Promise<TypeData>;
  deleteItem(id: number): Promise<TypeData>;
}

export abstract class BaseRepository<TypeData> implements IBaseRepository<TypeData> {
  protected prisma: PrismaClient;
  protected model: any;
  protected primaryKey: string;

  constructor(prisma: PrismaClient, model: any, primaryKey: string = 'id') {
    this.prisma = prisma;
    this.model = model;
    this.primaryKey = primaryKey;
  }

  async createItem(data: Prisma.Args<typeof this.model, 'create'>['data']): Promise<TypeData> {
    try {
      return await this.model.create({ data });
    } catch (error) {
      throw new RepositoryException(error, 'Erro ao criar item.');
    }
  }

  async getAllItems(params?: {
    take?: number;
    skip?: number;
    search?: string;
    searchFields?: string[];
    include?: any;
  }): Promise<{ data: TypeData[]; total: number }> {
    try {
      const { take, skip, search, searchFields, include } = params || {};

      const where =
        search && searchFields?.length
          ? {
              OR: searchFields.map((field) => ({
                [field]: {
                  contains: search,
                  mode: 'insensitive',
                },
              })),
            }
          : {};

      const [data, total] = await Promise.all([
        this.model.findMany({ take, skip, where, include }),
        this.model.count({ where }),
      ]);

      return { data, total };
    } catch (error) {
      throw new RepositoryException(error, 'Erro ao buscar itens.');
    }
  }

  async getItemById(id: number, include?: any): Promise<TypeData | null> {
    try {
      return await this.model.findUnique({
        where: { [this.primaryKey]: id },
        include,
      });
    } catch (error) {
      throw new RepositoryException(error, 'Erro ao buscar item por ID.');
    }
  }

  async updateItem(id: number, data: Prisma.Args<typeof this.model, 'update'>['data']): Promise<TypeData> {
    try {
      return await this.model.update({
        where: { [this.primaryKey]: id },
        data,
      });
    } catch (error) {
      throw new RepositoryException(error, 'Erro ao atualizar item.');
    }
  }

  async deleteItem(id: number): Promise<TypeData> {
    try {
      return await this.model.delete({
        where: { [this.primaryKey]: id },
      });
    } catch (error) {
      throw new RepositoryException(error, 'Erro ao deletar item.');
    }
  }
}
