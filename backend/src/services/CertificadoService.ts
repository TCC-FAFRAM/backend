import { Certificado } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { CertificadoRepository } from "../models/CertificadoRepository";

interface ICertificadoService extends IBaseService<Certificado> {}

export class CertificadoService extends BaseService<Certificado> implements ICertificadoService {
  constructor() {
    super(new CertificadoRepository());
  }
}