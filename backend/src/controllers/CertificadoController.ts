import { Certificado } from "@prisma/client";
import { BaseController, IBaseController } from "../bases/BaseController";
import { CertificadoService } from "../services/CertificadoService";

interface ICertificadoController extends IBaseController {}

export class CertificadoController extends BaseController<Certificado> implements ICertificadoController{
  constructor() {
    super(new CertificadoService());
  }
}