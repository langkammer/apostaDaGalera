import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class GrupoServiceService {

  constructor(
      private http: HttpClient,
  ) { 
  }

  listAll() {
    
   return this.http
      .get(
        Config.api + '/grupo/list',
      );
  }

  save(grupo){
    
    return this.http
      .post(
      Config.api + '/grupo/save', 
      grupo
    );

  }

  delete(grupo){

    return this.http.delete(
      Config.api + '/grupo/save', 
      grupo
    );

  }

  
}
