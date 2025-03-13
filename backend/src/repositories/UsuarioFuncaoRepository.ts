import { Prisma, PrismaClient, UsuarioFuncao } from '@prisma/client';

const prisma = new PrismaClient();

export class UsuarioFuncaoRepository {
  // Criar uma associação entre usuário e função
  static async createUsuarioFuncao(usuarioFuncaoData: Prisma.UsuarioFuncaoCreateInput): Promise<UsuarioFuncao> {
    try {
      return await prisma.usuarioFuncao.create({ data: usuarioFuncaoData });
    } catch (error) {
      console.error('Erro ao criar associação de usuário e função:', error);
      throw error;
    }
  }

  // Obter todas as associações de usuário e função
  static async getAllUsuarioFuncoes(): Promise<UsuarioFuncao[]> {
    try {
      return await prisma.usuarioFuncao.findMany();
    } catch (error) {
      console.error('Erro ao obter todas as associações de usuário e função:', error);
      throw error;
    }
  }

  // Obter uma associação de usuário e função por ID do usuário e função
  static async getByUsuarioFuncao(fk_id_usuario: number, fk_id_funcao: number): Promise<UsuarioFuncao | null> {
    try {
      return await prisma.usuarioFuncao.findUnique({
        where: {
          fk_id_usuario_fk_id_funcao: {
            fk_id_usuario,
            fk_id_funcao
          }
        }
      });
    } catch (error) {
      console.error('Erro ao buscar associação de usuário e função:', error);
      throw error;
    }
  }

  // Atualizar uma associação de usuário e função
  static async updateUsuarioFuncao(
    fk_id_usuario: number, 
    fk_id_funcao: number, 
    usuarioFuncaoData: Partial<Omit<UsuarioFuncao, 'fk_id_usuario' | 'fk_id_funcao'>>
  ): Promise<UsuarioFuncao> {
    try {
      return await prisma.usuarioFuncao.update({
        where: {
          fk_id_usuario_fk_id_funcao: {
            fk_id_usuario,
            fk_id_funcao
          }
        },
        data: usuarioFuncaoData
      });
    } catch (error) {
      console.error('Erro ao atualizar associação de usuário e função:', error);
      throw error;
    }
  }

  // Excluir uma associação de usuário e função
  static async deleteUsuarioFuncao(fk_id_usuario: number, fk_id_funcao: number): Promise<UsuarioFuncao> {
    try {
      return await prisma.usuarioFuncao.delete({
        where: {
          fk_id_usuario_fk_id_funcao: {
            fk_id_usuario,
            fk_id_funcao
          }
        }
      });
    } catch (error) {
      console.error('Erro ao excluir associação de usuário e função:', error);
      throw error;
    }
  }
}
