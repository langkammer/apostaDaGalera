import { Injectable } from '@angular/core';
import { RequestService } from '../core/request.services';
import { Grupo } from '../interfaces/response-body.interface';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(
    private request: RequestService
  ){}
  
  list(page:number,size:number,nome:string) {
    // nome
    // pagina
    // size
    return this.request.get('/grupo/list?page='+page+'&size='+size+'&nome='+nome);
  }


  create(grupo: Grupo){
    return this.request.post('/grupo/create', grupo);
  }

  get(id:number){
    return this.request.get('/grupo/getById?idGrupo='+id);
  }

  getMembroByIdGrupoAndEmail(data){
    return this.request.post('/grupo/getMembroGrupo',data);
  }

  getMembrosGrupoBy(page:number,size:number,idGrupo:number){
    return this.request.get('/grupo/getMembrosGrupoBy?page='+page+'&size='+size+'&idGrupo='+idGrupo);
  }

  grupoByRodada(idGrupo:number,rodada:number){
    return this.request.get('/grupo/grupoByRodada?idGrupo='+idGrupo+'&rodada='+rodada);
  }
  entrar(data:any){
    return this.request.post('/grupo/entrarNoGrupo',data);
  }

  sair(data:any){
    return this.request.post('/grupo/sairNoGrupo',data);
  }

}
