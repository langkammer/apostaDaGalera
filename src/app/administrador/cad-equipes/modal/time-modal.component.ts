import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDataDialogInterface, Equipe } from 'src/app/interfaces/response-body.interface';
import { MsgService } from 'src/app/core/msg.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import * as _ from "lodash"
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { EquipeService } from 'src/app/services/equipe.service';

@Component({
    selector: 'app-time-modal',
    templateUrl: './time-modal.component.html',
    styleUrls: ['./time-modal.component.css']
  })
export class TimeModalComponent implements OnInit {

  constructor(
    public service: EquipeService,
    public dialogRef: MatDialogRef<TimeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDataDialogInterface,
    public msgService : MsgService,
    private formBuilder: FormBuilder) {}
  
  equipe = {} as Equipe;

  form: FormGroup;
  
  @BlockUI() blockUI: NgBlockUI;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() : void{

    this.form = this.formBuilder.group({
      nomeAbrevForm  : ['',Validators.required],
      nomeCompletoForm  : ['',Validators.required],
      escudoPathStringForm  : ['',Validators.required],
      siglaForm  : ['',Validators.required]
    })

    console.log("INI MODAL LIGAS ...")

    if(this.data.obj)
      this.equipe = this.data.obj;
    console.log("time : " , this.data.obj);

    if(this.data.action  == "Ver" || this.data.action == "Deletar"){ 
      this.form.disable();
    }

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
    else if(this.data.action == "Nova")
      this.salvar();

  }
  

  deletar(){
    this.service.delete(this.equipe).subscribe(
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
    this.service.create(this.equipe).subscribe(
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

  
  resetLogin(){
    this.dialogRef.close(this.equipe);
  } 

}