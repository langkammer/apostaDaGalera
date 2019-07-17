import { DataSource, CollectionViewer } from "@angular/cdk/collections";

import { ResponseBodyListInterface, Equipe } from "src/app/interfaces/response-body.interface";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { EquipeService } from "src/app/services/equipe.service";
import * as _ from "lodash"

export class EquipeDataSource implements DataSource<Equipe> {

  private equipeSubject = new BehaviorSubject<Equipe[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
   
  totalElements:number;
  totalPages:number;

  equipesBackEnd : Equipe[];
  equipesMarcadas : Equipe[];
  
  public loading$ = this.loadingSubject.asObservable();

  constructor(private equipeService: EquipeService) {}

  connect(collectionViewer: CollectionViewer): Observable<Equipe[]> {
      return this.equipeSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.equipeSubject.complete();
  }

  load(page = 0,size = 10, nome = "",equipesSelecionadas:Equipe[]) {
      this.equipeService.list(page,size,nome).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((res : ResponseBodyListInterface) => {
                    if(res.data){
                      this.equipesBackEnd = res.data;
                      console.log("equipes" ,this.equipesBackEnd);  
                      this.totalElements = res.totalElements;
                      this.totalPages    = res.totalPages;  
                      this.equipesMarcadas = equipesSelecionadas;
                      this.marcaTrueEquipes(equipesSelecionadas);
                    }
                   
        });
  } 

  marcaTrueEquipes(equipesSelecionadas:Equipe[]){
    let array = []

    _.forEach(this.equipesBackEnd, (equipe:Equipe) => {
      if(_.find(equipesSelecionadas,{id : equipe.id}))
        equipe.select = true;
      else
        equipe.select = false;

      array.push(equipe);
    });
    this.equipesMarcadas = equipesSelecionadas;

    this.equipeSubject.next(this.equipesBackEnd);

    this.selecionaEquipes();

  }

  marcaEquipe(equipe:Equipe){
    if(!_.find(this.equipesMarcadas,{id : equipe.id})){
      equipe.select = true;
      this.equipesMarcadas.push(equipe);
    }
    else  {
      _.find(this.equipesMarcadas,{id : equipe.id}).select = true;
    }
    this.selecionaEquipes();
  }

  desmarcarEquipe(equipe:Equipe){
    if(!_.find(this.equipesMarcadas,{id : equipe.id})){
      equipe.select = false;
      this.equipesMarcadas.push(equipe);
    }
    else  {
      _.find(this.equipesMarcadas,{id : equipe.id}).select = false;
    }

    this.selecionaEquipes();
  }

  selecionaEquipes(){

    _.mergeByKey(this.equipesBackEnd, this.equipesMarcadas,'id')
  
    console.log("ARRAY => ",this.equipesBackEnd);

    this.equipeSubject.next(this.equipesBackEnd);
  }

  getEquipesSelecionadas(){
    return this.equipesMarcadas;
  }
  
 
}
