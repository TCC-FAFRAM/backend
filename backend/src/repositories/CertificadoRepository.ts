import { PrismaClient, Certificado, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class CertificadoRepository {
  // Criar um novo certificado
  static async createCertificado(certificadoData: Prisma.CertificadoCreateInput): Promise<Certificado> {
    try {
      return await prisma.certificado.create({ data: certificadoData });
    } catch (error) {
      console.error('Erro ao criar certificado:', error);
      throw error;
    }
  }

  // Obter todos os certificados
  static async getAllCertificados(): Promise<Certificado[]> {
    try {
      return await prisma.certificado.findMany();
    } catch (error) {
      console.error('Erro ao obter todos os certificados:', error);
      throw error;
    }
  }

  // Obter um certificado por ID
  static async getCertificadoById(id_certificado: number): Promise<Certificado | null> {
    try {
      return await prisma.certificado.findUnique({ where: { id_certificado } });
    } catch (error) {
      console.error('Erro ao buscar certificado por ID:', error);
      throw error;
    }
  }

  // Obter todos os certificados de um usuário específico
  static async getCertificadosByUsuarioId(fk_id_usuario: number): Promise<Certificado[]> {
    try {
      return await prisma.certificado.findMany({
        where: { fk_id_usuario },
      });
    } catch (error) {
      console.error('Erro ao buscar certificados por usuário:', error);
      throw error;
    }
  }

  // Obter todos os certificados de um curso específico
  static async getCertificadosByCursoId(fk_id_curso: number): Promise<Certificado[]> {
    try {
      return await prisma.certificado.findMany({
        where: { fk_id_curso },
      });
    } catch (error) {
      console.error('Erro ao buscar certificados por curso:', error);
      throw error;
    }
  }

  // Atualizar um certificado
  static async updateCertificado(
    id_certificado: number,
    certificadoData: Partial<Prisma.CertificadoUpdateInput>
  ): Promise<Certificado> {
    try {
      return await prisma.certificado.update({
        where: { id_certificado },
        data: certificadoData,
      });
    } catch (error) {
      console.error('Erro ao atualizar certificado:', error);
      throw error;
    }
  }

  // Excluir um certificado
  static async deleteCertificado(id_certificado: number): Promise<Certificado> {
    try {
      return await prisma.certificado.delete({
        where: { id_certificado },
      });
    } catch (error) {
      console.error('Erro ao excluir certificado:', error);
      throw error;
    }
  }
}
