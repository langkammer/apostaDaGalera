

import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { ResponseBodyListInterface, User } from "src/app/interfaces/response-body.interface";
import { VinculoService } from "src/app/services/vinculo.service";

export class UserDataSource implements DataSource<User> {

  private userSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
   
  totalElements:number;
  totalPages:number;

  constructor(private service: VinculoService) {}

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
      return this.userSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.userSubject.complete();
  }

  loadList(page = 0,size = 10, nome = "") {
      this.service.list(page,size,nome).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((res : ResponseBodyListInterface) => {
                    this.userSubject.next(res.data)
                    this.totalElements = res.totalElements;
                    this.totalPages    = res.totalPages;  
        });
  } 
  
  
 
}
