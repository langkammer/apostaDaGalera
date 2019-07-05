import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Liga, MatDataDialogInterface, Equipe } from 'src/app/interfaces/response-body.interface';
import { MsgService } from 'src/app/core/msg.service';
import { LigaService } from 'src/app/services/liga.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import * as _ from "lodash"

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



  liga = {} as Liga;
  equipe = {} as Equipe;

  ligaForm: FormGroup;

  equipes: Equipe[] = [];

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
          this.extrairTimes(equipes);
        },err =>{

        })
      }
      else if(this.liga.tipoLiga == 'COPA_BRASIL'){

      }
    }      
    console.log(this.liga.tipoLiga,this.liga.edicao);
  }
 
  extrairTimes(equipes){
    var equipesLocal = [];
    
    _.forEach(equipes, function(value) {
      console.log(value);
      let equipeLocal = {
        nomeAbrev : value.sigla,
        nomeCompleto : value.nome,
        sigla : value.sigla,
        escudoPathString : value.brasao
      }; 
   
      equipesLocal.push(equipeLocal);
    });
    this.equipes = equipesLocal;
    console.log(this.equipes);

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
    this.liga.equipes = this.equipes;
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

  getBrasileirao(){
    console.log("brasileirao");
    this.service.getBrasileirao("2019").subscribe(
      sucesso =>{
        console.log(sucesso);
      },
      error =>{
        console.log(error);
      }
    )
  }
  
  resetLogin(){
    this.dialogRef.close(this.liga);
  } 

}