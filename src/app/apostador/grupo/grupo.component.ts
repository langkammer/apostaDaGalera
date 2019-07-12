import { Component, OnInit, ViewChild } from '@angular/core';
import { Grupo } from 'src/app/interfaces/response-body.interface';
import { GrupoDataSource } from './grupo-data.source';
import { MatPaginator, MatBottomSheet, MatDialog } from '@angular/material';
import { MsgService } from 'src/app/core/msg.service';
import { tap } from 'rxjs/operators';
import { GrupoService } from 'src/app/services/grupo.service';
import { BottonButtonGrupoComponent } from './bottom/bottom-button.component';
import { GrupoModalComponent } from './modal/grupo-modal.component';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  nome:string;

  grupo = {} as Grupo;

  displayedColumns: string[] = ['nome', 'ligaNome' ,'edicao','id'];

  dataSource: GrupoDataSource;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
        private bottomSheet: MatBottomSheet,
        private service:GrupoService,
        private msgService:MsgService,
        public dialog: MatDialog,
        private router: Router

  ){}


  ngOnInit(): void {
    this.dataSource = new GrupoDataSource(this.service);
    this.dataSource.loadList();
  }


  ngAfterViewInit() {
    this.paginator.page
        .pipe(
            tap(() => this.loadPage())
        )
        .subscribe();
  } 

  loadPage() {
    this.dataSource.loadList(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.nome);
  }



  openModal(tipoCrud:String,grupo:Grupo) : void{
    console.log("abre modal grupo");
    if(!tipoCrud)
      tipoCrud = "Nova";
    const dialogRef = this.dialog.open(GrupoModalComponent, {
      width: '600px',
      data: {action: tipoCrud, obj: grupo}

    });

    dialogRef.afterClosed().subscribe((grupo: Grupo)  => {
      console.log('The dialog was closed');
    //   this.animal = result;
        console.log(grupo);
        if(!!grupo){
          this.loadPage();
          this.msgService.open("Novo Grupo  ! : " , grupo.nome)
        }
    });
  }

  
  openMenu(grupo:Grupo): void {
    this.bottomSheet.open(BottonButtonGrupoComponent).afterDismissed().subscribe(
      sucess => {
        if(!!sucess){
          if(sucess=="Compartilhar")
            this.compartilhar(grupo);
          else if(sucess=="Editar")
            this.openModal(sucess,grupo);
          else if(sucess=="Membros")
            this.membros(grupo);
          else if(sucess=="Apostar")  
            this.apostar(grupo);
          else if(sucess=="Ver")
            this.openModal("Ver",grupo)
          else if(sucess=="Deletar")
            this.openModal("Deletar",grupo)  
        }
        else{
          console.log("Fechou sem resultados ...");  
        }
      }
    );
    console.log("ACESSOU SUB MENU");
  }


  compartilhar(g:Grupo){
    this.router.navigate(['/apostador/grupos/convite',  g.id]);
  }

  membros(g:Grupo){
    this.router.navigate(['/apostador/grupos/grupoByAposta',  g.id]);
  }
  apostar(g:Grupo){
    if(g.ligaModel.tipoLiga == "BRASILEIRAO")
      this.router.navigate(['/apostador/apostas/apostaCampeonatoBrasileiro',g.id,g.ligaModel.rodadaAtual]);
    else if(g.ligaModel.tipoLiga == "COPA_BRASIL")
      this.router.navigate(['/apostador/apostas/apostaCopaDoBrasil',,g.id,g.ligaModel.rodadaAtual]);
  }

}
