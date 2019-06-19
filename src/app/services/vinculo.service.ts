import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { RequestService } from '../core/request.services';

@Injectable({
  providedIn: 'root'
})
export class VinculoService {

  
  constructor(
    private request: RequestService
    ) { }

  list() {
    return this.request.get('/user/list');
  }

  criarVinculo(vinculo: any){
    return this.request.post('/user/create', vinculo);
  }

  getUserByAuthID(uid:string){
    return this.request.post('/user/getUserByEmail', uid);
  }

  getUserByEmail(email:string){
    return this.request.post('/user/getUserByEmail', email);
  }
  

}
