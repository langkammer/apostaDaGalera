import { ResponseBodyListInterface, MembroGrupo } from "src/app/interfaces/response-body.interface";


import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { GrupoService } from "src/app/services/grupo.service";

export class MembrosDataSource implements DataSource<MembroGrupo> {

  private membrosubject = new BehaviorSubject<MembroGrupo[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
   
  totalElements:number;
  totalPages:number;

  
  public loading$ = this.loadingSubject.asObservable();

  constructor(private service: GrupoService) {}

  connect(collectionViewer: CollectionViewer): Observable<MembroGrupo[]> {
      return this.membrosubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.membrosubject.complete();
  }

  loadMembros(page = 0,size = 10, idGrupo = 0) {
      this.service.getMembrosGrupoBy(page,size,idGrupo).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((res : ResponseBodyListInterface) => {
                    this.membrosubject.next(res.data)
                    this.totalElements = res.totalElements;
                    this.totalPages    = res.totalPages;  
        });
  } 
  
  
 
}
