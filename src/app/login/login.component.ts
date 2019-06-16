import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { VinculoService } from '../services/vinculo.service';
import { finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from './modal/login-modal.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  perfiUserRef: AngularFireList<any>;

  email = "";

  senha = "";

  vinculo:any = {};

  usuario:any = {};

  login:any = {};

  @BlockUI() blockUI: NgBlockUI;


  constructor(
    public afAuth: AngularFireAuth   ,
    db: AngularFireDatabase,
    public vinculoService: VinculoService,
    private modalService: NgbModal,
    public dialog: MatDialog
     ) 
  {
    this.perfiUserRef = db.list('perfilUsuarios');

  } 

  ngOnInit(): void {
      this.afAuth.authState.subscribe(res => {
          if (res && res.uid) {
              console.log("logado?" , res)
          } else {
            this.email = ''
          }
        });
  }



  logarFacebook(){
      const task =  this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
      task.then((value) => {
        //SUCCESS
        console.log(value);
        this.criarVinculo(value.user);
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

  criarVinculo(userFirebase: firebase.User) :  any  {

    this.blockUI.start('Carregando Resultados ...'); // Start blocking
    this.vinculo = {
      nome : userFirebase.displayName,
      email : userFirebase.email,
      authId : userFirebase.uid
    }

    this.vinculoService.criarVinculo(this.vinculo)
        .pipe(finalize(() => {
            this.resetLogin()
            this.blockUI.stop();
        })) 
        .subscribe(response => {
            console.log("sucesso : " , response);
            this.vinculo = response;
        }, error => {
              console.log(error);
        }
    );
   
    

    // this.vinculoService
    // .criarVinculo(this.vinculo)
    // .subscribe(
    //     sucesso => {
    //       console.log("sucesso : " , sucesso);
    //       this.vinculo = sucesso;
    //       $("#modalCadastrar").modal("hide");
    //       this.blockUI.stop();
    //     },
    //     err => {
    //         console.log(err);
    //         this.blockUI.stop(); // Stop blocking
    //     }
    // );
    
  }


  loginNormal() {
      this.blockUI.start('Carregando  ...'); // Start blocking
      this.afAuth.auth.signInWithEmailAndPassword(this.email, this.senha).then(
          function(suceso){
              alert("USUARIO EMAIL LOGADO : "+ suceso.user.email);
          }
      ).catch(
          function(error){
              alert(error)
          }
      );
  }

  logout() {
      console.log("deslogou")
      this.afAuth.auth.signOut();
  }

  closeModal(){
    this.resetLogin();
  }
//   openDialog() {
//     const dialogRef = this.dialog.open(LoginModalComponent);

//     dialogRef.afterClosed().subscribe(result => {
//       console.log(`Dialog result: ${result}`);
//     });
//   }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '500px'
    //   data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    //   this.animal = result;
    });
  }
  abreCadastro() {
      this.openDialog();
    // console.log("abre modal login cadastro");
    // this.modalService.open(LoginModalComponent);
  }
  resetLogin(){
    this.usuario = {};

    // jQuery("#modalCadastrar").modal("hide");
    
  } 

}
