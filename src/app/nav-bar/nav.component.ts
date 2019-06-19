import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { VinculoService } from '../services/vinculo.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseBodyInterface, User } from '../interfaces/response-body.interface';

@Component({
  selector: 'app-root',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavBarComponent implements OnInit {

  email = "";

  perfil:User;

  response:ResponseBodyInterface;

  isAdmin:boolean = false;

  db : AngularFireDatabase;

  @BlockUI() blockUI: NgBlockUI;

  perfiUserRef: AngularFireList<any>;

  constructor(
    public afAuth: AngularFireAuth   ,
    db: AngularFireDatabase,
    public vinculoService: VinculoService
    ) 
  {
    this.db = db;

  } 

  ngOnInit(): void {
    this.afAuth.authState.subscribe(res => {
        if (res && res.uid) {
            console.log("logado : " , res.email)
            this.email = res.email;
            this.carregaDefinicoesPerfil(res.email);
        } else {
          this.email = ''
        }
      });
  }

  logout() {
    console.log("deslogou ... ", this.perfil)
    this.afAuth.auth.signOut();
  }


  

  carregaDefinicoesPerfil(email){
    this.vinculoService
    .getUserByEmail(email)
    .subscribe(
        response => {
          if(response){
            this.response = response;
            this.perfil   = this.response.data;
            this.isAdmin =  this.perfil.permissaoAdmin;
          }

        },
        err => {
            console.log(err);
        }
    );

    
   
  }

}
