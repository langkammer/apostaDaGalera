import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Liga, MatDataDialogInterface } from 'src/app/interfaces/response-body.interface';
import { MsgService } from 'src/app/core/msg.service';
import { LigaService } from 'src/app/services/liga.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
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
  ligaForm: FormGroup;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() : void{

    this.ligaForm = this.formBuilder.group({
      nome : ['', Validators.required],
      logoLigatring : ['', Validators.required],
      qtdRodadas : ['',Validators.required],
      tipoLiga  : ['',Validators.required]
    })
    console.log("INI MODAL LIGAS ...")

    this.liga = this.data.obj;
    console.log("LIGA : " , this.data.obj);

    if(this.data.action  == "Ver" || this.data.action == "Deletar"){ 
      this.ligaForm.disable();
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

  
  resetLogin(){
    this.dialogRef.close(this.liga);
  } 

}