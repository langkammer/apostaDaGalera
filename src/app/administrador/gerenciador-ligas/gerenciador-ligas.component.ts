import { MatPaginator } from "@angular/material/paginator";
import { Component, OnInit, ViewChild} from '@angular/core';
import {  MatDialog, MatBottomSheet,  MatTreeNestedDataSource } from '@angular/material';
import {  NestedTreeControl } from "@angular/cdk/tree";


import { Liga, ResponseBodyInterface, Equipe, Rodada,  Partida } from 'src/app/interfaces/response-body.interface';
import { LigaService } from 'src/app/services/liga.service';
import { ActivatedRoute } from "@angular/router";
import { BottonButtonComponent } from "src/app/shared/bottom/bottom-button.component";
import { MsgService } from "src/app/core/msg.service";
import { CadEquipesComponent } from "../cad-equipes/cad-equipes.component";
import * as _ from "lodash"

interface RodadaNod {
  id:number;
  rodada:number;
  dataAbertura:string;
  horaAbertura:string;
  partidas:Partida[];
  children?:RodadaNod[];
}

@Component({
  selector: 'app-gerenciador-ligas',
  templateUrl: './gerenciador-ligas.component.html',
  styleUrls: ['./gerenciador-ligas.component.css']
})
export class GerenciadorLigasComponent implements OnInit {

  nome:string;

  liga = {} as Liga;

  idLiga:number;
  
  tipView:string;

  columnsTimes: string[] = ['sigla','escudo' ,'id'];

  timesDataSource: Equipe[];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  treeControl = new NestedTreeControl<RodadaNod>(node => node.children);
  rodadaDataSource = new MatTreeNestedDataSource<RodadaNod>();
  
  constructor(
        private bottomSheet: MatBottomSheet,
        private service:LigaService,
        public dialog: MatDialog,
        private msgService:MsgService,
        private route:ActivatedRoute
  ){}


  ngOnInit(): void {
    this.idLiga = this.route.snapshot.params['id'];
    
    this.tipView = this.route.snapshot.params['tipView'];

    this.carregaLiga(this.idLiga);
    
  }

  carregaLiga(id){
    this.service.getById(id).subscribe(
      (res:ResponseBodyInterface) => {
          if(res.data){
            this.liga = res.data;
            this.timesDataSource = this.liga.times;
            this.rodadaDataSource.data = this.liga.rodadas;
            this.marcaTrueEquipes();
          }
      }
    )
  }

  marcaTrueEquipes(){
    let array = []
    _.forEach(this.liga.times, (equipe:Equipe) => {
      equipe.select = true;
      array.push(equipe);
    })
    this.liga.times = array;
    console.log("marcados", array);
  }

  openMenuTime(equipe:Equipe): void {
    this.bottomSheet.open(BottonButtonComponent,{ data: {showDelete : true,  showView   : false,  showEdit   : false}}).afterDismissed().subscribe(
      sucess => {
        if(!!sucess){
          if(sucess=='Deletar')
            this.removerEquipe(equipe);
        }
        else
          console.log("Fechou sem resultados ...");  
      }
    );
    console.log("ACESSOU SUB MENU");
  }


  removerEquipe(equipe:Equipe){
    _.remove(this.liga.times,{id : equipe.id});
    this.timesDataSource = _.reject(this.liga.times,{id : equipe.id});
  }
  openModalTime(action){
    console.log("abre modal liga",this.liga.times);
    if(!action)
      action = "Nova";
    const dialogRef = this.dialog.open(CadEquipesComponent, {
      width: '900px',
      data: {action: action, obj : this.liga.times}

    });
    
    dialogRef.afterClosed().subscribe((equipes: Equipe[])  => {
      console.log('The dialog was closed');
    //   this.animal = result;
        console.log("modal fechada", equipes);
        if(!!equipes){
            console.log("equipes selecionadas gerentes", equipes);
            this.liga.times = [];
            this.liga.times = equipes;
            this.timesDataSource = this.liga.times;
        }
    });
  }

  excluirTime(time:Equipe){

  }


  

}
