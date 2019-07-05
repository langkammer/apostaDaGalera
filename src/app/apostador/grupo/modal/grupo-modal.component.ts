import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDataDialogInterface, Grupo ,Liga, Criterio} from 'src/app/interfaces/response-body.interface';
import { MsgService } from 'src/app/core/msg.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { GrupoService } from 'src/app/services/grupo.service';
import { LigaService } from 'src/app/services/liga.service';

@Component({
    selector: 'app-grupo-modal-modal',
    templateUrl: './grupo-modal.component.html',
    styleUrls: ['./grupo-modal.component.css']
  })
export class GrupoModalComponent implements OnInit {

  constructor(
    public service: GrupoService,
    public serviceLiga: LigaService,
    public diLigaalogRef: MatDialogRef<GrupoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDataDialogInterface,
    public msgService : MsgService,
    private formBuilder: FormBuilder) {}



  grupo = {} as Grupo;

  criterio1 = {} as Criterio;

  criterio2 = {} as Criterio;

  possuiBonus1 = false;

  possuiBonus2 = false;


  form: FormGroup;
  
  ligas  = [] as Liga[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() : void{
/*
   nome:string;
    ligaModel:Liga;
    descritivo:string;
    criterioPrincipal:Criterio;
    bonusPorTodosAcertosPrincipal:boolean;
    criterioSecundario:Criterio; 
    criterioSecundarioAcumulaPrincipal:boolean;
    bonusPorTodosAcertosSecundario:boolean;
*/
    this.listarLigasAtivas();
    this.form = this.formBuilder.group({
      nomeForm : ['', Validators.required],
      ligaForm : ['', Validators.required],
      descritivoForm : ['', Validators.required],
      criterioPrincipalForm : ['', Validators.required],
      criterioSecundarioForm : ['', Validators.required],
      pontoCriterioPrincipalForm : ['', Validators.required],
      pontoCriterioSecundarioForm : ['', Validators.required],
      bonusCriterioPrincipalForm : [false],
      bonusCriterioSecundarioForm : [false]

    })

    console.log("INI MODAL LIGAS ...")

    this.grupo = this.data.obj;
    console.log("LIGA : " , this.data.obj);

    if(this.data.action  == "Ver" || this.data.action == "Deletar"){ 
      this.form.disable();
    }

  }  

 
  cancelar(): void {
    // this.dialogRef.close();
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
    // this.service.delete(this.grupo).subscribe(
    //       sucesso =>{
    //         console.log("RES ", sucesso);
    //         if(sucesso.status == "SUCESSO")
    //           this.resetLogin();
    //         else
    //           this.msgService.open(sucesso.status , sucesso.menssage);
    //       },
    //       error =>{
    //         this.msgService.open("ERROR : => ", error.message);

    //       }
    //     )
  }


  salvar(): void{
    //montar grupo model
    this.grupo.criterioPrincipal = this.criterio1;
    this.grupo.criterioSecundario = this.criterio2;
    this.grupo.bonusPorTodosAcertosPrincipal = this.possuiBonus1;
    this.grupo.bonusPorTodosAcertosSecundario = this.possuiBonus2;
    console.log("GRUPO A SALVAR => " , this.grupo);
    this.service.create(this.grupo).subscribe(
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
    );
  }

  listarLigasAtivas(){
    this.serviceLiga.listAtivo().subscribe(
      sucesso =>{
        console.log("RES ", sucesso);
        if(sucesso.status == "SUCESSO")
          this.ligas = sucesso.data;
        else
          this.msgService.open(sucesso.status , sucesso.menssage);
      },
      error =>{
        this.msgService.open("ERROR : => ", error.message);

      }
    )
  }

  resetLogin(){
    // this.dialogRef.close(this.grupo);
  } 

}