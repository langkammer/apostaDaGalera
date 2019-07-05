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

}
