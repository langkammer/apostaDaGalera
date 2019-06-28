import { Component, OnInit, ViewChild } from '@angular/core';
import { Grupo, Liga } from 'src/app/interfaces/response-body.interface';
import { GrupoDataSource } from './grupo-data.source';
import { MatPaginator, MatBottomSheet, MatDialog } from '@angular/material';
import { LigaService } from 'src/app/services/liga.service';
import { MsgService } from 'src/app/core/msg.service';
import { LigasDataSource } from 'src/app/administrador/cad-ligas/ligas-data.source';
import { tap } from 'rxjs/operators';
import { LigaModalComponent } from 'src/app/administrador/cad-ligas/modal/liga-modal.component';
import { BottonButtonComponent } from 'src/app/administrador/cad-ligas/bottom/bottom-button.component';
import { GrupoService } from 'src/app/services/grupo-service.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  nome:string;

  liga = {} as Grupo;

  displayedColumns: string[] = ['nome', 'tipoLiga' , 'qtdRodadas','id'];

  dataSource: GrupoDataSource;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
        private bottomSheet: MatBottomSheet,
        private service:GrupoService,
        private msgService:MsgService,
        public dialog: MatDialog,

  ){}


  ngOnInit(): void {
    this.dataSource = new GrupoDataSource(this.service);
    this.dataSource.loadList();
  }


  ngAfterViewInit() {
    this.paginator.page
        .pipe(
            tap(() => this.loadLigaPage())
        )
        .subscribe();
  } 

  loadLigaPage() {
    this.dataSource.loadList(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.nome);
  }



  openModal(tipoCrud:String,liga:Liga) : void{
    console.log("abre modal liga");
    if(!tipoCrud)
      tipoCrud = "Nova";
    const dialogRef = this.dialog.open(LigaModalComponent, {
      width: '500px',
      data: {action: tipoCrud, obj: liga}

    });

    dialogRef.afterClosed().subscribe((liga: Liga)  => {
      console.log('The dialog was closed');
    //   this.animal = result;
        console.log(liga);
        if(!!liga){
          this.loadLigaPage();
          this.msgService.open("Nova Liga  ! : " , liga.nome)
        }
    });
  }

  
  openMenu(liga:Liga): void {
    this.bottomSheet.open(BottonButtonComponent).afterDismissed().subscribe(
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
