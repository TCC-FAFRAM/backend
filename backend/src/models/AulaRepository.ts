import { Aula, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";
import { RepositoryException } from "../exceptions/repository-exception";

interface IAulaRepository extends IBaseRepository<Aula> {
  getByIdModulo(params?: {
    take?: number;
    skip?: number;
    search?: string;
    searchFields?: string[];
    include?: any;
  }): Promise<{ data: Aula[]; total: number }>;
}

const prisma = new PrismaClient();

export class AulaRepository extends BaseRepository<Aula> implements IAulaRepository {
  constructor() {
    super(prisma, prisma.aula, 'id_aula');
  }

  async getByIdModulo(params?: {
    id: number;
    take?: number;
    skip?: number;
    search?: string;
    searchFields?: string[];
    include?: any;
  }): Promise<{ data: Aula[]; total: number }> {
    try {
      const { take, skip, search, searchFields, include, id } = params || {};
  
      const searchWhere = search && searchFields?.length
        ? {
            OR: searchFields.map((field) => ({
              [field]: {
                contains: search,
                mode: 'insensitive',
              },
            })),
          }
        : null;
  
      const where = {
        AND: [
          { fk_id_modulo: id },
          ...(searchWhere ? [searchWhere] : [])
        ]
      };
  
      const [data, total] = await Promise.all([
        this.model.findMany({ take, skip, where, include }),
        this.model.count({ where }),
      ]);
  
      return { data, total };
    } catch (error) {
      console.error(error);
      throw new RepositoryException(error, 'Erro ao buscar aulas por curso.');
    }
  }
  
  
  
}