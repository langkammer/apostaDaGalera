import { Injectable } from '@angular/core';
import { RequestService } from '../core/request.services';
import { Liga, Equipe } from '../interfaces/response-body.interface';

@Injectable({
  providedIn: 'root'
})
export class LigaService {

  urlApiJsonBrasileiraoUol = "http://jsuol.com.br/c/monaco/utils/gestor/commons.js?file=commons.uol.com.br/sistemas/esporte/modalidades/futebol/campeonatos/dados/$ano/30/dados.json";
  
  
  constructor(
    private request: RequestService
  ){}
  
  list(page:number,size:number,nome:string) {
    return this.request.get('/liga/list?page='+page+'&size='+size+'&nome='+nome);
  }

  getBrasileirao(ano){
    return this.request.getOtherApi(this.urlApiJsonBrasileiraoUol.split('$ano').join(ano));
  }

  listAtivo() {
    return this.request.get('/liga/listAtiva');
  }

  create(liga: Liga){
    return this.request.post('/liga/create', liga);
  }

  delete(liga: Liga){
    return this.request.post('/liga/delete', liga);
  }

}
