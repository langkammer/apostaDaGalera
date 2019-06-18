import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { RequestService } from '../core/request.services';
import { ResponseBodyInterface } from '../interfaces/response-body.interface';

@Injectable({
  providedIn: 'root'
})
export class VinculoService {

  
  constructor(
    private request: RequestService
    ) { }

  @BlockUI() blockUI: NgBlockUI;

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
