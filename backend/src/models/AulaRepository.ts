import { Aula, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";
import { RepositoryException } from "../exceptions/repository-exception";

interface IAulaRepository extends IBaseRepository<Aula> {
  getByIdModulo(params?: {
    id: number;
    take?: number;
    skip?: number;
    search?: string;
    searchFields?: string[];
    include?: any;
    email: string;
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
    email: string;
  }): Promise<{ data: Aula[]; total: number }> {
    try {
      const { take, skip, search, searchFields, include, id, email } = params || {};

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

      // Buscar o id_usuario pelo e-mail fornecido
      const usuario = await prisma.usuario.findUnique({
        where: { email },
        select: { id_usuario: true }
      });

      if (!usuario) throw new RepositoryException('Usuário não encontrado!', 'Usuário não encontrado');

      // Montar o include para trazer só as conclusões desse usuário
      const customInclude = {
        ...include,
        AulasConcluidas: {
          where: {
            fk_id_usuario: usuario.id_usuario
          },
          select: {
            id_aula_concluida: true,
            completado_em: true
          }
        }
      };

      const [data, total] = await Promise.all([
        this.model.findMany({
          take,
          skip,
          where,
          include: customInclude,
        }),
        this.model.count({ where }),
      ]);

      return { data, total };
    } catch (error) {
      console.error(error);
      throw new RepositoryException(error, 'Erro ao buscar aulas por curso.');
    }
  }
}
