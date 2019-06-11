import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  perfiUserRef: AngularFireList<any>;

  email = "";

  senha = "";

  usuario:any = {};

  login:any = {};

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    public afAuth: AngularFireAuth   ,
    db: AngularFireDatabase
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
      this.afAuth.auth.signOut();
  }


  resetLogin(){
    this.usuario = {};
    $("#modalCadastrar").modal("hide");
  }

  logarFacebook(){


      const task =  this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());

      task.then((value) => {
        //SUCCESS
        console.log(value);
        this.criarPerfil(value.user.email,value.user.uid);
      }, (error) => {
          console.log(error);
      })

  }

  criarUsuario(){
      this.afAuth.auth.createUserWithEmailAndPassword(this.usuario, this.senha)
          .then(function(suceso){
              console.log("sucesso : ", suceso.user.email)
              this.criarPerfil(suceso.user.email,suceso.user.uid)
          })
          .catch(function(error) {
          alert(error)
          console.log(error);
          }
      );
  }

  criarPerfil(authEmail,id) :  any  {

      const task =  this.perfiUserRef.push({
        email: authEmail,
        uid: id,
        permissaoAdmin : false,
        permissaoUser : true
      });

      task.then((value) => {
        //SUCCESS
        console.log(value);
        this.resetLogin();
      }, (error) => {
          console.log(error);
      })
    
  }



}
