import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { VinculoService } from '../services/vinculo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from './modal/login-modal.component';
import { MatDialog } from '@angular/material';
import { MsgService } from '../services/msg.service';
import { User, ResponseBodyInterface } from '../interfaces/response-body.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  perfiUserRef: AngularFireList<any>;

  email = "";

  senha = "";

  vinculo = {} as User;

  usuario:any = {};

  login:any = {};

  loginForm: FormGroup;


  @BlockUI() blockUI: NgBlockUI;


  constructor(
    public afAuth: AngularFireAuth   ,
    db: AngularFireDatabase,
    public vinculoService: VinculoService,
    private modalService: NgbModal,
    public dialog: MatDialog,
    public msgService : MsgService,
    private formBuilder: FormBuilder
     ) 
  {
    this.perfiUserRef = db.list('perfilUsuarios');

  } 

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email : ['', Validators.required],
        senha : ['',Validators.required]
      })
      
      this.afAuth.authState.subscribe(res => {
          if (res && res.uid) {
              console.log("logado?" , res)
              this.email = res.email;
          } else {
            this.email = ''
          }
        });
  }

  geUser(email:string){
    this.vinculoService.getUserByEmail(email).subscribe(
      sucesso =>{
          
      },
      error =>{

      }
    )
  }


  logarFacebook(){
    
      const task =  this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
      task.then((value) => {
        //SUCCESS
        console.log(value);
      }, (error) => {
          console.log(error);
      })
  }

  criarUsuario(){
      this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.senha)
          .then(function(suceso){
              console.log("sucesso : ", suceso.user.email)
              this.criarVinculo(suceso.user)
          })
          .catch(function(error) {
          alert(error)
          console.log(error);
          }
      );
  }



  loginNormal() {

      this.blockUI.start('Carregando  ...'); // Start blocking
      this.blockUI.stop();

      this.afAuth.auth.signInWithEmailAndPassword(this.email, this.senha).then(
        function(suceso){
            this.msgService.open("USUARIO EMAIL LOGADO : "+ suceso.user.email);
        }
      )
      .catch(
        function(error){
          this.msgService.open(error)

      });
  }

  logout() {
      console.log("deslogou")
      this.afAuth.auth.signOut();
  }

  
  abreCadastro() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((user: User)  => {
      console.log('The dialog was closed');
    //   this.animal = result;
        console.log(user);
        if(!!user){
          this.email = user.email;
          this.msgService.open("Bem Vindo ! : " , user.nome)
        }
    });
  }




}
