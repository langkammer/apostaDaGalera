import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseBodyInterface } from '../interfaces/response-body.interface';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  
  constructor(private http: HttpClient) { }

  @BlockUI() blockUI: NgBlockUI;

  get(service) {
    this.blockUI.start("Aguarde...")
    return this.http.get<ResponseBodyInterface>(Config.api + service)
    .pipe(
        map(res => {
            console.log("finalizando request", res);
            this.blockUI.stop();
        }) // or any other operator
    );
  }


  post(service: string,data: any){
    this.blockUI.start("Aguarde...")
    return this.http.post<ResponseBodyInterface>(Config.api + service ,data)
    .pipe(
        map(res => {
            console.log("finalizando request", res);
            this.blockUI.stop();
        }) // or any other operator
    );
    
  }


      


}
