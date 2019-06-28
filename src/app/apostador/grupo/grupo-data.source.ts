import { Liga, ResponseBodyListInterface, Grupo } from "src/app/interfaces/response-body.interface";


import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { GrupoService } from "src/app/services/grupo-service.service";

export class LigasDataSource implements DataSource<Grupo> {

  private grupoSubject = new BehaviorSubject<Grupo[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
   
  totalElements:number;
  totalPages:number;

  public loading$ = this.loadingSubject.asObservable();

  constructor(private service: GrupoService) {}

  connect(collectionViewer: CollectionViewer): Observable<Grupo[]> {
      return this.grupoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.grupoSubject.complete();
  }

  loadList(page = 0,size = 10, nome = "") {
      this.service.list(page,size,nome).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((res : ResponseBodyListInterface) => {
                    this.grupoSubject.next(res.data)
                    this.totalElements = res.totalElements;
                    this.totalPages    = res.totalPages;  
        });
  } 
  
  
 
}
