import { Certificado, PrismaClient } from "@prisma/client";
import { BaseRepository, IBaseRepository } from "../bases/BaseRepository";

interface ICertificadoRepository extends IBaseRepository<Certificado> {}

const prisma = new PrismaClient();

export class CertificadoRepository extends BaseRepository<Certificado> implements ICertificadoRepository {
  constructor() {
    super(prisma, prisma.certificado);
  }
}