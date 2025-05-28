import { TentativasProva, RespostaQuestao } from "@prisma/client";
import { BaseService, IBaseService } from "../bases/BaseService";
import { TentativasProvaRepository } from "../models/TentativasProvaRepository";
import { RespostaQuestaoRepository } from "../models/RespostaQuestaoRepository";
import { UsuarioRepository } from "../models/UsuarioRepository";

interface ITentativasProvaService extends IBaseService<TentativasProva> {
   saveBlocTentativaAndRespostasQuestoes(TentativasProva: TentativasProva, RespostaQuestao: RespostaQuestao[], Email: string): Promise<any>;
}

export class TentativasProvaService extends BaseService<TentativasProva> implements ITentativasProvaService {
  repositoryRespostaQuestao = new RespostaQuestaoRepository();
  repositoryUsuario = new UsuarioRepository();
  constructor() {
    super(new TentativasProvaRepository());
  }


  async saveBlocTentativaAndRespostasQuestoes(TentativasProva: TentativasProva, RespostaQuestao: RespostaQuestao[], Email: string): Promise<any> {
      try {
       const usuario = await (this.repositoryUsuario as UsuarioRepository).findByEmail(Email);
        
       const { id_tentativa_prova } = await (this.repository as TentativasProvaRepository).createItem({
          fk_id_funcionario: usuario?.id_usuario,
          fk_id_prova: TentativasProva.fk_id_prova,
          nota: TentativasProva.nota,
          data_tentativa: TentativasProva.data_tentativa,
          passou: TentativasProva.passou
       });

       for(var i = 0 ; i < RespostaQuestao.length; i++){
         await (this.repositoryRespostaQuestao as RespostaQuestaoRepository).createItem({
           fk_id_questao: RespostaQuestao[i].fk_id_questao,
           fk_id_tentativa: id_tentativa_prova,
           resposta_aluno: RespostaQuestao[i].resposta_aluno
         });
        }

         return {
            tentativa: TentativasProva,
            questoesRealizadas: RespostaQuestao
         };
        } catch (error) {
         console.error(error)
       }
         
      }
}