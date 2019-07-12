import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from "@angular/material/paginator";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { GrupoService } from 'src/app/services/grupo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ResponseBodyInterface, MembroGrupo, Grupo } from 'src/app/interfaces/response-body.interface';
import { MembrosDataSource } from './membros-data.source';
import { tap } from 'rxjs/internal/operators/tap';
import { BottonButtonGrupoByMembroComponent } from './bottom/bottom-button.component';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-membros-grupo',
  templateUrl: './membros-grupo.component.html',
  styleUrls: ['./membros-grupo.component.css']
})
export class MembrosGrupoComponent implements OnInit {

  id : any;

  email : string;

  membro = {} as MembroGrupo;

  grupo = {} as Grupo;

  displayedColumns: string[] = ['posicao','pontos','nomeUserVinc','id'];

  dataSource: MembrosDataSource;

  @BlockUI() blockUI: NgBlockUI;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route:ActivatedRoute, 
    public afAuth: AngularFireAuth,
    private service:GrupoService,
    private bottomSheet: MatBottomSheet){
  }
  ngOnInit() {
    console.log("membro grupo");
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.dataSource = new MembrosDataSource(this.service);

    this.loadPage();

    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
          this.email = res.email;
          this.carregaGrupo(this.id);
      } 
    });
  }


  ngAfterViewInit() {
    this.paginator.page
        .pipe(
            tap(() => this.loadPage())
        )
        .subscribe();
  } 

  loadPage() {
    this.dataSource.loadMembros(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.id);
  }

  carregaGrupo(idGrupo:number){
    this.service.get(idGrupo).subscribe((res:ResponseBodyInterface) =>{
      if(res.status= "SUCESSO"){
        this.grupo = res.data;
        this.carregaDadosMembro(this.grupo.id,this.email)
      }
    })
  }

  carregaDadosMembro(idGrupo:number,email:string){
    this.service.getMembroByIdGrupoAndEmail({id : idGrupo, email : email})
    .subscribe((res:ResponseBodyInterface) =>{
      if(res.status= "SUCESSO")
        this.membro = res.data;
    })
  }
  

  openMenu(): void {
    this.bottomSheet.open(BottonButtonGrupoByMembroComponent).afterDismissed().subscribe(
      sucess => {
        if(!!sucess)
          console.log("a implementar", sucess);
        else
          console.log("Fechou sem resultados ...");  
      }
    );
    console.log("ACESSOU SUB MENU");
  }
}
