import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatBottomSheet, MatDialog } from '@angular/material';


import { Liga } from 'src/app/interfaces/response-body.interface';
import { BottonButtonComponent } from './bottom/bottom-button.component';
import { MsgService } from 'src/app/core/msg.service';
import { LigaService } from 'src/app/services/liga.service';
import { LigaModalComponent } from './modal/liga-modal.component';

@Component({
  selector: 'app-cad-ligas',
  templateUrl: './cad-ligas.component.html',
  styleUrls: ['./cad-ligas.component.css']
})
export class CadLigasComponent implements OnInit {

  ligas : Liga[] =  [];


  liga = {} as Liga;


  displayedColumns: string[] = ['nome', 'tipoLiga' , 'qtdRodadas','id'];
  dataSource = new MatTableDataSource<Liga>(this.ligas);

  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(
        private bottomSheet: MatBottomSheet,
        private service:LigaService,
        private msgService:MsgService,
        public dialog: MatDialog,

  ){}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.list(1);
  }

  list(page:number){
    this.service.list(page).subscribe(
      sucesso =>{
        console.log("RES ", sucesso);
        if(sucesso.status == "SUCESSO")
          this.populaDataTable(sucesso.data);
        else
          this.msgService.open(sucesso.status , sucesso.menssage);
      },
      error =>{
        this.msgService.open("ERROR : => ", error);

      }
    )
  }

  openModal(tipoCrud:String,liga:Liga) : void{
    console.log("abre modal liga");
    if(!tipoCrud)
      tipoCrud = "Nova";
    const dialogRef = this.dialog.open(LigaModalComponent, {
      width: '500px',
      data: {action: tipoCrud, liga: this.liga}

    });

    dialogRef.afterClosed().subscribe((liga: Liga)  => {
      console.log('The dialog was closed');
    //   this.animal = result;
        console.log(liga);
        if(!!liga){
          this.msgService.open("Nova Liga  ! : " , liga.nome)
        }
    });
  }

  populaDataTable(ligas:Liga[]){
    this.dataSource = new MatTableDataSource<Liga>(this.ligas);
  }
  
  openMenu(): void {
    this.bottomSheet.open(BottonButtonComponent).afterDismissed().subscribe(
      sucess => {
        if(!!sucess)
          console.log("fecou modal ", sucess);
        else
          console.log("Fechou sem resultados ...");  
      }
    );
    console.log("ACESSOU SUB MENU");
  }


}
