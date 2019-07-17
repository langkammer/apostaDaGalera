import { Injectable } from '@angular/core';
import { RequestService } from '../core/request.services';
import { Equipe } from '../interfaces/response-body.interface';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  
  constructor(
    private request: RequestService
  ){}

  list(page:number,size:number,nome:string) {
    return this.request.get('/equipe/list?page='+page+'&size='+size+'&nome='+nome);
  }

  create(equipe: Equipe){
    return this.request.post('/equipe/create', equipe);
  }

  delete(equipe: Equipe){
    return this.request.post('/equipe/delete', equipe);
  }

}
