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

  list(page:number,size:number,nome:string) {
    return this.request.get('/user/list?page='+page+'&size='+size+'&nome='+nome);
  }

  criarVinculo(vinculo: any){
    return this.request.post('/user/create', vinculo);
  }

  desvincular(vinculo: any){
    return this.request.post('/user/delete', vinculo);
  }

  bloquear(vinculo: any){
    return this.request.post('/user/bloquear', vinculo);
  }


  getUserByAuthID(uid:string){
    return this.request.post('/user/getUserByEmail', uid);
  }

  getUserByEmail(email:string){
    return this.request.post('/user/getUserByEmail', email);
  }
  

}
