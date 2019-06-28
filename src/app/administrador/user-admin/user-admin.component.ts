import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatBottomSheet, MatDialog } from '@angular/material';
import { MsgService } from 'src/app/core/msg.service';
import { tap } from 'rxjs/operators';
import { UserDataSource } from './user-data.source';
import { VinculoService } from 'src/app/services/vinculo.service';
import { User } from 'src/app/interfaces/response-body.interface';
import { BottonButtonUserComponent } from './bottom/bottom-button.user.component';
import { UserModalComponent } from './modal/user-modal.component';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent  implements OnInit,AfterViewInit {

  nome:string;

  user = {} as User;

  displayedColumns: string[] = ['nome', 'email' , 'provider','permissaoAdmin','id'];

  dataSource: UserDataSource;



  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
        private bottomSheet: MatBottomSheet,
        private service:VinculoService,
        private msgService:MsgService,
        public dialog: MatDialog

  ){}


  ngOnInit(): void {



    this.dataSource = new UserDataSource(this.service);
    this.dataSource.loadList();
  }


  ngAfterViewInit() {
    this.paginator.page
        .pipe(
            tap(() => this.loadListPage())
        )
        .subscribe();
  } 

  loadListPage() {
    this.dataSource.loadList(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.nome);
  }



  openModal(tipoCrud:String,user:User) : void{
    console.log("abre modal liga");
    if(!tipoCrud)
      tipoCrud = "Nova";
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '500px',
      data: {action: tipoCrud, obj: user}

    });

    dialogRef.afterClosed().subscribe((liga: User)  => {
      console.log('The dialog was closed');
    //   this.animal = result;
        console.log(liga);
        if(!!liga){
          this.loadListPage();
          this.msgService.open("Nova Liga  ! : " , liga.nome)
        }
    });
  }

  
  openMenu(liga:User): void {
    this.bottomSheet.open(BottonButtonUserComponent).afterDismissed().subscribe(
      sucess => {
        if(!!sucess)
          this.openModal(sucess,liga);
        else
          console.log("Fechou sem resultados ...");  
      }
    );
    console.log("ACESSOU SUB MENU");
  }



}
