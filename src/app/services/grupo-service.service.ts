import { Injectable } from '@angular/core';
import { RequestService } from '../core/request.services';
import { Grupo } from '../interfaces/response-body.interface';

@Injectable({
  providedIn: 'root'
})
export class GrupoServiceService {

  constructor(
    private request: RequestService
  ){}
  
  list(page:number) {
    return this.request.post('/grupo/list',page);
  }

  create(grupo: Grupo){
    return this.request.post('/grupo/create', grupo);
  }

}
