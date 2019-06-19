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
  
  list(page:number) {
    return this.request.get('/liga/list?page='+page);
  }

  create(liga: Liga){
    return this.request.post('/liga/create', liga);
  }

}
