import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Liga, MatDataDialogInterface, Equipe, Partida, Rodada } from 'src/app/interfaces/response-body.interface';
import { MsgService } from 'src/app/core/msg.service';
import { LigaService } from 'src/app/services/liga.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import * as _ from "lodash"
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'app-login-modal',
    templateUrl: './liga-modal.component.html',
    styleUrls: ['./liga-modal.component.css']
  })
export class LigaModalComponent implements OnInit {

  constructor(
    public service: LigaService,
    public dialogRef: MatDialogRef<LigaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDataDialogInterface,
    public msgService : MsgService,
    private formBuilder: FormBuilder) {}

  
    
  apiOk : boolean = false;  

  liga = {} as Liga;
  equipe = {} as Equipe;
  partida = {} as Partida;
  rodada = {} as Rodada;

  ligaForm: FormGroup;

  equipes: Equipe[] = [];

  partidas: Partida[] = [];

  rodadas: Rodada[] = [];

  
  @BlockUI() blockUI: NgBlockUI;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() : void{

    this.ligaForm = this.formBuilder.group({
      logoLigaForm  : ['',Validators.required],
      tipoLigaForm : ['', Validators.required],
      edicaoForm : ['',Validators.required]
    })
    console.log("INI MODAL LIGAS ...")

    this.liga = this.data.obj;
    console.log("LIGA : " , this.data.obj);

    if(this.data.action  == "Ver" || this.data.action == "Deletar"){ 
      this.ligaForm.disable();
    }

  }  

  consultaApi(){
    if(this.liga.tipoLiga && this.liga.edicao)
    {
      if(this.liga.tipoLiga == 'BRASILEIRAO'){
        this.service.getBrasileirao(this.liga.edicao)
        .subscribe((res:any) =>{
          // this.equipe.
          let equipes = _.map(res.equipes);
          let partidas = res.fases[res.agrupamento[0].fases[0].id].jogos;
          let rodada = res.fases[res.agrupamento[0].fases[0].id].rodada;
          this.liga.rodadaAtual = rodada.atual;
          this.liga.qtdRodadas = rodada.total;
          this.extrairPartidas(partidas,equipes);
          this.extrairTimes(equipes);
          this.apiOk = true;
        },err =>{
            alert("Erro ao consultar api")
        })
      }
      else if(this.liga.tipoLiga == 'COPA_BRASIL'){

      }
    }      
    console.log(this.liga.tipoLiga,this.liga.edicao);
  }
 
  extrairTimes(equipes){
    var equipesLocal = [];
    
    this.blockUI.start("Extraindo Times") // Start blocking
    _.forEach(equipes, function(value) {
      let equipeLocal = {
        nomeAbrev : value.sigla,
        nomeCompleto : value.nome,
        sigla : value.sigla,
        escudoPathString : value.brasao
      }; 
   
      equipesLocal.push(equipeLocal);
    });
    this.equipes = equipesLocal;
    this.blockUI.stop();

  }

  extrairPartidas(jogos,times){
    this.blockUI.start("Extraindo Partidas") // Start blocking

    var partidasLocal = [];

    var rodadasLocal = [];

    var times = times;

    var rodadas = jogos.rodada;

    var partidas = jogos.id;


    _.forEach(rodadas, function(patidaN,key) {

      _.forEach(patidaN,function(value){
        
        let p = partidas[value];
        if(p){
          let timConsulta = _.find(times, {id : p.time1});

          let time1 = {
              nomeAbrev :        timConsulta.sigla,
              nomeCompleto :     timConsulta.nome,
              sigla :            timConsulta.sigla,
              escudoPathString : timConsulta.brasao
          };
    
          let timConsulta2 = _.find(times, {id : p.time2});
    
          let time2 = {
              nomeAbrev :        timConsulta2.sigla,
              nomeCompleto :     timConsulta2.nome,
              sigla :            timConsulta2.sigla,
              escudoPathString : timConsulta2.brasao
          };
    
          let partidaLocal = {
            rodada   : p.rodada,
            time1    : time1,
            time2    : time2,
            data     : p.data,
            horario  : p.horario,
            estadio  : p.estadio,
            local    : p.local,
            placar1  : p.placar1,
            placar2  : p.placar2,
    
          }; 
          partidasLocal.push(partidaLocal);

        }
       

      });

      
   

      let rodada = {
        rodada : key,
        dataAbertura: "",
        horaAbertura: "",
        partidas:partidasLocal
      }
      partidasLocal = [];
      rodadasLocal.push(rodada);

    });
    this.rodadas = rodadasLocal;
    console.log(this.rodadas);
    this.blockUI.stop();

  }


  cancelar(): void {
    this.dialogRef.close();
  }


  confirmar(): void {
    if(this.data.action == "Deletar")
      this.deletar();
    else if(this.data.action == "Editar")
      this.salvar();
    //nao esquecer de implementar
    this.salvar();

  }
  

  deletar(){
    this.service.delete(this.liga).subscribe(
          sucesso =>{
            console.log("RES ", sucesso);
            if(sucesso.status == "SUCESSO")
              this.resetLogin();
            else
              this.msgService.open(sucesso.status , sucesso.menssage);
          },
          error =>{
            this.msgService.open("ERROR : => ", error.message);

          }
        )
  }


  salvar(): void{
    this.liga.times = this.equipes;
    this.liga.rodadas = this.rodadas;
    if(this.apiOk){
      this.service.create(this.liga).subscribe(
        sucesso =>{
          console.log("RES ", sucesso);
          if(sucesso.status == "SUCESSO")
            this.resetLogin();
          else
            this.msgService.open(sucesso.status , sucesso.menssage);
        },
        error =>{
          this.msgService.open("ERROR : => ", error.message);
  
        }
      )
    }
    else{
      alert("ATENÇÃO VOCÊ SERÁ DIRECIONANDO PARA CRIAÇÃO MANUAL DA LIGA");
    }
   
  }

  getBrasileirao(){
    console.log("brasileirao");
    this.service.getBrasileirao("2019").subscribe(
      sucesso =>{
        console.log(sucesso);
      },
      error =>{
        console.log(error);
        alert("Atenção Não foi possivel comunicar com Api do UOL, você será direcionado para central de criação de ligas")
      }
    )
  }
  
  resetLogin(){
    this.dialogRef.close(this.liga);
  } 

}