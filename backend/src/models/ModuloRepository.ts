import { Modulo, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";
import { RepositoryException } from "../exceptions/repository-exception";

interface IModuloRepository extends IBaseRepository<Modulo> {
    getByIdCurso(params?: {
      id: number;
      take?: number;
      skip?: number;
      search?: string;
      searchFields?: string[];
      include?: any;
    }): Promise<{ data: Modulo[]; total: number }>;
 }

const prisma = new PrismaClient();

export class ModuloRepository extends BaseRepository<Modulo> implements IModuloRepository {
  constructor() {
    super(prisma, prisma.modulo, 'id_modulo');
  }


async getByIdCurso(params: {
  id: number;          
  email: string;       
  take?: number;
  skip?: number;
  search?: string;
  searchFields?: string[];
  include?: any;
}): Promise<{ data: (Modulo & { concluido: boolean; tempoTotal: number; tempoFormatado: string })[]; total: number }> {
  try {
    const { take, skip, search, searchFields, include, id, email } = params;

    // 1. Busca o usuário pelo email
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
      select: { id_usuario: true }
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    const id_usuario = usuario.id_usuario;

    // 2. Filtros de busca
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
        { fk_id_curso: id },
        ...(searchWhere ? [searchWhere] : []),
      ],
    };

    // 3. Busque todos os módulos do curso (com as aulas)
    const [modulos, total] = await Promise.all([
      this.model.findMany({ 
        take, 
        skip, 
        where, 
        include: { Aulas: true } 
      }),
      this.model.count({ where }),
    ]);

    // 4. Busque todos os registros de aulas concluídas pelo usuário
    const aulasConcluidas = await this.prisma.aulasConcluidas.findMany({
      where: { fk_id_usuario: id_usuario },
      select: { fk_id_aula: true },
    });
    const aulasConcluidasSet = new Set(aulasConcluidas.map(a => a.fk_id_aula));

// 5. Para cada módulo: marque concluído, calcule tempo total e remova "Aulas"
const data = modulos.map((modulo) => {
  const aulas = modulo.Aulas || [];
  const aulasIds = aulas.map((a) => a.id_aula);
  const todasConcluidas = aulasIds.length > 0 && aulasIds.every(aulaId => aulasConcluidasSet.has(aulaId));
  const tempoTotal = aulas.reduce((soma, aula) => soma + (aula.duracao || 0), 0);

  // Formata tempo (exemplo: 1h 25min)
  const horas = Math.floor(tempoTotal / 60);
  const minutos = tempoTotal % 60;
  const tempoFormatado = horas > 0 ? `${horas}h ${minutos}min` : `${minutos}min`;

  // Desestrutura e remove o campo Aulas
  const { Aulas, ...moduloSemAulas } = modulo;

  return {
    ...moduloSemAulas,
    concluido: todasConcluidas,
    tempoTotal,
    tempoFormatado,
  };
});


    return { data, total };
  } catch (error) {
    console.error(error);
    throw new RepositoryException(error, 'Erro ao buscar módulos por curso e verificar conclusão.');
  }
}

}