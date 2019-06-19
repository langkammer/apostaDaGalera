import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Liga } from 'src/app/interfaces/response-body.interface';
import { MsgService } from 'src/app/core/msg.service';
import { CadLigasComponent } from '../cad-ligas.component';
import { LigaService } from 'src/app/services/liga.service';
import { DISABLED } from '@angular/forms/src/model';

@Component({
    selector: 'app-login-modal',
    templateUrl: './liga-modal.component.html',
    styleUrls: ['./liga-modal.component.css']
  })
export class LigaModalComponent implements OnInit {

  constructor(
    public service: LigaService,
    public dialogRef: MatDialogRef<LigaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CadLigasComponent,
    public msgService : MsgService,
    private formBuilder: FormBuilder) {}



  liga = {} as Liga;
  ligaForm: FormGroup;


  ngOnInit() : void{

    this.ligaForm = this.formBuilder.group({
      nome : ['', Validators.required],
      logoLigatring : ['', Validators.required],
      qtdRodadas : ['',Validators.required],
      tipoLiga  : ['',Validators.required]
    })
    console.log("INI MODAL LIGAS ...")

    if(this.data.action == "Ver"){
      this.ligaForm.disable();
    }

  }  

 
  cancelar(): void {
    this.dialogRef.close();
  }
  cadastrar(): void {
    this.salvar();
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