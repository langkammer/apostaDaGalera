import { Injectable } from '@angular/core';
import { RequestService } from '../core/request.services';
import { Liga } from '../interfaces/response-body.interface';

@Injectable({
  providedIn: 'root'
})
export class LigaService {
  constructor(
    private request: RequestService
  ){}
  
  list(page:number,size:number,nome:string) {
    // nome
    // pagina
    // size
    return this.request.get('/liga/list?page='+page+'&size='+size+'&nome='+nome);
  }

  create(liga: Liga){
    return this.request.post('/liga/create', liga);
  }

  delete(liga: Liga){
    return this.request.post('/liga/delete', liga);
  }

}
