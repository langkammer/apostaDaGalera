import { Component, OnInit, ViewChild } from '@angular/core';
import { Grupo, Liga } from 'src/app/interfaces/response-body.interface';
import { GrupoDataSource } from './grupo-data.source';
import { MatPaginator, MatBottomSheet, MatDialog } from '@angular/material';
import { MsgService } from 'src/app/core/msg.service';
import { tap } from 'rxjs/operators';
import { GrupoService } from 'src/app/services/grupo.service';
import { BottonButtonGrupoComponent } from './bottom/bottom-button.component';
import { GrupoModalComponent } from './modal/grupo-modal.component';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  nome:string;

  liga = {} as Grupo;

  displayedColumns: string[] = ['nome', 'ligaNome' ,'id'];

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
    const dialogRef = this.dialog.open(GrupoModalComponent, {
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
    this.bottomSheet.open(BottonButtonGrupoComponent).afterDismissed().subscribe(
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
