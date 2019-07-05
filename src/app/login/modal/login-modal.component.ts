import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../login.component';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { VinculoService } from 'src/app/services/vinculo.service';
import { User } from 'src/app/interfaces/response-body.interface';
import { MsgService } from 'src/app/core/msg.service';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.css']
  })
export class LoginModalComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    public afAuth: AngularFireAuth   ,
    public vinculoService: VinculoService,
    public dialogRef: MatDialogRef<LoginModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginComponent,
    public msgService : MsgService,
    private formBuilder: FormBuilder) {}



  usuario = {} as User;
  loginForm: FormGroup;


  ngOnInit() : void{
    this.loginForm = this.formBuilder.group({
      nome : ['', Validators.required],
      email : ['', Validators.required],
      senha : ['',Validators.required]
    })
    console.log("INI ...")
  }  

 
  cancelar(): void {
    this.dialogRef.close();
  }
  cadastrar(): void {
    this.salvar();
  }
  facebook(): void{
    this.cadastrarFacebook();
  }

  salvar(): void{
    const task =  this.afAuth
    .auth
    .createUserWithEmailAndPassword(this.usuario.email,this.usuario.senha);
    
    task.then((value) => {
      //SUCCESS
      console.log(value);
      if(!value.credential){
        this.usuario.provider = "local"
      }
      else{
        this.usuario.provider = value.credential.providerId;
      }  

      this.criarVinculo(this.usuario);
    }, (error) => {
        console.log(error);
    })
  }

  cadastrarFacebook(){
    const task =  this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    task.then((value) => {
      //SUCCESS
      console.log(value);
      this.usuario.provider = value.credential.providerId;
      this.usuario.nome     = value.user.displayName;
      this.usuario.email    = value.user.email;
      this.usuario.authId   = value.user.uid;
      this.criarVinculo(this.usuario);
    }, (error) => {
        console.log(error);
    })
  }


  criarVinculo(usuario: User) :  any  {

    this.blockUI.start('Carregando  ...'); // Start blocking
    
    this.vinculoService.criarVinculo(this.usuario)
        .subscribe(
          response => {
            console.log("sucesso : " , response);
            this.blockUI.stop();
            if(response.status == "SUCESSO"){
              this.usuario = response.data;
              this.resetLogin();
            }
            else{
              this.msgService.open(response.status , response.menssage)
            }
          }, error => {
                console.log(error);
          }
    );
  }

  resetLogin(){
    this.blockUI.stop();
    this.dialogRef.close(this.usuario);
  } 

}