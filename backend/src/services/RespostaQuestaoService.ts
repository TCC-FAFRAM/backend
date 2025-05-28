import { RespostaQuestao } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { RespostaQuestaoRepository } from "../models/RespostaQuestaoRepository";

interface IRespostaQuestaoService extends IBaseService<RespostaQuestao> {
   saveBlocRespostaQuestao( RespostaQuestao: RespostaQuestao[]): Promise<RespostaQuestao[]>;
 }

export class RespostaQuestaoService extends BaseService<RespostaQuestao> implements IRespostaQuestaoService {
  constructor() {
    super(new RespostaQuestaoRepository());
  }


      async saveBlocRespostaQuestao( RespostaQuestao: RespostaQuestao[]): Promise<RespostaQuestao[]> {
       for(var i = 0 ; i < RespostaQuestao.length; i++){
        (this.repository as RespostaQuestaoRepository).createItem(RespostaQuestao[i]);
       }
       return RespostaQuestao;
       
    }

}