import { MatPaginator } from "@angular/material/paginator";
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {  MatBottomSheet, MatDialog } from '@angular/material';


import { Liga } from 'src/app/interfaces/response-body.interface';
import { BottonButtonComponent } from './bottom/bottom-button.component';
import { MsgService } from 'src/app/core/msg.service';
import { LigaService } from 'src/app/services/liga.service';
import { LigaModalComponent } from './modal/liga-modal.component';
import { LigasDataSource } from './ligas-data.source';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-cad-ligas',
  templateUrl: './cad-ligas.component.html',
  styleUrls: ['./cad-ligas.component.css']
})
export class CadLigasComponent implements OnInit,AfterViewInit {

  nome:string;

  liga = {} as Liga;

  displayedColumns: string[] = ['edicao','tipoLiga' , 'qtdRodadas','id'];

  dataSource: LigasDataSource;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
        private bottomSheet: MatBottomSheet,
        private service:LigaService,
        private msgService:MsgService,
        public dialog: MatDialog,

  ){}


  ngOnInit(): void {
    this.dataSource = new LigasDataSource(this.service);
    this.dataSource.loadLigas();
  }


  ngAfterViewInit() {
    this.paginator.page
        .pipe(
            tap(() => this.loadLigaPage())
        )
        .subscribe();
  } 

  loadLigaPage() {
    this.dataSource.loadLigas(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.nome);
  }



  openModal(tipoCrud:String,liga:Liga) : void{
    console.log("abre modal liga");
    if(!tipoCrud)
      tipoCrud = "Nova";
    const dialogRef = this.dialog.open(LigaModalComponent, {
      width: '600px',
      data: {action: tipoCrud, obj: liga}

    });

    dialogRef.afterClosed().subscribe((liga: Liga)  => {
      console.log('The dialog was closed');
    //   this.animal = result;
        console.log(liga);
        if(!!liga){
          this.loadLigaPage();
          this.msgService.open("Nova Liga  ! : " , liga.tipoLiga)
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
