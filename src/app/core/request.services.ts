import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseBodyInterface } from '../interfaces/response-body.interface';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  load:string = "Aguarde ... ";
  
  constructor(private http: HttpClient) { }

  @BlockUI() blockUI: NgBlockUI;

  get(service)  : Observable<ResponseBodyInterface>  {
    this.blockUI.start(this.load)
    return this.http.get<ResponseBodyInterface>(Config.api + service)
    .pipe(
      finalize(() => {
        console.log('Finalizado ...');
        this.blockUI.stop();
      })
    );
  }


  post(service: string,data: any) : Observable<ResponseBodyInterface> {
    this.blockUI.start(this.load)
    return this.http
    .post<ResponseBodyInterface>(Config.api + service ,data)
    .pipe(finalize(() => {
      console.log('Finalizado ...');
      this.blockUI.stop();
    }) );
  }


  

      


}
