import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class VinculoService {

  
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(Config.api + '/user/list');
  }

  criarVinculo(vinculo: any){
    console.log("vinculo", vinculo);
    return this.http.post(Config.api + '/user/create', vinculo);
  }

  delete(vinculo){
    return this.http.delete(Config.api + '/user/delete',  vinculo);
  }

  getUserByAuthID(uid:string){
    return this.http.post(Config.api + '/user/getUserByAuthID', uid);
  }

  

}
