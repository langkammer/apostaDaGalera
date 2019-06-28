import { Liga, ResponseBodyInterface, ResponseBodyListInterface } from "src/app/interfaces/response-body.interface";


import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { LigaService } from "src/app/services/liga.service";
import { Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

export class LigasDataSource implements DataSource<Liga> {

  private ligasSubject = new BehaviorSubject<Liga[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
   
  totalElements:number;
  totalPages:number;

  
  public loading$ = this.loadingSubject.asObservable();

  constructor(private ligaService: LigaService) {}

  connect(collectionViewer: CollectionViewer): Observable<Liga[]> {
      return this.ligasSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.ligasSubject.complete();
  }

  loadLigas(page = 0,size = 10, nome = "") {
      this.ligaService.list(page,size,nome).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((res : ResponseBodyListInterface) => {
                    this.ligasSubject.next(res.data)
                    this.totalElements = res.totalElements;
                    this.totalPages    = res.totalPages;  
        });
  } 
  
  
 
}
