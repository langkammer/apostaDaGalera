import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDataDialogInterface, User } from 'src/app/interfaces/response-body.interface';
import { MsgService } from 'src/app/core/msg.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { VinculoService } from 'src/app/services/vinculo.service';
@Component({
    selector: 'app-user-modal',
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.css']
  })
export class UserModalComponent implements OnInit {
  userForm: FormGroup;
  user = {} as User;

  constructor(
    public service: VinculoService,
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDataDialogInterface,
    public msgService : MsgService,
    private formBuilder: FormBuilder) {}




  ngOnInit() : void{

    this.userForm = this.formBuilder.group({
      nome : [''],
      email : [''],
      fprovider : [''],
      permissaoAdmin : ['']
    })

    console.log("INI MODAL LIGAS ...")

    this.userForm.disable();
    this.user = this.data.obj;
    console.log("USER : " , this.data.obj);


  }  

 
  cancelar(): void {
    this.dialogRef.close();
  }


  confirmar(): void {
    if(this.data.action == "Deletar")
      this.deletar();
    else if(this.data.action == "Bloquear")
      this.block();

  }
  

  deletar(){
    this.service.desvincular(this.user).subscribe(
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

  block(){
    this.service.bloquear(this.user).subscribe(
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
    this.dialogRef.close(this.user);
  } 

}