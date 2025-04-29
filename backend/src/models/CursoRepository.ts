import { Curso, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface ICursoRepository extends IBaseRepository<Curso> {
  listarCursosDisponiveisParaUsuario( email: string,
    take: number,
    skip: number,
    search: string): Promise<Curso[]>;
}

const prisma = new PrismaClient();

export class CursoRepository extends BaseRepository<Curso> implements ICursoRepository {
  constructor() {
    super(prisma, prisma.curso, "id_curso");
  }

  async listarCursosDisponiveisParaUsuario(
    email: string,
    take: number = 10,
    skip: number = 0,
    search: string
  ): Promise<Curso[]> {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
      select: {
        id_usuario: true,
        fk_id_funcao: true,
      },
    });
  
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
  
    // Cursos liberados manualmente para o funcionário
    const cursosLiberadosDiretamente = await prisma.liberacaoCurso.findMany({
      where: { fk_id_funcionario: usuario.id_usuario },
      select: {
        Curso: {
          select: {
            id_curso: true,
            titulo: true,
            descricao: true,
            url_img: true,
            Modulos: {
              select: {
                id_modulo: true,
                titulo: true,
                descricao: true,
                ordem: true,
                concluido: true,
                Aulas: {
                  select: {
                    id_aula: true,
                    titulo: true,
                    url_video: true,
                    duracao: true,
                    descricao: true,
                  }
                }
              }
            }
          }
        }
      }
    });
  
    // Cursos pela função do usuário
    let cursosPorFuncao: { Curso: Curso }[] = [];
  
    if (usuario.fk_id_funcao) {
      cursosPorFuncao = await prisma.funcaoCurso.findMany({
        where: { fk_id_funcao: usuario.fk_id_funcao },
        select: {
          Curso: {
            select: {
              id_curso: true,
              titulo: true,
              descricao: true,
              url_img: true,
              Modulos: {
                select: {
                  id_modulo: true,
                  titulo: true,
                  descricao: true,
                  ordem: true,
                  concluido: true,
                  Aulas: {
                    select: {
                      id_aula: true,
                      titulo: true,
                      url_video: true,
                      duracao: true,
                      descricao: true,
                    }
                  }
                }
              }
            }
          }
        }
      });
    }
  
    // Junta os cursos vindos da liberação manual + função
    const todosCursos = [...cursosLiberadosDiretamente, ...cursosPorFuncao];
  
    // Remover duplicados pelo id_curso
    const cursosUnicosMap = new Map<number, Curso>();
    for (const item of todosCursos) {
      cursosUnicosMap.set(item.Curso.id_curso, item.Curso);
    }
  
    let cursosUnicos = Array.from(cursosUnicosMap.values());
  
    // 🔎 Aplica o filtro de pesquisa (se existir)
    if (search) {
      const searchLower = search.toLowerCase();
      cursosUnicos = cursosUnicos.filter(curso =>
        curso.titulo.toLowerCase().includes(searchLower)
      );
    }
  
    // 🔢 Aplica a paginação (take e skip)
    const cursosPaginados = cursosUnicos.slice(skip, skip + take);
  
    return cursosPaginados;
  }
  
}
